
# 📋 unsaidTalks™ Todo Manager
## A full-stack Task Management application built using the MERN (MongoDB, Express, React, Node.js) stack.  This application features secure user authentication via JWT and HTTP-only cookies, allowing users to create, manage, and track their daily

## 🚀 Features
### Backend (Node.js & Express)
#### Authentication: Secure Register/Login system using bcryptjs for password hashing and jsonwebtoken (JWT) for session management.
#### Authorization: Custom middleware (isAuthenticated) to protect private routes.
#### RESTful API: Clean endpoints for CRUD operations on tasks.
#### Database: MongoDB Atlas integration with Mongoose schemas for Users and Todos.
#### Security: Uses HTTP-only cookies for token storage to prevent XSS attacks.


### Frontend (React)
#### State Management: React Hooks (useState, useEffect) for handling local state and side effects.
#### Routing: react-router-dom for seamless navigation between Login, Register, and Home pages.
#### API Integration: Axios for communicating with the backend with withCredentials support.
#### UX/UI: Real-time status banners (Success/Error), task completion toggles, and a modern, dark-themed dashboard.


## 📂 Project Structure
```
TODO_BH4/
├── backend/
│   ├── config/             # Database connection (db.js)
│   ├── controllers/        # Logic for Todos and User Auth
│   ├── middlewares/        # Authentication checks
│   ├── models/             # Mongoose Schemas (User, Todo)
│   ├── routes/             # API Endpoint definitions
│   └── app.js              # Server entry point
└── frontend/
    ├── src/
    │   ├── components/     # React Components (Login, Register, Home)
    │   ├── assets/         # Static files
    │   └── main.jsx        # Frontend entry point

```
## 🛠️ Setup Instructions
    
    1. Prerequisites
    Node.js installed
    MongoDB Atlas account (or local MongoDB)

    2. Backend Setup
    Navigate to the backend folder:

    cd backend

    
    3. Install dependencies:
    
    npm install

    
    4. Create a .env file in the backend/ directory and add:
    
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    FRONTEND_URL=http://localhost:5173


    5. Start the server:

    npm start

``


```

    Frontend Setup
    
    1. Navigate to the frontend folder:
     
     cd frontend
    
    2. Install dependencies:
    
     npm install
      
    3. Create a .env file in the frontend/ directory:
    
    VITE_API_URL=http://localhost:5000

    4. Run the development server:

    npm run dev

````

## 🤝 Contributing
### Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.
    



