import { Router } from "express";
const { getStudent, createStudent, getStudents, updateStudent, deleteStudent } = require("../controllers/student.controller");
const router = Router();

router.route("/").get(getStudents);
router.route("/").post(createStudent);
router.route("/:rollno").get(getStudent);
router.route("/:rollno").put(updateStudent);
router.route("/:rollno").delete(deleteStudent);

export default router;
