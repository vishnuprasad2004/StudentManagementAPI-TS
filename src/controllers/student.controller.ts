import { Request, Response } from "express";
import Student from "../models/student.model";

type StudentData = {
    name: string;
    email: string;
    rollno: string;
    department: string;
    gender: string;
    cgpa: Number;
};

export async function getStudent(req: Request, res: Response) {
    try {
        //
        const student = await Student.findOne({ rollno: req.params.rollno });
        if (!student) {
            throw new Error(`Student not found with ${req.params.rollno}`);
        }
        console.log(student);
        res.status(200).json({message: `Student with rollno ${req.params.rollno} found`, data:student});

    } catch (error: any) {

        console.log(error.message);
        res.status(404).json({ message: error.message, data: [] });
    }
}

export async function getStudents(req: Request, res: Response) {
    try {
        const { department, gender } = req.query
        let students = []

        // getting students of a particular department and gender 
        if(department && gender) {
            students = await Student.find({ $and: [{ department: department }, { gender: gender }] })
            console.log(students);
            res.status(200).json(students);
            return
        }
        // getting students of a particular department only
        if(department) {
            students = await Student.find({ department: department })
            console.log(students);
            res.status(200).json(students);
            return
        }
        // getting students of a particular gender only
        if(department) {
            students = await Student.find({ gender:gender })
            console.log(students);
            res.status(200).json(students);
            return
        }

    } catch(error: any) {

        console.log(error.message);
        res.status(404).json({ message: error.message });
    }
}

export async function getAllStudents(req: Request, res: Response) {
    try {

        const students = await Student.find();
        if (students.length == 0) {
            throw new Error("Students not found");
        }
        console.log(students);
        res.status(200).json({message: `All Students found`, data: students});

    } catch (error: any) {

        console.log(error.message);
        res.status(404).json({ message: error.message, data: [] });
    }
}

export async function getStudentsMetaData(req: Request, res: Response) {
    try {

        const groupedRes = await Student.aggregate([{
            $group: {
                _id: "$department",
                count: { $sum: 1 }
            }
        },{
            $sort: {
                count: -1
            }
        },{
            // Rename _id to department
            $project: {
                _id: 0,
                department: "$_id",   
                count: 1
            }
        }])
        console.log(groupedRes);
        res.status(200).json({meassage: "The data regarding number of students in each department", data: groupedRes});

    } catch(error: any) {
        console.log(error.message);
        res.status(404).json({ message: error.message, data: [] });
    }
}


export async function createStudent(req: Request, res: Response) {
    try {
        // get the data
        const { name, rollno, department, email, gender, cgpa }: StudentData = req.body;
        if (!name || !email || !rollno || !department) {
            throw new Error("All fields are Mandatory!!")
        }
        // create the student in the db
        const newStudent = await Student.create({
            name,
            email,
            rollno,
            department,
            gender,
            cgpa
        });
        res.status(201).json({ message: "Created a new student", data: newStudent });
    } catch (error: any) {
        console.log(error.message);
        res.status(404).json({ message: error.message, data: {} });
    }
}



export async function updateStudent(req: Request, res: Response) {
    try {
        const student = await Student.findOne({ rollno: req.params.rollno });
        if (!student) {
            throw new Error(`Student not found ${req.params.rollno}`);
        }
        const updatedStudent = await Student.updateOne({ rollno: req.params.rollno }, req.body, { new: true });
        res.status(200).json({ message: `update student data with ${req.params.rollno}`, data: updatedStudent });

    } catch (error: any) {
        console.log(error.message);
        res.status(404).json({ message: error.message, data: {} });
    }
}



export async function deleteStudent(req: Request, res: Response) {
    try {
        const student = await Student.findOne({ rollno: req.params.rollno });
        if (!student) {
            throw new Error(`Student Not found with rollno ${req.params.rollno}`);
        }
        const deletedStudent = await Student.deleteOne({ rollno: req.params.rollno });
        res.status(200).json({ message: "deleted student", data: deletedStudent });

    } catch (error: any) {
        console.log(error.message);
        res.status(404).json({ message: error.message, data: {} });
    }
}
