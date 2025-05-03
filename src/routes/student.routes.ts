import { Router } from "express";
import { getStudent, createStudent, getAllStudents, getStudents, updateStudent, deleteStudent, getStudentsMetaData } from "../controllers/student.controller"
import authorize from "../middlewares/authorization.middleware";
const router = Router();

router.route("/").get(authorize(["admin", "instructor"]),getAllStudents);
router.route("/").post(authorize(["admin"]),createStudent);
router.route("/q").get(authorize(["instructor","admin"]),getStudents);
router.route("/metadata").get(authorize(["admin", "instructor"]),getStudentsMetaData);
router.route("/:rollno").get(authorize(["admin", "instructor", "student"]),getStudent);
router.route("/:rollno").put(authorize(["admin"]), updateStudent);
router.route("/:rollno").delete(authorize(["admin"]), deleteStudent);

export default router;
