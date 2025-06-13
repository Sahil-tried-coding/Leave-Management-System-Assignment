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

### 1. Install dependencies

```bash
npm install
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
CREATE DATABASE leave_management_system;

USE leave_management_system;

CREATE TABLE Leaves (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  role_id INT NOT NULL,
  leave_type ENUM("Annual","Sick","Casual","Maternity","Paternity") NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason VARCHAR(2000) NOT NULL,
  status ENUM("pending","approved","rejected") DEFAULT "pending" NOT NULL,
  comment VARCHAR(250),
  document_url VARCHAR(255),
  created_by INT NOT NULL,
  updated_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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

## 👨‍💼 Author

**Sahil Dadabhai Shaikh**


---

## 📦 Submission Notes

* Backend API fully implemented as per the assignment
* All endpoints tested using Postman
* `.env` file excluded from submission for security
