import app from "../src/server";
import request from "supertest";
import mongoose from 'mongoose';
import exp from "constants";


const originalLog = console.log;

describe('Student API Endpoints', () => {

    beforeAll(() => {
        // Suppress all console logs
        console.log = jest.fn();
    });

    it('should return a 200 status for GET /api/students', async () => {
        const res = await request(app).get('/api/students');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.data)).toBe(true);

    });

    it('should return a 200 status for GET /api/students/:rollno', async () => {
        const res = await request(app).get('/api/students/22CSEAIML005');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.data)).toBe(false);

    });

    it('should return a 404 for GET an unknown route', async () => {
        const res = await request(app).get('/api/students/lol');
        expect(res.statusCode).toEqual(404);
    });

    it('should return a 200 status for GET /api/students/metadata', async () => {
        const res = await request(app).get('/api/students/metadata');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return a 200 status for GET /api/students?department', async () => {
        const res = await request(app).get('/api/students?department=CSE');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    })

    it("should return a 200 status for POST /api/students/", async () => {
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

