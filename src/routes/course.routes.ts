import { Router } from "express";
import { addCourse, getAllCoursesDetails, getCourseDetails } from "../controllers/courses.controller";
import authorize from "../middlewares/authorization.middleware";

const router = Router();

router.route("/").get(authorize(["admin","instructor"]), getAllCoursesDetails);
router.route("/:id").get(authorize(["admin","instructor"]), getCourseDetails);
router.route("/").post(authorize(["admin"]), addCourse);
router.route("/q").get();

export default router;
