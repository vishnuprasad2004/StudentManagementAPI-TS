import { Router } from "express";
import { getInstructor, getAllInstructors, createInstructor } from "../controllers/intructor.controller";
import authorize from "../middlewares/authorization.middleware";

const router = Router();

router.route("/").get(authorize(["admin", "instructor"]), getAllInstructors);
router.route("/").post(authorize(["admin"]), createInstructor);
// router.route("/q").get();
router.route("/:instructorId").get(authorize(["admin", "instructor"]), getInstructor);
// router.route("/:rollno").put();
// router.route("/:rollno").delete();

export default router;
