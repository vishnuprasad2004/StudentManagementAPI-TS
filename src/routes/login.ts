import jwt from "jsonwebtoken";
import { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";
import Student from "../models/student.model";
import Instructor from "../models/instructor.model";

const router = Router();

async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400)
                .json({ message: "Please provide email and password" });

        // check if the user is the admin
        if ( email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ) {
            const token = jwt.sign(
                { id: process.env.ADMIN_ID, role: "admin" },
                process.env.JWT_SECRET!,
                { expiresIn: "1h" }
            );
            return res.json({ token });
        }

        // perform queries sequentially to avoid TS2590 union type explosion
        const student = await Student.findOne({ email }) as any;
        let user: any = student;
        if (!user) {
            const instructor = await Instructor.findOne({ email }) as any;
            user = instructor;
        }

        if (!user) return res.status(404).json({ message: "Invalid Email" });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                rollno: user.rollno,
                instructorId: user.instructorId,
            },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );
        
        res.json({ token });
    
	} catch (error: any) {
    
		console.log(error);
        res.status(500).json({ message: error.message });
    }
}

router.route("/").post(login);
export default router;
