import app from "../src/app";
import request from "supertest";
import mongoose from 'mongoose';
import connectDB from "../src/db";
import dotenv from 'dotenv';

const originalLog = console.log;

describe('Courses API Endpoints', () => {

  beforeAll(async() => {
      // Suppress all console logs
      dotenv.config();
      await connectDB();
      console.log = jest.fn();
  });

  it('should return a 200 status for fetching all courses, GET /api/courses', async () => {
      const res = await request(app).get('/api/courses');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should return a 200 status for fetching a particular course, GET /api/courses/:id', async () => {
      const res = await request(app).get('/api/courses/CSIT03101');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body.data)).toBe(false);
  });

  it("should return a 404 status if course doesn't exist, for GET /api/courses/:id", async () => {
      const res = await request(app).get('/api/courses/ABS32129');
      expect(res.statusCode).toEqual(404);
      expect(Array.isArray(res.body.data)).toBe(false);
  });

  afterAll(async()=> {
      await mongoose.connection.close();
      // Restore original console log after tests
      console.log = originalLog;
  })
});

