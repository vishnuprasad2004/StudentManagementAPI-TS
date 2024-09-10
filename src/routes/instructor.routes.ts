import { Router } from "express";
import { getInstructor, getAllInstructors, createInstructor } from "../controllers/intructor.controller";

const router = Router();

router.route("/").get(getAllInstructors);
router.route("/").post(createInstructor);
// router.route("/q").get();
router.route("/:instructorId").get(getInstructor);
// router.route("/:rollno").put();
// router.route("/:rollno").delete();

export default router;
