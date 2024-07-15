import { Request, Response } from "express";
import Instructor from "../models/instructor.model";


export async function getInstructor(req: Request, res: Response) {
    try {
        const instructor = await Instructor.find({ name: req.params.intructorId });
        if (instructor.length == 0) {
            throw new Error("Instructor not Found");
        }
        console.log(instructor);
        res.status(200).json(instructor);

    } catch (error: any) {

        console.log(error.message);
        res.status(404).json({ message: error.message });
    }
}

export async function getAllInstructors(req: Request, res: Response) {
    try {
        const instructors = await Instructor.find();
        if (instructors.length == 0) {
            throw new Error("Instructors not Found");
        }
        console.log(instructors);
        res.status(200).json(instructors);

    } catch (error: any) {

        console.log(error.message);
        res.status(404).json({ message: error.message });
    }
}