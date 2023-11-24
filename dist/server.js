"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import dotenv from "dotenv";
// const express = require("express")
// const {Express, Request, Response} = require("@types/express")
// dotenv.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
    let s1 = {
        "name": "gug",
        "age": 12,
        "phoneNumber": 123456,
        "rollno": "22cseaiml122"
    };
});
app.listen(PORT, () => {
    console.log(`SERVER: listening on http://localhost${PORT}`);
});
console.log("Hello World");
