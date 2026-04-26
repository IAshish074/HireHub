# HireHuB 🚀

A modern, full-stack job portal built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS and Framer Motion. 

HireHuB bridges the gap between administrators and job seekers. Admins can effortlessly create and manage job postings while tracking applicants, and users can browse jobs, apply securely, and manage their applications from a centralized dashboard.

---

## ✨ Features

### For Job Seekers
- **Dynamic Job Feed:** Browse through the latest job postings with robust search and filtering.
- **Job Applications:** Securely apply to jobs with a single click.
- **Application Management:** View the status of your applications and withdraw them seamlessly if you change your mind.
- **Premium UI:** Enjoy smooth micro-animations and a sleek dark-mode aesthetic.

### For Administrators
- **Job Management:** Full CRUD (Create, Read, Update, Delete) capabilities for job listings via a dedicated admin dashboard.
- **Applicant Tracking:** View an aggregate list of all applicants, or filter down to see who applied for a specific job role.
- **Role-Based Access Control:** Strict JWT middleware ensures that admin routes and API endpoints remain fully protected.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Notifications:** Toastr
- **Routing:** React Router v7

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB via Mongoose
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **CORS:** Secure origin configurations mapping to the Vite dev server

---

## 🚀 Getting Started

Follow these steps to get a local development environment running.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed along with a running instance of MongoDB (locally or via MongoDB Atlas).

### 1. Clone the repository
```bash
git clone https://github.com/your-username/HireHuB.git
cd HireHuB
```

### 2. Setup the Backend
Open a terminal and navigate to the `server` directory:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and configure the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

Start the backend server:
```bash
npm start
```
*(The backend should now be running on `http://localhost:5000`)*

### 3. Setup the Frontend
Open a new terminal window and navigate to the `client` directory:
```bash
cd client
npm install
```

Since the frontend utilizes Vite proxying (configured in `vite.config.js`), you do not need to hardcode the backend URL. Simply start the dev server:
```bash
npm run dev
```
*(The frontend should now be running on `http://localhost:5173`)*

---

## 📂 Project Structure

```text
HireHuB/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI elements (Admin, Jobs, Layouts)
│   │   ├── context/        # React Context (AuthContext)
│   │   ├── pages/          # Main route components
│   │   ├── App.jsx         # App routing setup
│   │   └── main.jsx        # React entry point
│   └── vite.config.js      # Vite proxy settings
│
└── server/                 # Node.js + Express Backend
    ├── config/             # DB connection logic
    ├── controllers/        # Route logic (Auth, Admin, Jobs, Applications)
    ├── middleware/         # Auth & Admin route protections
    ├── models/             # Mongoose schemas (User, Job, Application)
    ├── routers/            # Express router definitions
    └── app.js              # Server entry point
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/HireHuB/issues).

---

## 📜 License

This project is licensed under the MIT License.
