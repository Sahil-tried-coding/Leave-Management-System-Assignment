- Leave Management System – Express.js + MySQL

This is a backend API built with Express.js and MySQL for managing employee leave requests. It supports role-based access (Employee, HR/Admin), leave approval and rejection, and validations.

- Features

  Apply for leave (POST)

  Get all leave requests filtered by status and role (GET)

  Approve/Reject leaves by ID (PATCH)

  Role-based access control using middleware

  Fully connected to MySQL database

📁 Project Structure

Leave-Management-System-Assignment/
├── .env
├── server.js
├── README.md
├── package.json
├──  src/
│ ├── app.js
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ └── leave.control.js
│ ├── models/
│ │ └── leave.model.js
│ ├── routes/
│ │ └── leave.routes.js
│ └── middleware/
│ └── auth.js

- Setup Instructions

    1. Clone the project and install dependencies

        npm install

    2. Configure environment variables

        Create a .env file in the root folder:

        PORT=3000
        DB_HOST=localhost
        DB_USER=mysql_username
        DB_PASSWORD=mysql_password
        DB_NAME=leave_management_system

3. Create the MySQL database

    create database leave_management_system;

    use leave_management_system;

    create table Leaves(
    id int auto_increment primary key ,
    employee_id  int not null,
    role_id int not null ,
    leave_type enum("Annual","Sick","Casual","Maternity","Paternity") not null,
    start_date date not null,
    end_date date not null,
    reason varchar(2000) not null,
    status  enum ("pending","approved","rejected") default "pending" not null,
    comment varchar(250),
    document_url varchar(255),
    created_by int not null,
    updated_by int ,
    created_at timestamp default current_timestamp not null,
    updated_at timestamp default current_timestamp not null on update current_timestamp
    );

4. Start the server

    node server.js

- Simulated Auth Middleware

Located in src/middleware/auth.js. It injects a dummy user into every request:

req.employee = {
id: 1,
name: "Sahil",
role_id: 1 // 1 = employee, 2 = HR/Admin
};

Change role_id to 2 to simulate Admin/HR actions.

🚀 API Endpoints

📌 Apply Leave

  POST /api/leaves
    
  {
        "leave_type": "Annual",
        "start_date": "2025-06-20",
        "end_date": "2025-06-25",
        "reason": "Family trip",
        "role_id": 1
  }

📌 Get Leave Requests by Status

  GET /api/leaves?status=pending

  Employees see only their leaves

  HR/Admin sees all leaves

📌 Approve/Reject Leave

  PATCH /api/leaves/:id

  {
    "status": "approved",
    "approvedBy": 2
  }

  {
    "status": "rejected",
    "comment": "project deadline is near",
    "approvedBy": 2
  }

✅ Validations

  All fields are required when applying

  start_date must be before end_date

  role_id must match the logged-in user

  Only pending leaves can be approved/rejected

  Rejected leaves require a comment

- Author

  Sahil Dadabhai Shaikh  

📦 Submission Notes

  Backend API fully implemented as per assignment

  All routes tested and working via Postman

  .env file excluded for security (send credentials separately if needed)
