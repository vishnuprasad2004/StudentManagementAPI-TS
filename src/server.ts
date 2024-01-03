import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
  let s1 = {
    name: "gug",
    age: 12,
    phoneNumber: 123456,
    rollno: "22cseaiml122",
    something: "Hello World555555555"
  };
  res.status(200).json({ message: "Ok", s1 });
});

app.listen(PORT, () => {
  console.log(`SERVER: listening on http://localhost${PORT}`);
});
