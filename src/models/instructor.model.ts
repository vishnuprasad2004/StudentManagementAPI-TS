import mongoose, { Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IInstructor {
    _id: mongoose.Types.ObjectId;
    instructorId: string;
    name: string;
    email: string;
    departmentId: mongoose.Types.ObjectId;
    password: string;
    role: string;
}


export type InstructorDocument = IInstructor & mongoose.Document;


const InstructorSchema = new mongoose.Schema<InstructorDocument>({
    instructorId: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (v: string) {
                return /^[A-Z]{3,7}[0-9]{1,4}$/.test(v);
            },
            message: (props: any) => `${props.value} is not a valid instructor ID!`
        }
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (v: string) {
                return /^[a-z]+@giet\.edu$/.test(v);
            },
            message: (props: any) => `${props.value} is not a valid instructor official email!`
        }
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
    },
    password: {
        type: String,
        required: true,
        min: 4
    },
    role: {
        type: String,
        default: "instructor",
    }
});

InstructorSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

let Instructor: Model<InstructorDocument>;

if (mongoose.models && (mongoose.models as any).Instructor) {
    Instructor = (mongoose.models as any).Instructor as Model<InstructorDocument>;
} else {
    Instructor = (mongoose.model as any)("Instructor", InstructorSchema) as Model<InstructorDocument>;
}

export default Instructor;