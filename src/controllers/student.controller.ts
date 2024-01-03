import { Request, Response } from "express";
import Student from "../models/studentModel";

type StudentData = {
    name: string;
    email: string;
    rollno: string;
    department: string;
};

export async function getStudent(req: Request, res: Response) {
    try {
        //
        const student = await Student.find({ rollno: req.params.rollno });
        if (student.length == 0) {
            throw new Error("Student not Found");
        }
        console.log(student);
        res.status(200).json(student);

    } catch (error: any) {

        console.log(error.message);
        res.status(404).json({ message: error.message });
    }
}



export async function getStudents(req: Request, res: Response) {
    try {

        const students = await Student.find();
        if (students.length == 0) {
            throw new Error("Student not Found");
        }
        console.log(students);
        res.status(200).json(students);

    } catch (error: any) {

        console.log(error.message);
        res.status(404).json({ message: error.message });
    }
}



export async function createStudent(req: Request, res: Response) {
    try {
        // get the data
        const { name, rollno, department, email }: StudentData = req.body;
        if (!name || !email || !rollno || !department) {
            res.status(400).json({ message: "All fields are Mandatory!!" });
        }
        // create the student in the db
        const newStudent = await Student.create({
            name,
            email,
            rollno,
            department,
        });
        res.status(201).json({ message: "created student", addedStudent: newStudent });
    } catch (error: any) {
        console.log(error.message);
        res.status(404).json({ message: error.message });
    }
}



export async function updateStudent(req: Request, res: Response) {
    try {
        const student = await Student.find({ rollno: req.params.rollno });
        if (student.length == 0) {
            throw new Error("Student not Found");
        }
        const updatedStudent = await Student.updateOne({ rollno: req.params.rollno }, req.body, { new: true });
        res.status(200).json({ message: `update student data with ${req.params.rollno}`, update: updatedStudent });

    } catch (error: any) {
        console.log(error.message);
        res.status(404).json({ message: error.message });
    }
}



export async function deleteStudent(req: Request, res: Response) {
    try {
        const student = await Student.find({ rollno: req.params.rollno });
        if (student.length == 0) {
            throw new Error(" Student Not Found ");
        }
        const deletedStudent = await Student.deleteOne({ rollno: req.params.rollno });
        res.status(200).json({ message: "deleted student", student: deletedStudent });

    } catch (error: any) {
        console.log(error.message);
        res.status(404).json({ message: error.message });
    }
}
