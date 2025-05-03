import { Request, Response } from "express";
import Instructor from "../models/instructor.model";
import Department from "../models/department.model";
import mongoose from "mongoose";


export async function getInstructor(req: Request, res: Response) {
    try {
        const instructor = await Instructor.find({ instructorId: req.params.instructorId });
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

/**
 * 
 * @param req instructor ID, name, email, departmentName
 */
export async function createInstructor(req: Request, res: Response) {
    try {
        const { instructorId, name, email, departmentName, password } = req.body;
        if ([instructorId, name, email, departmentName, password].some((e) => e === undefined)) {
            throw new Error("Please provide all the details");
        }

        // creating a transaction (multiple operations as a single unit of work, it can either succeed or fail)
        const session = await mongoose.startSession();
        session.startTransaction();

        const department = await Department.findOne({ name: departmentName });
        if (!department) {
            throw new Error("Department not Found");
        }

        
        const instructor = await Instructor.create({ instructorId, name, email, departmentId: department._id, password });
        console.log(instructor);

        await Department.findOneAndUpdate({ name: departmentName }, { $push: { instructors: instructor._id } });
        res.status(201).json({message:"Instructor created", data: instructor});


        await session.commitTransaction();
        session.endSession();

    } catch (error: any) {

        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
}

// TODO: update instructor details updateInstructor()
// TODO: delete instructor deleteInstructor()