import { Response, Request } from 'express';
import Course from '../models/courses.model';
import Instructor from '../models/instructor.model';
import Department from '../models/department.model';


export async function getCourse(req: Request, res: Response) {
    try {
        const course = await Course.find({ name: req.params.name });
        if (course.length == 0) {
            throw new Error("Course not Found");
        }
        console.log(course);
        res.status(200).json(course);

    } catch (error: any) {

        console.log(error.message);
        res.status(404).json({ message: error.message });
    }
}


export async function getAllCourses(req: Request, res: Response) {
    try {
        const courses = await Course.find();
        if (courses.length == 0) {
            throw new Error("Courses not Found");
        }
        console.log(courses);
        res.status(200).json(courses);

    } catch (error: any) {

        console.log(error.message);
        res.status(404).json({ message: error.message });
    }
}


// export async function getCourseByInstructor(req: Request, res: Response) {
//     try {
//         const courses = await Course.find({ instructor: req.params.instructor });
//         if (courses.length == 0) {
//             throw new Error("Courses not Found");
//         }
//         console.log(courses);
//         res.status(200).json(courses);

//     } catch (error: any) {

//         console.log(error.message);
//         res.status(404).json({ message: error.message });
//     }
// }

/**
 * Add a new course to the database
 */
export async function addCourse(req: Request, res: Response) {
    try {
        const { title, description, creditScore, instructorId, department } = req.body;
        if(!title || !description || !creditScore || !instructorId) {
            throw new Error("Please fill all the fields");
        }

        const instructor = await Instructor.findOne({instructorId: instructorId});
        if(!instructor) {
            throw new Error("Instructor not Found, wrong instructor ID");
        }

        const dept = await Department.findOne({name: department});
        if(!dept) {
            throw new Error("Department not Found, wrong department name");
        }

        const newCourse = await Course.create({
            title,
            description,
            creditScore,
            instructor: instructor._id,
            department: dept._id
        })

        res.status(201).json({ message: "Course created", addedCourse: newCourse });

    } catch (error: any) {
        console.log(error.message);
        res.status(404).json({ message: error.message });
    }
}