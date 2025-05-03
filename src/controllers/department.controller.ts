import { Request, Response } from "express";
import Department from "../models/department.model";
import Instructor from "../models/instructor.model";
import mongoose from "mongoose";

export async function getDepartment(req: Request, res: Response) {
    try {
        const department = await Department.aggregate([
            {
                $match: {
                    name: req.params.departmentName,
                },
            },
            {
                $lookup: {
                    from: "instructors",
                    localField: "instructors",
                    foreignField: "_id",
                    as: "instructors",
                },
            },
            {
                $lookup: {
                    from: "courses",
                    localField: "courses", 
                    foreignField: "_id", 
                    as: "courses",
                },
            },
            {
                $lookup: {
                    from: "students",
                    localField: "students", 
                    foreignField: "_id", 
                    as: "students", 
                },
            },
            {
                $addFields: {
                    numberOfStudents: { $size: "$students" },
                    numberOfCourses: { $size: "$courses" },
                    numberOfInstructors: { $size: "$instructors" },
                }
            },
            {
                $unset: ["instructors.departmentId", "instructors._id", "instructors.__v", "courses.__v", "courses.department",
                    "courses.updatedAt", "courses.createdAt", "courses.description", "students.__v", "students.department",
                    "students.password", "students.createdAt", "students.updatedAt", "__v"
                ]
            }, 
        ]).limit(1);
        if (department.length == 0) {
            throw new Error("Department not Found");
        }
        console.log(department);
        res.status(200).json({data: department[0], message: "Department Data found"});
    } catch (error: any) {
        console.log(error);
        res.status(404).json({ message: error.message, data: {} });
    }
}

export async function getAllDepartments(req: Request, res: Response) {
    try {
        const departments = await Department.aggregate([
            {
                $lookup: {
                    from: "instructors",
                    localField: "instructors",
                    foreignField: "_id",
                    as: "instructors",
                },
            },
            {
                $lookup: {
                    from: "courses", // Lookup from the courses collection
                    localField: "courses", // The field in departments that holds course IDs
                    foreignField: "_id", // The field in courses that matches those IDs
                    as: "courses", // The resulting array of course documents
                },
            },
            {
                $lookup: {
                    from: "students",
                    localField: "students", 
                    foreignField: "_id", 
                    as: "students", 
                },
            },
            {
                $addFields: {
                    numberOfStudents: { $size: "$students" },
                    numberOfCourses: { $size: "$courses" },
                    numberOfInstructors: { $size: "$instructors" },
                }
            },
            {
                $unset: ["instructors.departmentId", "instructors._id", "instructors.__v", "courses.__v", "courses.department",
                    "courses.updatedAt", "courses.createdAt", "courses.description", "students.__v", "students.department",
                    "students.password", "students.createdAt", "students.updatedAt", "__v"
                ]
            }
        ]);
        if (departments.length == 0) {
            throw new Error("Departments not Found");
        }
        console.log(departments);
        res.status(200).json({data: departments, message: "All Departments Data found"});
    } catch (error: any) {

        console.log(error.message);
        res.status(500).json({ message: error.message, data: [] });
    }
}

/**
 * @param req
 *  name: Name of the Department, ex: CSE, ME, CHE,
 *  head: insrtuctorId
 */
export async function addDepartment(req: Request, res: Response) {
    try {
        const { name, head } = req.body;
        if ([name, head].some((e) => e === undefined)) {
        }
        const department = await Department.create({name: name});
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
export async function addHOD(req: Request, res: Response) {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        const department = await Department.find({
            name: req.params.departmentName,
        });
        if (department.length == 0) {
            throw new Error("Department not Found");
        }

        const headInstructor = await Instructor.findOne({
            instructorId: req.body.headInstructorId,
        });
        if (!headInstructor) {
            throw new Error("Instructor not Found");
        }
        if(headInstructor.departmentId.toString() !== department[0]._id.toString()){
            throw new Error("Instructor not part of the department")
        }
        await Department.findOneAndUpdate(
            { name: req.params.departmentName },
            { $set: { head: headInstructor._id } }
        );

        res.status(200).json({
            message: `updated the head of the department to ${headInstructor.name}`,
        });

        await session.commitTransaction();
        session.endSession();
    } catch (error: any) {
        console.log(error.message);
        res.status(404).json({ message: error.message });
    }
}