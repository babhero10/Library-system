// server.js
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import userRouter from './routers/user.js';
import reserveRouter from './routers/reservation.js';
import bookRouter from './routers/book.js';
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

// Removed Redis Client initialization and event listeners

// --- ASYNCHRONOUS SERVER SETUP ---
async function startServer() {
  try {

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

    // SESSIONS (now uses default MemoryStore)
    app.use(session({
      name: 'sessionId',
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
    //app.use('/test', TestRouter);

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
    app.use('/user', userRouter);
    app.use('/reserve', reserveRouter);
    app.use('/book', bookRouter);

    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));

  } catch (err) {
    console.error("Failed to initialize application:", err); // Updated error message
    process.exit(1); // Exit if critical setup fails
  }
}

startServer();
