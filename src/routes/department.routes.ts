import { Router } from "express";
import { addDepartment, getAllDepartments, getDepartment, updateDepartmentDetails } from "../controllers/department.controller";

const router = Router();

router.route("/").get(getAllDepartments);
router.route("/").post(addDepartment);
router.route("/q").get();
router.route("/:departmentName").get(getDepartment);
router.route("/:departmentName").put(updateDepartmentDetails);
router.route("/:departmentName").delete();

export default router;
