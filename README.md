User Management System
This project is a full-stack user management system built using React for the frontend and Express.js/Node.js with MySQL for the backend. It allows you to view, add, edit, and delete users stored in a MySQL database.

Features
User List: Display all users retrieved from a MySQL database.
Add User: Use a form to add a new user to the database.
Routing: Navigate between pages using React Router DOM v6.
REST API: Backend built with Express.js to handle API requests.
CORS Enabled: Allows the frontend and backend to communicate seamlessly.
Technologies Used
Frontend: React.js, react-router-dom v6, CSS
Backend: Node.js, Express.js, mysql2, CORS
Database: MySQL
Prerequisites
Node.js (v12+)
npm (v6+)
MySQL Server
Getting Started
USE user_management;

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  First_Name VARCHAR(50),
  Last_Name VARCHAR(50),
  Email VARCHAR(100),
  Department VARCHAR(20)
);

-- Optional: Insert a sample user
INSERT INTO user (First_Name, Last_Name, Email, Department)
VALUES ('mohit', 'chohan', 'mohitchohan101@gmail.com', 'Electrical');

SELECT * FROM user;
Set Up the Backend
Navigate to the backend folder (if your backend code is in a separate folder):

bash
Copy
Edit
cd backend
npm install
Ensure your database connection credentials in app.js are correct. Then run the server:

bash
Copy
Edit
node server.js
The server should run on http://localhost:2000.

4. Set Up the Frontend
Navigate to the frontend folder:

bash
Copy
Edit
cd frontend
npm install
npm start
The React application will run on http://localhost:3000.

5. How It Works
Home Page:
On visiting http://localhost:3000, you'll see a list of users retrieved from the MySQL database.

Add User:
Click the ADD button to navigate to the "Add New User" page. Fill out the form and click Submit. This sends a POST request to the backend endpoint, adds the user to the database, and then navigates back to the Home page to display the updated list.

Project Structure
pgsql
Copy
Edit
user_management/
├── backend/
│   ├── server.js           // Express backend code
│   └── package.json     // Backend dependencies & scripts
├── frontend/
│   ├── package.json     // Frontend dependencies & scripts
│   └── src/
│       ├── components/
│       │   ├── Home/
│       │   │   ├── index.jsx      // Home component with user list
│       │   │   └── index.css      // Home component styles
│       │   ├── AddUser/
│       │   │   ├── index.jsx      // AddUser component with form
│       │   │   └── index.css      // AddUser component styles
│       │   └── EditUser/
│       │       ├── index.jsx      // EditUser component with form
│       │       └── index.css      // EditUser component styles
│       ├── App.jsx                // Main app component with routes
│       └── index.css              // Global CSS styles
└── README.md                    // Project documentation

Troubleshooting
MySQL Connection:
Verify your MySQL server is running and that the connection credentials in app.js are correct.

Backend Server:
Ensure the Express server is running on port 2000.

Frontend Routing:
Confirm you are using react-router-dom v6. The useNavigate hook is available only in v6 and later.

Acknowledgments
React
Express
MySQL
