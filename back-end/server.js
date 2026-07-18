import express from "express";
import { taskRouter } from "./routes/tasks.route.js";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

const PORT = 3000;
const app = express();

app.use(cors());
app.use("/", express.json(), taskRouter);

const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Successfully connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT} port`);
    });
  } catch (error) {
    console.error("Database connection failed", error.message);
    process.exit(1);
  }
};

startServer();
