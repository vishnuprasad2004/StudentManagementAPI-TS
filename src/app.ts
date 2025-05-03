import express from "express";
import studentRouter from "./routes/student.routes";
import deptRouter from "./routes/department.routes";
import intructorRouter from "./routes/instructor.routes";
import courseRouter from "./routes/course.routes";
import loginRouter from "./routes/login";

const app = express();

app.use(express.json());
app.use("/api/students", studentRouter);
app.use("/api/departments", deptRouter);
app.use("/api/instructors", intructorRouter);
app.use("/api/courses", courseRouter);
app.use("/api/login", loginRouter)


export default app;