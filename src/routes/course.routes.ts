import { Router } from "express";

const router = Router();

router.route("/").get();
router.route("/").post();
router.route("/q").get();
router.route("/:rollno").get();
router.route("/:rollno").put();
router.route("/:rollno").delete();

export default router;
