const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const todoRoutes = require("./routes/todoRoute")
const authRoutes = require('./routes/authRoute'); 

dotenv.config();

connectDB();
const app = express();

app.use(cors({
  origin: ['http://localhost:5173' , 'https://todo-project-bh4.onrender.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes); 
app.use('/api/v1', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
