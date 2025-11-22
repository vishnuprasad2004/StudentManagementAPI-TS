// ...existing code...
import mongoose, { Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IStudent {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    gender: string;
    rollno: string;
    department: mongoose.Types.ObjectId;
    cgpa: number;
    password: string;
    role: string;
}

export type StudentDocument = IStudent & mongoose.Document;

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
                return /^\d{2}[A-Z]{2,7}\d{3,4}$/.test(v);
            },
            message: (props: any) => `${props.value} is not a valid official rollno!`
        }
        
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
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
    },
    role: {
        type: String,
        default: "student",
    }
}, {
    timestamps: true
});

StudentSchema.pre("save", async function (this: StudentDocument, next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})


let Student: Model<StudentDocument>;

if (mongoose.models && (mongoose.models as any).Student) {
    Student = (mongoose.models as any).Student as Model<StudentDocument>;
} else {
    Student = mongoose.model<StudentDocument>("Student", StudentSchema);
}

export default Student;