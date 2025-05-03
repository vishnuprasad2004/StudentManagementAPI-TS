import app from "../src/app";
import request from "supertest";
import mongoose from 'mongoose';
import connectDB from "../src/db";
import dotenv from 'dotenv';

const originalLog = console.log;

describe('Department API Endpoints', () => {

  beforeAll(async() => {
      // Suppress all console logs
      dotenv.config();
      await connectDB();
      console.log = jest.fn();
  });

  it('should return a 200 status for fetching all departments, GET /api/departments', async () => {
      const res = await request(app).get('/api/departments');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should return a 200 status for fetching a particular department details, GET /api/departments/:departmentName', async () => {
      const res = await request(app).get('/api/departments/CSE');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body.data)).toBe(false);
  });

  it("should return a 404 status if department doesn't exist, for GET /api/departments/:departmentName", async () => {
      const res = await request(app).get('/api/departments/ABCD');
      expect(res.statusCode).toEqual(404);
      expect(Array.isArray(res.body.data)).toBe(false);
  });

  
  afterAll(async()=> {
      await mongoose.connection.close();
      // Restore original console log after tests
      console.log = originalLog;
  })
});

