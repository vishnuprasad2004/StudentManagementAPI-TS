import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    courseId: {
        type: String,
        trim:true,
        unique: true,
        required: [true, "Please add the course ID"],  
    },
    title: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Please add the student name"],
    },
    description: {
        type: String,
        required: [true, "Please add the description"],
        trim: true,
    },
    creditScore: {
        type: Number,
        min:2,
        max:5,
        required: [true, "Please add the credit score"],
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor",
        required: [true, "Please add the instructor"]
    },
    department: {
        type: mongoose.Types.ObjectId,
        ref: "Department",
        required: [true, "Please add the department"]
    },
    
}, { timestamps: true });

let Course: mongoose.Model<any>;

if (mongoose.models && (mongoose.models as any).Course) {
    Course = (mongoose.models as any).Course as mongoose.Model<any>;
} else {
    Course = (mongoose.model as any)("Course", CourseSchema) as mongoose.Model<any>;
}

export default Course;