// server.js - Updated CORS configuration for multiple origins

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
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.set('trust proxy', 1);

async function startServer() {
  try {
    // Dynamic CORS configuration
    const getAllowedOrigins = () => {
      if (process.env.CORS_ORIGINS) {
        return process.env.CORS_ORIGINS.split(',').map(origin => origin.trim());
      }
      
      // Default development origins
      const defaultOrigins = [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:8000',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:8000',
      ];
      
      // Add production origin if specified
      if (process.env.FRONTEND_URL) {
        defaultOrigins.push(process.env.FRONTEND_URL);
      }
      
      return defaultOrigins;
    };

    const allowedOrigins = getAllowedOrigins();
    
    // CORS configuration with dynamic origin checking
    const corsOptions = {
      origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, Postman)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          console.warn(`CORS blocked origin: ${origin}`);
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    };

    app.use(cors(corsOptions));

    // Security middleware with dynamic CSP
    app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          "img-src": [
            "'self'", 
            "data:", 
            ...allowedOrigins
          ],
          "connect-src": [
            "'self'",
            ...allowedOrigins
          ],
        },
      },
    }));

    // Body parsing
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const setCorpHeaders = (req, res, next) => {
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
    };

    // Static files
    const projectRootImagesDir = path.join(__dirname, '../images');
    app.use('/images', setCorpHeaders, express.static(projectRootImagesDir));

    const bookCoversDir = path.join(__dirname, '../images/book_data/covers');
    app.use('/book_data/covers', setCorpHeaders, express.static(bookCoversDir));

    const authorImageDir = path.join(__dirname, '../images/book_data/authors'); 
    app.use('/book_data/authors', setCorpHeaders, express.static(authorImageDir));

    // Sessions
    app.use(session({
      name: 'sessionId',
      secret: process.env.SESSION_SECRET || 'your-default-secret',
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 2 * 60 * 60 * 1000
      }
    }));

    // Health check endpoint
    app.get('/', (req, res) => {
      res.json({ 
        message: 'Welcome! API is running.',
        environment: process.env.NODE_ENV,
        allowedOrigins: allowedOrigins.length > 10 ? 'Multiple origins configured' : allowedOrigins
      });
    });

    // API routes
    app.use('/user', userRouter);
    app.use('/reserve', reserveRouter);
    app.use('/book', bookRouter);
    app.use('/author', authorRouter);
    app.use('/borrow', borrowRouter);

    // Global error handler
    app.use((err, req, res, next) => {
      console.error('Global error:', err);
      res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'production' 
          ? 'Internal server error' 
          : err.message
      });
    });

    // 404 handler
    app.use('*', (req, res) => {
      res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
      });
    });

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
      console.log(`📡 Allowed origins:`, allowedOrigins);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });

  } catch (err) {
    console.error("Failed to initialize application:", err);
    process.exit(1);
  }
}

startServer();
