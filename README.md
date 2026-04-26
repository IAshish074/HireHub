# HireHuB 🚀

A modern, full-stack job portal built with the **MERN stack** (MongoDB, Express, React, Node.js) and styled with Tailwind CSS and Framer Motion. 

HireHuB bridges the gap between administrators and job seekers, providing a seamless experience for both job management and application tracking.

---

## 🌐 Live Deployment

- **Frontend:** [https://hire-hub-iota-ashen.vercel.app/](https://hire-hub-iota-ashen.vercel.app/) (Deployed on **Vercel**)
- **Backend:** [https://hirehub-6usv.onrender.com/](https://hirehub-6usv.onrender.com/) (Deployed on **Render**)

---

## ✨ Features

### 👤 For Job Seekers (Users)
- **Dynamic Job Feed:** Browse through the latest job postings with robust search and filtering.
- **Job Details:** View comprehensive information about roles, including salary, location, and company details.
- **Easy Applications:** Apply to jobs with a single click and receive instant feedback.
- **My Applications:** A personal dashboard to track all your applications and securely **withdraw/cancel** them if needed.
- **Premium UI:** Smooth micro-animations and a sleek dark-mode aesthetic for a modern browsing experience.

### 🔐 For Administrators
- **Admin Dashboard:** A high-level overview of platform stats including total jobs, users, and applications.
- **Job Management:** Full CRUD (Create, Read, Update, Delete) capabilities for job listings.
- **Inline Confirmation:** Safe deletion process with inline "Are you sure?" prompts to prevent accidental removal.
- **Applicant Oversight:** View a global list of all candidates or filter applicants for a specific job listing directly from the job table.
- **Role-Based Security:** Admins have exclusive access to management tools, protected by JWT middleware.

> [!IMPORTANT]
> **Admin Security Policy:** For security reasons, the "Admin" role cannot be selected during public registration. Administrators must be manually promoted or added directly to the database to ensure platform integrity.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, Framer Motion, Lucide React, React Router v7.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (via Mongoose).
- **Security:** JWT (JSON Web Tokens), bcryptjs, and custom Auth/Admin Middleware.

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed.
- A MongoDB instance (local or Atlas).

### Local Setup

1. **Clone & Install:**
   ```bash
   git clone https://github.com/IAshish074/HireHub.git
   cd HireHub
   ```

2. **Backend Configuration:**
   - Go to `server/` and create a `.env` file:
     ```env
     PORT=5001
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```
   - Run `npm install` and `npm run dev`.

3. **Frontend Configuration:**
   - Go to `client/` and run `npm install`.
   - Start the dev server with `npm run dev`.

---

## 🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## 📜 License
MIT License
