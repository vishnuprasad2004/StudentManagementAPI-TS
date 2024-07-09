import { Router } from "express";
import { getStudent, createStudent, getAllStudents, getStudents, updateStudent, deleteStudent } from "../controllers/student.controller"
const router = Router();

router.route("/").get(getAllStudents);
router.route("/").post(createStudent);
router.route("/q").get(getStudents);
router.route("/:rollno").get(getStudent);
router.route("/:rollno").put(updateStudent);
router.route("/:rollno").delete(deleteStudent);

export default router;
