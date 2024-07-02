import express from "express";
import mongoose from "mongoose";
import bodyParser from "express";
import productRouter from "./Routes/product.js";
import userRouter from "./Routes/user.js";
import cors from "cors";
import { config } from "dotenv";

const app = express();

config({ path: ".env" });
app.use(bodyParser.json());

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// User Router
app.use("/api/user", userRouter);

// Product Router
app.use("/api/product", productRouter);

mongoose
  .connect(process.env.Mongo_URL, {
    dbName: "Volcanus_E_Commerce",
  })
  .then(() => {
    console.log("mongoDB Connected successfully...");
  })
  .catch((error) => {
    console.log(error);
  });

const PORT = 1000;
app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
