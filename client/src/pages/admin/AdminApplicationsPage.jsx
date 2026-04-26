import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Menu } from "lucide-react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import AdminSidebar from "../../components/admin/AdminSidebar";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { useAuth } from "../../context/AuthContext";

const AdminApplicationsPage = () => {
  const { token } = useAuth();

  const [applications, setApplications] = useState([]);
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
    if (!token) {
      setError("Unauthorized access.");
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const fetchApplications = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams(window.location.search);
        const jobId = queryParams.get('jobId');
        
        let url = "/api/applications/all";
        if (jobId) {
          url = `/api/applications/job/${jobId}`;
        }

        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to fetch applications.");
        }

        if (isMounted) {
          setApplications(data.applications || []);
        }

      } catch (err) {
        if (!isMounted) return;

        const message = err.message || "Error loading applications";
        setError(message);
        toastr.error(message);

      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchApplications();

    return () => {
      isMounted = false;
    };
  }, [token]);

  return (
    <div className="min-h-screen flex bg-slate-950 text-gray-100">

      {/* 🔹 Sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* 🔹 Main */}
      <div className="flex-1 w-full lg:pl-64 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* 🔹 Header with Mobile Menu */}
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
              Global Applications
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Review candidates across all job listings.
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

        {/* 🔹 Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="
            bg-slate-900/80 backdrop-blur-xl 
            border border-slate-800 
            rounded-xl sm:rounded-2xl 
            p-4 sm:p-6
          "
        >
          {/* 🔹 Loading */}
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin h-8 w-8 border-b-2 border-indigo-500 mr-3"></div>
              <p className="text-indigo-400 text-sm sm:text-base">
                Fetching applications...
              </p>
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center">
              <FileText className="w-12 h-12 text-slate-700 mb-4" />
              <p className="text-gray-400">
                No applications found.
              </p>
            </div>
          ) : (
            <>
              {/* 🔹 Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-gray-400 bg-slate-800/50">
                    <tr>
                      <th className="px-4 py-3">Applicant</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Job</th>
                      <th className="px-4 py-3">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {applications.map((app) => (
                      <tr
                        key={app._id}
                        className="border-b border-slate-800 hover:bg-slate-800/20"
                      >
                        <td className="px-4 py-4 text-white">
                          {app.user?.name || "Unknown"}
                        </td>
                        <td className="px-4 py-4 text-gray-400">
                          {app.user?.email || "Unknown"}
                        </td>
                        <td className="px-4 py-4 text-indigo-300">
                          {app.job?.title || "Deleted Job"}
                        </td>
                        <td className="px-4 py-4 text-gray-400">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 🔹 Mobile Cards */}
              <div className="md:hidden space-y-4">
                {applications.map((app) => (
                  <div
                    key={app._id}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2"
                  >
                    <p className="text-white font-medium">
                      {app.user?.name || "Unknown"}
                    </p>

                    <p className="text-sm text-gray-400">
                      {app.user?.email}
                    </p>

                    <p className="text-indigo-300 text-sm">
                      {app.job?.title || "Deleted Job"}
                    </p>

                    <p className="text-xs text-gray-500">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminApplicationsPage;