const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const jobRoutes = require('./routes/jobRoutes');

// Load env variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', // local frontend
    'https://your-frontend.vercel.app' // deployed frontend
  ],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});