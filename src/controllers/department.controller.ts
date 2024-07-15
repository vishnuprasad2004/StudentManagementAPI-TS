import { Request, Response } from "express";
import Department from "../models/department.model";

export async function getDepartment(req: Request, res: Response) {
    try {
        const department = await Department.find({ name: req.params.name });
        if (department.length == 0) {
            throw new Error("Department not Found");
        }
        console.log(department);
        res.status(200).json(department);

    } catch (error: any) {

        console.log(error.message);
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

export async function addDepartment(req: Request, res: Response) {
    try {
        const department = await Department.create(req.body);
        console.log(department);
        res.status(201).json(department);

    } catch (error: any) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
}