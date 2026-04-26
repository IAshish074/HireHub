require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { connectDB } = require("./config/db")
const app = express()
const cookieParser = require("cookie-parser")
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

// Detailed CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://hire-hub-iota-ashen.vercel.app",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow if no origin (like mobile apps or curl) or if in allowedOrigins
    // Also allow any subdomains of vercel.app
    if (!origin || allowedOrigins.includes(origin) || origin.includes('vercel.app')) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

// Routes
const authRoutes = require("./routers/authRoutes")
const jobRoutes = require("./routers/jobRoutes")
const applicationRoutes = require("./routers/applicationRoutes")
const adminRoutes = require("./routers/adminRoutes");

app.use("/api/auth", authRoutes)
app.use("/api/jobs", jobRoutes)
app.use("/api/applications", applicationRoutes)
app.use("/api/admin", adminRoutes);

connectDB(MONGO_URI)

// 🔹 Global Error Handling Middleware (User Story 15)
app.use((err, req, res, next) => {
  console.error('Global Error Hook Captured:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'An unexpected server error occurred',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})