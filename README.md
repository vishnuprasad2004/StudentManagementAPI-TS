# Student Management API in Typescript

This API allows for the management of student records, including creating, reading, updating, and deleting student information.

## Endpoints

### 1. Get Student by Roll Number

**Endpoint:** `GET /students/:rollno`

**Description:** Retrieves a student record by their roll number.

**Parameters:**

- `rollno` (string) - The roll number of the student to retrieve.

**Responses:**

- **200 OK:** Returns the student record.

  ```json
  [
      {
          "name": "John Doe",
          "email": "john.doe@example.com",
          "rollno": "12345",
          "department": "Computer Science"
      }
  ]
  ```

- **404 Not Found:** Student not found.

  ```json
  {
      "message": "Student not Found"
  }
  ```

### 2. Get All Students

**Endpoint:** `GET /students`

**Description:** Retrieves all student records.

**Responses:**

- **200 OK:** Returns a list of all student records.

  ```json
  [
      {
          "name": "John Doe",
          "email": "john.doe@example.com",
          "rollno": "12345",
          "department": "Computer Science"
      },
      {
          "name": "Jane Smith",
          "email": "jane.smith@example.com",
          "rollno": "67890",
          "department": "Mechanical Engineering"
      }
  ]
  ```

- **404 Not Found:** No students found.

  ```json
  {
      "message": "Student not Found"
  }
  ```

### 3. Create Student

**Endpoint:** `POST /students`

**Description:** Creates a new student record.

**Request Body:**

- `name` (string) - Name of the student.
- `email` (string) - Email of the student.
- `rollno` (string) - Roll number of the student.
- `department` (string) - Department of the student.

**Responses:**

- **201 Created:** Student record created successfully.

  ```json
  {
      "message": "created student",
      "addedStudent": {
          "name": "John Doe",
          "email": "john.doe@example.com",
          "rollno": "12345",
          "department": "Computer Science"
      }
  }
  ```

- **400 Bad Request:** Missing mandatory fields.

  ```json
  {
      "message": "All fields are Mandatory!!"
  }
  ```

- **404 Not Found:** Error creating student.

  ```json
  {
      "message": "Error message"
  }
  ```

### 4. Update Student

**Endpoint:** `PUT /students/:rollno`

**Description:** Updates a student record by their roll number.

**Parameters:**

- `rollno` (string) - The roll number of the student to update.

**Request Body:** Fields to update (name, email, department).

**Responses:**

- **200 OK:** Student record updated successfully.

  ```json
  {
      "message": "update student data with 12345",
      "update": {
          "name": "John Doe",
          "email": "john.doe@example.com",
          "rollno": "12345",
          "department": "Computer Science"
      }
  }
  ```

- **404 Not Found:** Student not found.

  ```json
  {
      "message": "Student not Found"
  }
  ```

### 5. Delete Student

**Endpoint:** `DELETE /students/:rollno`

**Description:** Deletes a student record by their roll number.

**Parameters:**

- `rollno` (string) - The roll number of the student to delete.

**Responses:**

- **200 OK:** Student record deleted successfully.

  ```json
  {
      "message": "deleted student",
      "student": {
          "name": "John Doe",
          "email": "john.doe@example.com",
          "rollno": "12345",
          "department": "Computer Science"
      }
  }
  ```

- **404 Not Found:** Student not found.

  ```json
  {
      "message": "Student Not Found"
  }
  ```
