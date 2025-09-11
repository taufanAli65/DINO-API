# DINO-API

A RESTful API for managing historical kingdoms (Kerajaan), figures (Tokoh), quizzes, questions, and user authentication/authorization for an educational platform. Built with Node.js, Express, TypeScript, and PostgreSQL using Prisma ORM.

---

## Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [User](#user)
  - [Kerajaan (Kingdom)](#kerajaan-kingdom)
  - [Question Category](#question-category)
  - [Question](#question)
  - [Quiz & Student Answer](#quiz--student-answer)

---

## Overview

DINO-API is designed to support a quiz-based learning platform about Indonesian kingdoms and historical figures. It provides endpoints for user registration/login, managing kingdoms, figures, questions, quizzes, and student answers, with role-based access control (Student, Teacher, Admin).

---

## Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **npm** v9 or higher
- **PostgreSQL** (local or remote instance)

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/taufanAli65/DINO-API.git
   cd dino-api
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```
4. **Run database migrations:**
   ```bash
   npx prisma migrate deploy
   # or for development
   npx prisma migrate dev
   ```

### Configuration
1. **Create a `.env` file** in the project root (you can copy from `.env.example` if available):
   ```bash
   cp .env.example .env
   ```
2. **Set the following environment variables:**
   - `DATABASE_URL` — PostgreSQL connection string (e.g., `postgresql://user:password@localhost:5432/dino`)
   - `JWT_SECRET` — Secret key for JWT token signing
   - `PORT` — Port for the server (default: 3000)
   - `SALT_ROUNDS` — (optional) Bcrypt salt rounds (default: 5)

---

## Running the Application

- **Development mode (with hot reload):**
  ```bash
  npm run dev
  ```
- **Production build:**
  ```bash
  npm run build
  npm start
  ```

---

## API Endpoints

All endpoints are prefixed by their respective resource (e.g., `/auth`, `/kerajaan`). Most endpoints require authentication via JWT (send as `Authorization: Bearer <token>`).

### Authentication

#### Register Student
- **POST** `/auth/register/student`
- **Description:** Register a new student user.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response:**
  ```json
  {
    "status": "success",
    "message": "Student registered successfully",
    "data": {
      "name": "John Doe",
      "email": "john@example.com",
      "role": "STUDENT"
    }
  }
  ```
- **Error Response:**
  ```json
  { "status": "fail", "message": "Email is already taken", "data": null }
  ```
- **cURL Example:**
  ```bash
  curl -X POST http://localhost:3000/auth/register/student \
    -H "Content-Type: application/json" \
    -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
  ```

#### Register Teacher
- **POST** `/auth/register/teacher`
- **Description:** Register a new teacher user.
- **Request Body:** (same as above)
- **Success/Error Response:** (same as above, but `role` is `TEACHER`)
- **cURL Example:**
  ```bash
  curl -X POST http://localhost:3000/auth/register/teacher \
    -H "Content-Type: application/json" \
    -d '{"name":"Jane Teacher","email":"jane@example.com","password":"password123"}'
  ```

#### Login
- **POST** `/auth/login`
- **Description:** Authenticate user and receive JWT token.
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response:**
  ```json
  {
    "status": "success",
    "message": "Login successful",
    "data": { "token": "<JWT_TOKEN>" }
  }
  ```
- **Error Response:**
  ```json
  { "status": "fail", "message": "Invalid password", "data": null }
  ```
- **cURL Example:**
  ```bash
  curl -X POST http://localhost:3000/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"john@example.com","password":"password123"}'
  ```

---

### User

#### Get Current User
- **GET** `/user/me`
- **Description:** Get info about the currently authenticated user.
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:**
  ```json
  {
    "status": "success",
    "message": "User info retrieved successfully",
    "data": {
      "user": {
        "id": "...",
        "email": "...",
        "role": "STUDENT"
      }
    }
  }
  ```
- **cURL Example:**
  ```bash
  curl -H "Authorization: Bearer <token>" http://localhost:3000/user/me
  ```

#### Delete User (Teacher only)
- **DELETE** `/user/:id`
- **Description:** Delete a user by ID (Teacher role required).
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:**
  ```json
  { "status": "success", "message": "User deleted successfully", "data": null }
  ```
- **Error Response:**
  ```json
  { "status": "fail", "message": "Error deleting user", "data": null }
  ```
- **cURL Example:**
  ```bash
  curl -X DELETE -H "Authorization: Bearer <token>" http://localhost:3000/user/<userId>
  ```

---

### Kerajaan (Kingdom)

#### List All Kerajaan
- **GET** `/kerajaan`
- **Description:** List all kingdoms (paginated).
- **Headers:** `Authorization: Bearer <token>`
- **Query Params:**
  - `page` (number, optional)
  - `pageSize` (number, optional)
- **Success Response:**
  ```json
  {
    "status": "success",
    "message": "Kerajaan list fetched successfully",
    "data": [
      { "id": 1, "name": "Majapahit", ... }
    ]
  }
  ```
- **cURL Example:**
  ```bash
  curl -H "Authorization: Bearer <token>" http://localhost:3000/kerajaan?page=1&pageSize=10
  ```

#### Get Kerajaan by ID
- **GET** `/kerajaan/:id`
- **Description:** Get details of a specific kingdom.
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:**
  ```json
  { "status": "success", "message": "Kerajaan fetched successfully", "data": { ... } }
  ```
- **Error Response:**
  ```json
  { "status": "fail", "message": "Kerajaan not found", "data": null }
  ```
- **cURL Example:**
  ```bash
  curl -H "Authorization: Bearer <token>" http://localhost:3000/kerajaan/1
  ```

#### Create Kerajaan (Teacher only)
- **POST** `/kerajaan`
- **Description:** Create a new kingdom (Teacher role required).
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "Majapahit",
    "startdate": "1293-01-01T00:00:00.000Z",
    "enddate": "1527-01-01T00:00:00.000Z",
    "king_name": "Raden Wijaya",
    "description": "A powerful kingdom in Java."
  }
  ```
- **Success/Error Response:** (see above)
- **cURL Example:**
  ```bash
  curl -X POST -H "Authorization: Bearer <token>" -H "Content-Type: application/json" \
    -d '{"name":"Majapahit","startdate":"1293-01-01T00:00:00.000Z","enddate":"1527-01-01T00:00:00.000Z","king_name":"Raden Wijaya","description":"A powerful kingdom in Java."}' \
    http://localhost:3000/kerajaan
  ```

#### Update Kerajaan (Teacher only)
- **PUT** `/kerajaan/:id`
- **Description:** Update a kingdom by ID (Teacher role required).
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:** (same as create)
- **cURL Example:**
  ```bash
  curl -X PUT -H "Authorization: Bearer <token>" -H "Content-Type: application/json" \
    -d '{"name":"Majapahit Baru"}' http://localhost:3000/kerajaan/1
  ```

#### Delete Kerajaan (Teacher only)
- **DELETE** `/kerajaan/:id`
- **Description:** Delete a kingdom by ID (Teacher role required).
- **Headers:** `Authorization: Bearer <token>`
- **cURL Example:**
  ```bash
  curl -X DELETE -H "Authorization: Bearer <token>" http://localhost:3000/kerajaan/1
  ```

---

### Question Category

#### List Categories
- **GET** `/question-category`
- **Description:** List question categories (paginated, filter by isKerajaan).
- **Headers:** `Authorization: Bearer <token>`
- **Query Params:**
  - `isKerajaan` (boolean, required)
  - `page` (number, optional)
  - `pageSize` (number, optional)
- **cURL Example:**
  ```bash
  curl -H "Authorization: Bearer <token>" "http://localhost:3000/question-category?isKerajaan=true"
  ```

#### Create Category (Teacher only)
- **POST** `/question-category`
- **Description:** Create a new question category (Teacher role required).
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "isKerajaan": true,
    "kerajaanId": 1
  }
  ```
- **cURL Example:**
  ```bash
  curl -X POST -H "Authorization: Bearer <token>" -H "Content-Type: application/json" \
    -d '{"isKerajaan":true,"kerajaanId":1}' http://localhost:3000/question-category
  ```

#### Update Category (Teacher only)
- **PUT** `/question-category/:id`
- **Description:** Update a question category by ID (Teacher role required).
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:** (same as create)
- **cURL Example:**
  ```bash
  curl -X PUT -H "Authorization: Bearer <token>" -H "Content-Type: application/json" \
    -d '{"isKerajaan":false,"tokohId":2}' http://localhost:3000/question-category/1
  ```

#### Delete Category (Teacher only)
- **DELETE** `/question-category/:id`
- **Description:** Delete a question category by ID (Teacher role required).
- **Headers:** `Authorization: Bearer <token>`
- **cURL Example:**
  ```bash
  curl -X DELETE -H "Authorization: Bearer <token>" http://localhost:3000/question-category/1
  ```

#### Bulk Delete by Type (Teacher only)
- **DELETE** `/question-category?isKerajaan=true|false`
- **Description:** Delete all categories of a type (Teacher role required).
- **Headers:** `Authorization: Bearer <token>`
- **cURL Example:**
  ```bash
  curl -X DELETE -H "Authorization: Bearer <token>" "http://localhost:3000/question-category?isKerajaan=true"
  ```

---

### Question

#### List Questions by Category
- **GET** `/question/category/:categoryId`
- **Description:** List questions for a category (paginated).
- **Headers:** `Authorization: Bearer <token>`
- **Query Params:**
  - `page` (number, optional)
  - `pageSize` (number, optional)
- **cURL Example:**
  ```bash
  curl -H "Authorization: Bearer <token>" http://localhost:3000/question/category/1
  ```

#### Create Question (Teacher only)
- **POST** `/question`
- **Description:** Create a new question (Teacher role required).
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "categoryId": 1,
    "text": "Who was the first king of Majapahit?",
    "optionA": "Raden Wijaya",
    "optionB": "Gajah Mada",
    "optionC": "Hayam Wuruk",
    "optionD": "Kertanegara",
    "correctOption": "A"
  }
  ```
- **cURL Example:**
  ```bash
  curl -X POST -H "Authorization: Bearer <token>" -H "Content-Type: application/json" \
    -d '{"categoryId":1,"text":"Who was the first king of Majapahit?","optionA":"Raden Wijaya","optionB":"Gajah Mada","optionC":"Hayam Wuruk","optionD":"Kertanegara","correctOption":"A"}' \
    http://localhost:3000/question
  ```

#### Update Question (Teacher only)
- **PUT** `/question/:id`
- **Description:** Update a question by ID (Teacher role required).
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:** (same as create, fields optional)
- **cURL Example:**
  ```bash
  curl -X PUT -H "Authorization: Bearer <token>" -H "Content-Type: application/json" \
    -d '{"text":"Updated question text"}' http://localhost:3000/question/1
  ```

#### Delete Question (Teacher only)
- **DELETE** `/question/:id`
- **Description:** Delete a question by ID (Teacher role required).
- **Headers:** `Authorization: Bearer <token>`
- **cURL Example:**
  ```bash
  curl -X DELETE -H "Authorization: Bearer <token>" http://localhost:3000/question/1
  ```

---

### Quiz & Student Answer

#### Create Quiz
- **POST** `/quiz`
- **Description:** Create a quiz attempt for a user and question.
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "questionId": 1,
    "userId": "<user-uuid>",
    "score": 0
  }
  ```
- **Success Response:**
  ```json
  {
    "status": "success",
    "message": "Quiz created successfully",
    "data": {
      "id": 1,
      "questionId": 1,
      "userId": "...",
      "score": 0
    }
  }
  ```
- **cURL Example:**
  ```bash
  curl -X POST -H "Authorization: Bearer <token>" -H "Content-Type: application/json" \
    -d '{"questionId":1,"userId":"<user-uuid>","score":0}' http://localhost:3000/quiz
  ```

#### Get Quiz by ID (Teacher only)
- **GET** `/quiz/:id`
- **Description:** Get quiz details by ID (Teacher role required).
- **Headers:** `Authorization: Bearer <token>`
- **cURL Example:**
  ```bash
  curl -H "Authorization: Bearer <token>" http://localhost:3000/quiz/1
  ```

#### Add Student Answer
- **POST** `/quiz/:id/answer`
- **Description:** Submit an answer for a quiz attempt.
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  { "selectedOption": "A" }
  ```
- **Success Response:**
  ```json
  {
    "status": "success",
    "message": "Student answer added successfully",
    "data": {
      "student_answer": "A",
      "correct_answer": "A",
      "correct": true
    }
  }
  ```
- **cURL Example:**
  ```bash
  curl -X POST -H "Authorization: Bearer <token>" -H "Content-Type: application/json" \
    -d '{"selectedOption":"A"}' http://localhost:3000/quiz/1/answer
  ```

#### Get Student Answers by Quiz (Teacher only)
- **GET** `/quiz/:id/answers`
- **Description:** List all student answers for a quiz (Teacher role required).
- **Headers:** `Authorization: Bearer <token>`
- **cURL Example:**
  ```bash
  curl -H "Authorization: Bearer <token>" http://localhost:3000/quiz/1/answers
  ```

---

## Error Handling

All error responses follow this format:
```json
{
  "status": "fail",
  "message": "<error message>",
  "data": null
}
```

---

## License

This project is licensed under the ISC License.
