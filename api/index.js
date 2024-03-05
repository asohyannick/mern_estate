import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import cookieParser from "cookie-parser";
// routes
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import listingRoute from './routes/listing.route.js'
import path from 'path';
dotenv.config();
const app = express();
// security packages
app.use(cors());
// middleware packages
app.use(express.json());

app.use(cookieParser());
const __dirname = path.resolve();
// db config
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB is connected successfully!"))
  .catch((error) => console.log(error.messsage));
// routes
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/listing', listingRoute);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
