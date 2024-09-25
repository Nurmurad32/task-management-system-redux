# Task Management System

This project is a Task Management System built using the MERN stack (MongoDB, Express.js, React, and Node.js). The application allows users to create, update, delete, and manage tasks with different priorities and statuses.

## Features
- Full CRUD functionality for tasks.
- State management using Redux.
- API integration with backend.
- UI/UX optimizations.
- Routing with protected pages.

## Prerequisites
- Node.js (v14.x or higher)
- MongoDB (local or cloud instance)
- Git

## GitHub Repository
- Client Side:
- Server Side: 

## Setup Instructions

1. **Clone the Repository of client & server**

   ```bash
   git clone my-repository
   cd task-management-system

2. **Install Dependencies & Run the Application**
   
    ```bash
    # Install server dependencies
    cd server
    npm install
    npm run dev

    # Install client dependencies
    cd ../client
    yarn
    yarn dev

3. **Configure Environment Variables for server**
   Create a .env file in the server directory with the following variables

    ```bash
    DB_USER=your_db_user
    DB_PASS=your_db_password
    JWT_SECRET=your_jwt_secret
