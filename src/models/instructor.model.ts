import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const InstructorSchema = new mongoose.Schema({ 
    instructorId: {
        type: String,
        unique: true,
        required: [true, "Please add the instructor ID"],
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
        required: [true, "Please add the student name"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please add the official email"],
        validate: {
            validator: function (v: string) {
                return /^[a-z]+@giet\.edu$/.test(v);
            },
            message: (props: any) => `${props.value} is not a valid instuctor official email!`
        }
    },
    departmentId: {
        type: mongoose.Types.ObjectId,
        ref: "Department",
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
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
})

const Instructor = mongoose.models.instructors || mongoose.model('Instructor', InstructorSchema);

export default Instructor;