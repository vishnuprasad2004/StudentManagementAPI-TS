import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Please add the department name"],
    },
    head: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor",
        required: [true, "Please add the head of the department"],
    },
    instructors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor"
    }],
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],

    
});

const Department = mongoose.models.users || mongoose.model('departments', DepartmentSchema);

export default Department;