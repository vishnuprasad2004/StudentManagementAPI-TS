import mongoose from "mongoose";

const InstructorSchema = new mongoose.Schema({ 
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
    department: {
        type: mongoose.Types.ObjectId,
        ref: "Department",
    }
});

const Instructor = mongoose.models.users || mongoose.model('instructors', InstructorSchema);

export default Instructor;