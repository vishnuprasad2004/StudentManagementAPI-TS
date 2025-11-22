import { Response, Request } from 'express';
import Course from '../models/courses.model';
import Instructor from '../models/instructor.model';
import Department from '../models/department.model';


export async function getCourseDetails(req: Request, res: Response) {
    try {
        const course = await Course.findOne({ courseId: req.params.id });
        if (course.length == 0) {
            throw new Error("Course not Found");
        }
        console.log(course);
        res.status(200).json({data: course, message: "Course found"});

    } catch (error: any) {

        console.log(error.message);
        res.status(404).json({ message: error.message, data: {} });
    }
}


export async function getAllCoursesDetails(req: Request, res: Response) {
    try {
        const courses = await Course.find();
        if (courses.length == 0) {
            throw new Error("Courses not Found");
        }
        console.log(courses);
        res.status(200).json({data: courses, message: "Courses found"});

    } catch (error: any) {

        console.log(error.message);
        res.status(404).json({ message: error.message, data: [] });
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
 * @param req
 * @param res
 * Add a new course to the database
 * title:
 * description:
 * creditScore:
 * intructorId:
 * department: 
 */
export async function addCourse(req: Request, res: Response) {
    try {
        const { title, description, creditScore, instructorId, department, courseId } = req.body;
        if(!title || !description || !creditScore || !instructorId || !courseId) {
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
        // await Department.findOneAndUpdate({ name: departmentName }, { $push: { instructors: instructor._id } });
        // const newDept = await Department.updateOne({name: department}, {...department, courses: [...department.courses, title]}, {new: true});
        
        
        const newCourse = await Course.create({
            title,
            description,
            creditScore,
            instructor: instructor._id,
            department: dept._id,
            courseId
        });

        await Department.updateOne({name: department}, {$push: { courses: newCourse._id }});
        
        res.status(201).json({ message: "Course created, also added the course in the resp. Department", addedCourse: newCourse });

    } catch (error: any) {
        console.log(error.message);
        res.status(404).json({ message: error.message });
    }
}