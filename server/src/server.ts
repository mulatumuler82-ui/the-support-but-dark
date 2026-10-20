import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRouter from './routes/contact.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// CRITICAL: Handle preflight OPTIONS requests for Vercel serverless functions
app.options('*', cors());

app.use(express.json());

// Routes  (POST /api/contact)
app.use('/api', contactRouter);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'Portfolio Backend API is running successfully!',
    build: 'contact-router-v2', // if you do NOT see this line, an OLD server is answering
    endpoints: ['GET /api/contact', 'POST /api/contact'],
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio')
  .then(() => {
    console.log("Connected to MongoDB Atlas / Local DB");
  })
  .catch((err: unknown) => console.error("Database connection error:", err));

// Only call app.listen when running locally, NOT on Vercel
if (process.env.NODE_ENV !== 'production') {
  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}  (build: contact-router-v2)`);
    console.log('Contact route ready: GET + POST /api/contact');
  });

  // If an old server is still holding the port, say so instead of failing silently.
  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\nPORT ${PORT} IS ALREADY IN USE by another (old) server. Close it, then start again.\n`);
    } else {
      console.error('Server error:', err);
    }
    process.exit(1);
  });
}

// CRITICAL: Export the app for Vercel's serverless function handler
export default app;
