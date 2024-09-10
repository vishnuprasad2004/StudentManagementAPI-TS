import { Router } from "express";
import { addCourse, getAllCoursesDetails, getCourseDetails } from "../controllers/courses.controller";

const router = Router();

router.route("/").get(getAllCoursesDetails);
router.route("/").post(addCourse);
router.route("/q").get();
router.route("/:name").get(getCourseDetails);
router.route("/:rollno").put();
router.route("/:rollno").delete();

export default router;
