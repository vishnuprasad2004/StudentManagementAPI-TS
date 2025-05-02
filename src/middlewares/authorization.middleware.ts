import { Request, Response, NextFunction } from "express";
import { Buffer } from "buffer";

export default function authorizeRole(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res
            .status(401)
            .json({ message: "Missing or malformed authorization header" });
    }

    // Extract the Base64-encoded credentials (Basic <Base64EncodedUsername:Password>)
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
        "utf-8"
    );
    const [username, password] = credentials.split(":");

    // Find the user by username
    console.log(`Authorization Header: ${username} and ${password}`);

    if (username == "admin") {
        return next();
    }

    if (username == req.params.rollno && password == req.params.rollno) {
        return next();
    }

    // res.status(403).json({ message: 'Forbidden access', data: {} });
    return res
        .status(403)
        .json({
            message:
                "Forbidden access, Only students can access their own data or admin can access everything.",
            data: {},
        });
}

// Middleware to verify JWT
// export const authMiddleware = (role: "student" | "instructor" = "student") => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
//         if (!token)
//             return res.status(401).json({ message: "No token provided" });

//         try {
//             const decoded: any = jwt.verify(token, JWT_SECRET);
//             const user = await User.findById(decoded.id);
//             if (!user)
//                 return res.status(401).json({ message: "Invalid token" });

//             // Role-based authorization
//             if (user.role !== role && role === "student") {
//                 return res
//                     .status(403)
//                     .json({ message: "Access denied for this role" });
//             }

//             // req.user = user; // Attach the user to the request 
//             next();
//         } catch (error) {
//             return res.status(401).json({ message: "Invalid token" });
//         }
//     };
// };
