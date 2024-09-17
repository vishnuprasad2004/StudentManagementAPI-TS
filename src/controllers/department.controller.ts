import { Request, Response } from "express";
import Department from "../models/department.model";
import Instructor from "../models/instructor.model";
import mongoose from "mongoose";

export async function getDepartment(req: Request, res: Response) {
    try {
        const department = await Department.find({ name: req.params.departmentName })
            .populate("instructors")
            .populate("courses")
            .exec();
        if (department.length == 0) {
            throw new Error("Department not Found");
        }
        console.log(department);
        res.status(200).json(department);

    } catch (error: any) {

        console.log(error);
        res.status(404).json({ message: error.message });
    }
}


export async function getAllDepartments(req: Request, res: Response) {
    try {
        const departments = await Department.find()
            .populate("instructors")
            .populate("courses")
            .exec();
        
        if (departments.length == 0) {
            throw new Error("Departments not Found");
        }
        console.log(departments);
        res.status(200).json(departments);
    } catch (error: any) {

        console.log(error.message);
        res.status(404).json({ message: error.message });
    }
}

/**
 * @param req 
 *  name: Name of the Department, ex: CSE, ME, CHE,
 *  head: insrtuctorId
 */
export async function addDepartment(req: Request, res: Response) {
    try {
        const {name, head} = req.body;
        if([name, head].some((e) => e === undefined)) {

        }
        const department = await Department.create(req.body);
        console.log(department);
        res.status(201).json(department);

    } catch (error: any) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
}

/**
 * This will be only used when the head of the department is changed 
 * @param req Department Name, Head of the Department InstructorId
 */
export async function updateDepartmentDetails(req:Request, res: Response) {
    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        const department = await Department.find({ name: req.params.departmentName });
        if (department.length == 0) {
            throw new Error("Department not Found");
        }

        const headInstructor = await Instructor.findOne({ instructorId: req.body.headInstructorId });
        if (!headInstructor) {
            throw new Error("Instructor not Found");
        }
        await Department.findOneAndUpdate({ name: req.params.departmentName }, {$set: { head: headInstructor._id } });
        
        res.status(200).json({ message: `updated the head of the department to ${headInstructor.name}`});

        await session.commitTransaction();
        session.endSession();
    } catch (error: any) {
        console.log(error.message);
        res.status(404).json({ message: error.message });
    }

}