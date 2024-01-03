import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the student name"],
    },
    email: {
        type: String,
        required: [true, "Please add the email"],
    },
    rollno: {
        type: String,
        required: [true, "Please add the Roll Number"],
        unique: true,
        
    },
    department: {
        type: String,
        required: [true, "Please add the department"],
    }
}, {
    timestamps: true
});


const Student = mongoose.models.users || mongoose.model('students', StudentSchema);

export default Student;