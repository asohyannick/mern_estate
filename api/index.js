import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import cookieParser from "cookie-parser";
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import listingRoute from './routes/listing.route.js'

dotenv.config();
const app = express();
// security packages
app.use(cors());
// middleware packages
app.use(express.json());
app.use(cookieParser());
// db config
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB is connected successfully!"))
  .catch((error) => console.log(error.messsage));
// routes
app.get("/test", function (req, res) {
  res.send("<h1>API is working successfully</h1>");
});

// routes
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/listing', listingRoute);


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
