// server.js
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';   // Import the redis client
import TestRouter from './routers/test.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url'; // For __dirname in ES Modules
import dotenv from 'dotenv';
dotenv.config();

// For __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('trust proxy', 1); // Important if behind a reverse proxy (Heroku, Nginx, etc.)

// Initialize Redis Client
const redisClient = createClient({
  // url: 'redis://alice:foobared@awesome.redis.server:6380' // Example if your Redis server requires URL/auth
  // By default, it connects to redis://localhost:6379
  // Add `legacyMode: true` ONLY if you are forced to by an older library that doesn't support modern redis client.
  // connect-redis v7+ should work fine without legacyMode.
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));
redisClient.on('connect', () => console.log('Attempting to connect to Redis...'));
redisClient.on('ready', () => console.log('Redis client is ready.'));
redisClient.on('end', () => console.log('Redis client connection has ended.'));


// --- ASYNCHRONOUS SERVER SETUP ---
async function startServer() {
  try {
    await redisClient.connect(); // Connect to Redis
    console.log('Successfully connected to Redis!');

    // Initialize session store AFTER Redis client is connected
    const redisStoreInstance = new RedisStore({
      client: redisClient,
      prefix: 'sess:', // Optional: add a prefix for your session keys in Redis
    });

    // SECURITY MIDDLEWARE
    app.use(helmet());

    // CORS
    const corsOptions = {
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // Frontend URL
      credentials: true,
    };
    app.use(cors(corsOptions));

    // BODY PARSING
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // STATIC FILES
    app.use('/images', express.static(path.join(__dirname, 'images')));

    // SESSIONS (now uses redisStoreInstance)
    app.use(session({
      name: 'sessionId',
      store: redisStoreInstance,
      secret: process.env.SESSION_SECRET, // Ensure this is a strong, random string in .env
      resave: false,
      saveUninitialized: false,
      rolling: true, // Refreshes cookie maxAge on each request
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // True if using HTTPS
        sameSite: 'lax', // Or 'strict' depending on your needs
        maxAge: 2 * 60 * 60 * 1000 // 2 hours
      }
    }));

    // MULTER (ensure imageFilter is defined correctly)
    const imageFilter = (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Not an image! Please upload only images.'), false);
      }
    };
    const storage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, path.join(__dirname, 'images')),
      filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
    });
    const upload = multer({ storage, fileFilter: imageFilter, limits: { fileSize: 1 * 1024 * 1024 } }); // 1MB limit

    app.get('/', (req, res) => res.json({ message: 'Welcome! API is running.' }));
    app.use('/test', TestRouter);

    // SESSION CHECK / LOGOUT
    app.get('/logout', (req, res) => {
      req.session.destroy(err => {
        if (err) {
          console.error("Session destruction error:", err);
          return res.status(500).json({ message: 'Could not log out, please try again.' });
        }
        res.clearCookie('sessionId', { path: '/' }); // Ensure cookie name matches and path if set
        res.json({ message: 'Logged out successfully' });
      });
    });

    app.get('/checkSession', (req, res) => {
      if (req.session && req.session.user) { // Assuming you store user info in req.session.user
        res.json({ loggedIn: true, user: req.session.user });
      } else {
        res.json({ loggedIn: false });
      }
    });

    // START Express App
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));

  } catch (err) {
    console.error("Failed to initialize application or connect to Redis:", err);
    // Gracefully shutdown redis client if it was connected or partially connected.
    if (redisClient && redisClient.isOpen) {
        await redisClient.quit();
    }
    process.exit(1); // Exit if critical setup fails
  }
}

// Call the async function to start the server
startServer();
