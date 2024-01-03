import { Router } from "express";
import { getStudent, createStudent, getStudents, updateStudent, deleteStudent } from "../controllers/student.controller"
const router = Router();

router.route("/").get(getStudents);
router.route("/").post(createStudent);
router.route("/:rollno").get(getStudent);
router.route("/:rollno").put(updateStudent);
router.route("/:rollno").delete(deleteStudent);

export default router;
