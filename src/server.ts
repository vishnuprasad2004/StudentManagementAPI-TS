import express, { Express, Request, Response } from "express"
// import dotenv from "dotenv";

// dotenv.config();

const app: Express = express();
const PORT = 8080;

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({"message":"Hello World"})
});

app.listen(PORT,() => {
    console.log(`SERVER: listening on http://localhost${PORT}`)
})
