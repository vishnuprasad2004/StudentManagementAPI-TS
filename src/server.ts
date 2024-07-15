import express from "express";
import studentRouter from "./routes/student.routes";
import deptRouter from "./routes/department.routes";
import intructorRouter from "./routes/intructor.routes";
import courseRouter from "./routes/course.routes";
import dotenv from "dotenv";
import connectDB from "./db";

dotenv.config();

connectDB()
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/students", studentRouter);
app.use("/api/departments", deptRouter);
app.use("/api/instructors", intructorRouter);
app.use("/api/courses", courseRouter);

app.listen(PORT, () => {
  console.log(`[SERVER]: listening on http://localhost:${PORT}`);
});
