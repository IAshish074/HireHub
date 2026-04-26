import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Menu } from "lucide-react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import AdminSidebar from "../../components/admin/AdminSidebar";
import JobForm from "../../components/admin/JobForm";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { useAuth } from "../../context/AuthContext";

const EditJobPage = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Sidebar state (FIX)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 🔹 Fetch job
  useEffect(() => {
    const fetchJob = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/jobs/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch job details.");
        }

        const data = await response.json();
        const jobData = data.job || data;

        setInitialValues({
          title: jobData.title || "",
          company: jobData.company || "",
          location: jobData.location || "",
          description: jobData.description || "",
        });

      } catch (err) {
        setError(err.message);
        toastr.error("Error fetching job details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // 🔹 Submit
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update job.");
      }

      toastr.success("Job updated successfully!");
      navigate("/admin");

    } catch (err) {
      setError(err.message);
      toastr.error(err.message);
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

      {/* 🔹 Main Content */}
      <div className="flex-1 w-full lg:pl-64 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* 🔹 Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6 sm:mb-8"
        >
          {/* ☰ Menu Button (Mobile Only) */}
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
              Edit Job
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Update job listing details.
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

        {/* 🔹 Form Card */}
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
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <span className="text-gray-400">
                Loading job details...
              </span>
            </div>
          ) : (
            <JobForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default EditJobPage;