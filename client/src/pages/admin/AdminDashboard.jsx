import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, FileText, Users, Menu } from "lucide-react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import AdminSidebar from "../../components/admin/AdminSidebar";
import JobTable from "../../components/admin/JobTable";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { token } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalUsers: 0,
    totalApplications: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 🔹 Toastr setup
  useEffect(() => {
    toastr.options = {
      positionClass: "toast-bottom-right",
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
    };
  }, []);

  // 🔹 Fetch data
  useEffect(() => {
    const loadJobs = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [jobsRes, statsRes] = await Promise.all([
          fetch("/api/jobs"),
          fetch("/api/admin/stats", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!jobsRes.ok || !statsRes.ok) {
          throw new Error("Failed to fetch dashboard data.");
        }

        const data = await jobsRes.json();
        const statsData = await statsRes.json();

        const jobsList = data.jobs || data;

        setJobs(Array.isArray(jobsList) ? jobsList : []);
        setStats(statsData);

      } catch (err) {
        setError(err.message);
        toastr.error("Failed to load dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    if (token) loadJobs();
  }, [token]);

  // 🔹 DELETE HANDLER (SAFE)
  const handleDelete = async (id) => {
    console.log("DELETE TRIGGERED:", id); // 🔍 debug

    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to delete job.");
      }

      // ✅ Safe removal (handles _id and id both)
      setJobs((prev) =>
        prev.filter((job) => (job._id || job.id) !== id)
      );

      toastr.success("Job deleted successfully");

    } catch (err) {
      toastr.error(err.message);
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

        {/* 🔹 Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6 sm:mb-8"
        >
          {/* ☰ Mobile Menu */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800 transition"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Manage job listings and platform data.
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

        {/* 🔹 Stats */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {[
              { label: "Total Jobs", value: stats.totalJobs, icon: Briefcase, color: "indigo" },
              { label: "Total Users", value: stats.totalUsers, icon: Users, color: "emerald" },
              { label: "Total Applications", value: stats.totalApplications, icon: FileText, color: "fuchsia" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 flex items-center justify-between"
              >
                <div>
                  <p className="text-gray-400 text-sm mb-1">{item.label}</p>
                  <h3 className="text-3xl font-bold text-white">{item.value}</h3>
                </div>
                <div className={`p-3 bg-${item.color}-500/20 text-${item.color}-400 rounded-lg`}>
                  <item.icon className="w-6 h-6" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* 🔹 Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/80 border border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6"
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin h-8 w-8 border-b-2 border-indigo-500 mr-3"></div>
              <p className="text-indigo-400">Loading jobs...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 mb-4">No jobs available</p>
              <a href="/admin/create-job" className="text-indigo-400 hover:underline">
                + Create your first job
              </a>
            </div>
          ) : (
            <JobTable jobs={jobs} onDelete={handleDelete} />
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default AdminDashboard;