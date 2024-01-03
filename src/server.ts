import express, { Express, Request, Response } from "express";
import router from "./routes/routes";
import dotenv from "dotenv";
import connectDB from "./db";

dotenv.config();

connectDB()
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/students", router);

app.listen(PORT, () => {
  console.log(`[SERVER]: listening on http://localhost:${PORT}`);
});
