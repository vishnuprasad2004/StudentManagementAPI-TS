import express, {Express, Request, Response} from "express"
// import dotenv from "dotenv";
// const express = require("express")
// const {Express, Request, Response} = require("@types/express")
// dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

type Student = {
    "name":String,
    "age":number,
    "rollno":String,
    "phoneNumber":number
}

app.get("/", (req:Request, res:Response) => {
    let s1:Student = {
        "name":"gug",
        "age":12,
        "phoneNumber":123456,
        "rollno":"22cseaiml122"
    }
    

});

app.listen(PORT,() => {
    console.log(`SERVER: listening on http://localhost${PORT}`)
})
console.log("Hello World");
