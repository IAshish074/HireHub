import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import AdminSidebar from "../../components/admin/AdminSidebar";
import JobForm from "../../components/admin/JobForm";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { useAuth } from "../../context/AuthContext";

const CreateJobPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 🔹 Configure toastr
  useEffect(() => {
    toastr.options = {
      positionClass: "toast-bottom-right",
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
    };
  }, []);

  // 🔹 Submit
  const handleSubmit = async (formData) => {
    if (!token) {
      setError("You must be logged in to create a job.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to create job.");
      }

      toastr.success("Job created successfully!");

      setTimeout(() => {
        navigate("/admin");
      }, 800);

    } catch (err) {
      const message = err.message || "Something went wrong.";
      setError(message);
      toastr.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-gray-100">

      {/* 🔹 Sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* 🔹 Main */}
      <div className="flex-1 w-full lg:pl-64 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* 🔹 Header with Menu Button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6 sm:mb-8"
        >
          {/* ☰ Mobile Menu */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="
              lg:hidden p-2 rounded-lg 
              text-gray-400 hover:text-white 
              hover:bg-slate-800 transition
            "
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-white">
              Create Job
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Add a new job listing to your platform.
            </p>
          </div>
        </motion.div>

        {/* 🔹 Error */}
        {error && (
          <div className="mb-6">
            <ErrorMessage
              message={error}
              type="error"
              onClose={() => setError(null)}
            />
          </div>
        )}

        {/* 🔹 Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="
            max-w-3xl
            bg-slate-900/80 backdrop-blur-xl
            border border-slate-800
            rounded-xl sm:rounded-2xl
            p-4 sm:p-6 lg:p-8
          "
        >
          <JobForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </motion.div>

      </div>
    </div>
  );
};

export default CreateJobPage;