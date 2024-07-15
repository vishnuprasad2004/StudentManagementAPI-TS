import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
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
    
});


const Course = mongoose.models.users || mongoose.model('courses', CourseSchema);

export default Course;