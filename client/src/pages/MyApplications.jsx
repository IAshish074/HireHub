import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Building, Calendar, XCircle, FileText } from "lucide-react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import { useAuth } from "../context/AuthContext";
import ErrorMessage from "../components/ui/ErrorMessage";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

const MyApplications = () => {
  const { token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCancelling, setIsCancelling] = useState(null);

  useEffect(() => {
    toastr.options = {
      positionClass: "toast-bottom-right",
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchApplications = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/applications/my", {
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
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    if (token) fetchApplications();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const [confirmCancelId, setConfirmCancelId] = useState(null);

  const handleCancelApplication = async (id) => {
    setIsCancelling(id);

    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to withdraw application.");
      }

      setApplications((prev) => prev.filter((app) => (app._id || app.id) !== id));
      toastr.success("Application withdrawn successfully");
    } catch (err) {
      toastr.error(err.message);
    } finally {
      setIsCancelling(null);
      setConfirmCancelId(null);
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      
      {/* 🔹 Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
          My Applications
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl">
          Track and manage your active job applications.
        </p>
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

      {/* 🔹 Applications List */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500 mb-4"></div>
            <p className="text-indigo-400">Loading your applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No active applications</h3>
            <p className="text-gray-400 max-w-md mb-6">
              You haven't applied to any jobs yet. Start exploring opportunities to find your next role.
            </p>
            <Link to="/">
              <Button>Browse Jobs</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {applications.map((app) => (
              <div 
                key={app._id} 
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition flex flex-col h-full"
              >
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-white line-clamp-1 flex-1 pr-4">
                      {app.job?.title || "Deleted Job"}
                    </h3>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 whitespace-nowrap">
                      Applied
                    </span>
                  </div>

                  {app.job && (
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-400">
                        <Building className="w-4 h-4 mr-2 text-gray-500" />
                        {app.job.company}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                        {app.job.location}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center text-xs text-gray-500 pt-4 border-t border-slate-800/50 mt-auto">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    Applied on {new Date(app.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/50 flex justify-between items-center">
                  {app.job ? (
                     <Link to={`/jobs/${app.job._id}`} className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition">
                      View Job Details
                     </Link>
                  ) : (
                     <span className="text-sm text-slate-500">Job no longer exists</span>
                  )}
                  
                  <div className="flex items-center gap-2">
                    {confirmCancelId === (app._id || app.id) ? (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-xs text-red-400 font-medium">Are you sure?</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleCancelApplication(app._id || app.id);
                          }}
                          disabled={isCancelling === (app._id || app.id)}
                          className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-2 py-1 rounded text-xs font-bold transition disabled:opacity-50"
                        >
                          {isCancelling === (app._id || app.id) ? "..." : "Yes"}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setConfirmCancelId(null);
                          }}
                          disabled={isCancelling === (app._id || app.id)}
                          className="bg-slate-700 text-gray-300 hover:bg-slate-600 px-2 py-1 rounded text-xs font-bold transition disabled:opacity-50"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setConfirmCancelId(app._id || app.id);
                        }}
                        className="flex items-center gap-1.5 text-red-400 hover:text-red-300 text-sm font-medium transition px-3 py-1.5 rounded-lg hover:bg-red-500/10"
                      >
                        <XCircle className="w-4 h-4" />
                        Withdraw
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MyApplications;
