import { Router } from "express";
import { addDepartment, getAllDepartments, getDepartment } from "../controllers/department.controller";

const router = Router();

router.route("/").get(getAllDepartments);
router.route("/").post(addDepartment);
router.route("/q").get();
router.route("/:name").get(getDepartment);
router.route("/:rollno").put();
router.route("/:rollno").delete();

export default router;
