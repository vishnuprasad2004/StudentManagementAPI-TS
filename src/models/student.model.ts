import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please add the student name"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please add the official email"],
        validate: {
            validator: function (v: string) {
                return /^\d{2}[a-z]{2,7}\d{3,4}\.[a-z]+@giet\.edu$/.test(v);
            },
            message: (props: any) => `${props.value} is not a valid official email!`
        }
    },
    gender:{
        type: String,
        required: [true, "Please add your Gender"],
        enum: ["Male", "Female", "Other"]
    },
    rollno: {
        type: String,
        unique: true,
        required: [true, "Please add the Roll Number"],
        validate: {
            validator: function (v: string) {
                return /^\d{2}[a-z]{2,7}\d{3,4}$/.test(v);
            },
            message: (props: any) => `${props.value} is not a valid official email!`
        }
        
    },
    department: {
        type: mongoose.Types.ObjectId,
        ref: "Department",
        required: [true, "Please add the department"],
    },
    cgpa: {
        type: Number,
        required: [true, "Please add your CGPA"],
        min: 0,
        max: 10,
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        min: 4
    }
}, {
    timestamps: true
});


const Student = mongoose.models.users || mongoose.model('students', StudentSchema);

export default Student;