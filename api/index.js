import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js'
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

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
