import { Router } from "express";
import { getStudent, createStudent, getAllStudents, getStudents, updateStudent, deleteStudent, getStudentsMetaData } from "../controllers/student.controller"
import authorizeRole from "../middlewares/authorization.middleware";
const router = Router();

router.route("/").get(getAllStudents);
router.route("/").post(createStudent);
router.route("/q").get(getStudents);
router.route("/metadata").get(getStudentsMetaData);
router.route("/:rollno").get(getStudent);
router.route("/:rollno").put(updateStudent);
router.route("/:rollno").delete(deleteStudent);

export default router;
