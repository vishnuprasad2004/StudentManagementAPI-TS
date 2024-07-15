import mongoose from "mongoose";

type StudentData = {
    name: string,
    email: string,
    rollno: string,
    department: mongoose.Types.ObjectId,
    gender: string,
    cgpa: Number,
};


type DepartmentData = {
    name: string,
    head: mongoose.Types.ObjectId,
    instructors: mongoose.Types.ObjectId[],
    courses: mongoose.Types.ObjectId[]
};


type InstructorData = {
    name: string,
    email: string,
    department: mongoose.Types.ObjectId,
};


type CourseData = {
    title: string,
    description: string,
    creditScore: Number,
    instructor: mongoose.Types.ObjectId,
    department: mongoose.Types.ObjectId,
};


export { StudentData, CourseData, DepartmentData, InstructorData}