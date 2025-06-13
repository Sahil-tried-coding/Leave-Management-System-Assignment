#  Leave Management System – Express.js + MySQL

This is a backend API built with **Express.js** and **MySQL** for managing employee leave requests. It supports role-based access (Employee, HR/Admin), leave approval and rejection, and validation rules.

---

## ✅ Features

* Apply for leave (`POST /api/leaves`)
* Get leave requests filtered by role and status (`GET /api/leaves?status=pending`)
* Approve or Reject leave requests (`PATCH /api/leaves/:id`)
* Role-based access control using middleware
* Fully integrated with MySQL database

---

## 📁 Project Structure

```
Leave-Management-System-Assignment/
├── .env
├── server.js
├── README.md
├── package.json
├── src/
│   ├── app.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── leave.control.js
│   ├── models/
│   │   └── leave.model.js
│   ├── routes/
│   │   └── leave.routes.js
│   └── middleware/
│       └── auth.js
```

---

## ⚙️ Setup Instructions

1. Clone the repo  
2. Run the following to install dependencies:

```bash
npm install express mysql2 dotenv nodemon

```

### 2. Create a `.env` file in the root directory:

```env
PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=leave_management_system
```

### 3. Set up MySQL Database

```sql
  create database leave_management_system;

   use leave_management_system;

   create table Leaves(
   id int auto_increment primary key ,
   employee_id int not null,
   role_id int not null ,
   leave_type enum("Annual","Sick","Casual","Maternity","Paternity") not null,
   start_date date not null,
   end_date date not null,
   reason varchar(2000) not null,
   status enum ("pending","approved","rejected") default "pending" not null,
   comment varchar(250),
   document_url varchar(255),
   created_by int not null,
   updated_by int ,
   created_at timestamp default current_timestamp not null,
   updated_at timestamp default current_timestamp not null on update current_timestamp
   );
```

### 4. Start the server

```bash
node server.js
```

---

## 🔐 Simulated Auth Middleware

Located in `src/middleware/auth.js`. It simulates a logged-in user:

```js
req.employee = {
  id: 1,
  name: "Sahil",
  role_id: 1 // 1 = employee, 2 = HR/Admin
};
```

Change `role_id` to `2` to simulate admin access.

---

## 🚀 API Endpoints

### 📌 Apply Leave

`POST /api/leaves`

```json
{
  "leave_type": "Annual",
  "start_date": "2025-06-20",
  "end_date": "2025-06-25",
  "reason": "Family trip",
  "role_id": 1
}
```

---

### 📌 Get Leave Requests by Status

`GET /api/leaves?status=pending`

* Employees see only their own leaves
* HR/Admin sees all matching leaves

---

### 📌 Approve or Reject Leave

`PATCH /api/leaves/:id`

✅ Approve:

```json
{
  "status": "approved",
  "approvedBy": 2
}
```

❌ Reject:

```json
{
  "status": "rejected",
  "comment": "Project deadline is near",
  "approvedBy": 2
}
```

---

## ✅ Validations

* All fields are required when applying
* `start_date` must be before `end_date`
* `role_id` must match the logged-in user
* Only pending leaves can be approved or rejected
* Rejected leaves must include a comment

---





---

## 📐 Design Questions

### 1. How would you design this system if it were to go live in production?

> I would  normalize the database by keeping roles, users, and leave data in separate tables with proper relationships. Backend validation would be handled using a library like express-validator, and error handling would be centralized so it’s easy to debug issues.
> Security-wise, I’d make sure inputs are sanitized and passwords (if added) are hashed. For deployment

### 2. What features would you add to improve it?

> To improve the system, I would first add a leave quota system, so employees can’t apply beyond their allowed limit. Right now, any number of leaves can be requested.
> I’d also implement file uploads (e.g., for medical certificates) and notifications via email when a leave is applied or approved/rejected. Another improvement would be a leave history log , so every action taken on a leave is recorded.








## 👨‍💼 Author

**Sahil Dadabhai Shaikh**


---

## 📦 Submission Notes

* Backend API fully implemented as per the assignment
* All endpoints tested using Postman
* `.env` file excluded from submission for security
