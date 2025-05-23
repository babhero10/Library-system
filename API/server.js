// server.js
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import userRouter from './routers/user.js';
import reserveRouter from './routers/reservation.js';
import bookRouter from './routers/book.js';
import authorRouter from './routers/author.js';
import borrowRouter from './routers/borrowing.js';
import path from 'path';
import { fileURLToPath } from 'url'; // For __dirname in ES Modules
import dotenv from 'dotenv';
dotenv.config();

// For __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('trust proxy', 1);

// --- ASYNCHRONOUS SERVER SETUP ---
async function startServer() {
  try {

    // SECURITY MIDDLEWARE
    app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          "img-src": ["'self'", "data:", process.env.CORS_ORIGIN || 'http://localhost:3000'], // Allow images from self and frontend origin
        },
      },
    }));


    // CORS
    const corsOptions = {
      origin: function (origin, callback) {
        // Reflect the request origin, if it's present
        callback(null, origin || true); // Allow origin if present, or allow if no origin (e.g. curl)
      },
      credentials: true,
    };
    app.use(cors(corsOptions));

    // BODY PARSING
    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); // extended: true is often better for complex forms / multipart

    // STATIC FILES (ensure this path is correct relative to server.js)
    // If server.js is in project root, and 'images' folder is also in project root
    app.use('/images', express.static(path.join(__dirname, 'images')));

    // SESSIONS
    app.use(session({
      name: 'sessionId',
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 2 * 60 * 60 * 1000
      }
    }));

    app.get('/', (req, res) => res.json({ message: 'Welcome! API is running.' }));

    // SESSION CHECK / LOGOUT
    app.get('/logout', (req, res) => {
      req.session.destroy(err => {
        if (err) {
          console.error("Session destruction error:", err);
          return res.status(500).json({ message: 'Could not log out, please try again.' });
        }
        res.clearCookie('sessionId', { path: '/' });
        res.json({ message: 'Logged out successfully' });
      });
    });

    app.get('/checkSession', (req, res) => {
      if (req.session && req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
      } else {
        res.json({ loggedIn: false });
      }
    });

    // START Express App
    app.use('/user', userRouter);
    app.use('/reserve', reserveRouter);
    app.use('/book', bookRouter); // bookRouter will now use the imported upload middleware
    app.use('/author', authorRouter);
    app.use('/borrow', borrowRouter);
    

    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));

  } catch (err) {
    console.error("Failed to initialize application:", err);
    process.exit(1);
  }
}

startServer();
