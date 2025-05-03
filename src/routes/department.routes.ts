import { Router } from "express";
import { addDepartment, getAllDepartments, getDepartment, addHOD } from "../controllers/department.controller";
import authorize from "../middlewares/authorization.middleware";

const router = Router();

router.route("/").get(authorize(["admin"]), getAllDepartments);
router.route("/").post(authorize(["admin"]), addDepartment);
router.route("/q").get();
router.route("/:departmentName").get(authorize(["admin"]), getDepartment);
router.route("/:departmentName").put(authorize(["admin"]), addHOD);
router.route("/:departmentName").delete();

export default router;
