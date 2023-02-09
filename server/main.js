import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router/index.js";

dotenv.config();

mongoose
  .connect(process.env.CONNECT_URL)
  .then(() => console.log("DB ok"))
  .catch((e) => console.log("DB error", e))

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)
app.use("/uploads", express.static("uploads"))

app.listen(process.env.PORT, () => console.log("Server ok"))




