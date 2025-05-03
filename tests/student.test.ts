import app from "../src/app";
import request from "supertest";
import mongoose from 'mongoose';
import connectDB from "../src/db";
import dotenv from 'dotenv';


const originalLog = console.log;

describe('Student API Endpoints', () => {

    beforeAll(async() => {
        // Suppress all console logs
        dotenv.config();
        await connectDB();
        console.log = jest.fn();
    });

    it('should return a 200 status for fetching all students, GET /api/students', async () => {
        const res = await request(app).get('/api/students');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.data)).toBe(true);

    });

    it('should return a 200 status for fetching a particular student, GET /api/students/:rollno', async () => {
        const res = await request(app).get('/api/students/22ECE012');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.data)).toBe(false);
    });

    it('should return a 404 for fetching a unknown student data, GET /api/student/:rollno', async () => {
        const res = await request(app).get('/api/students/lol');
        expect(res.statusCode).toEqual(404);
    });

    it('should return a 200 status for GET /api/students/metadata', async () => {
        const res = await request(app).get('/api/students/metadata');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return a 200 status for fetching all students for a particular dept. GET /api/students?department', async () => {
        const res = await request(app).get('/api/students?department=CSE');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    })

    it("should return a 404 status for creating a student without all the fields, POST /api/students/", async () => {
        const res = await request(app).post('/api/students').send({
            "rollno": "22CSEAIML006",
            "name": "John Doe",
        })
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toBe("All fields are Mandatory!!");
    })

    afterAll(async()=> {
        await mongoose.connection.close();
        // Restore original console log after tests
        console.log = originalLog;
    })
});

