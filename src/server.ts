import express from "express";
import dotenv from "dotenv";
import connectDB from "./db";
import app from "./app";

dotenv.config();

connectDB()

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`[SERVER]: listening on http://localhost:${PORT}`);
});
