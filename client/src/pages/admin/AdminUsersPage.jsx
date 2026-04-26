import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Trash2, Mail, Calendar, Shield } from "lucide-react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import AdminSidebar from "../../components/admin/AdminSidebar";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { useAuth } from "../../context/AuthContext";

const AdminUsersPage = () => {
  const { token } = useAuth();

  const [users, setUsers] = useState([]);
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

  // 🔹 Fetch users
  useEffect(() => {
    if (!token) {
      setError("Unauthorized access.");
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to fetch users.");
        }

        if (isMounted) {
          setUsers(data.users || []);
        }

      } catch (err) {
        if (!isMounted) return;

        const message = err.message || "Error loading users";
        setError(message);
        toastr.error(message);

      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, [token]);

  // 🔹 Delete User
  const handleDelete = async (id, role) => {
    if (role === 'admin') {
      toastr.error("Cannot delete admin users");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this user? This will also delete all their applications.");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete user.");
      }

      setUsers((prev) => prev.filter((user) => user._id !== id));
      toastr.success("User deleted successfully");

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

      {/* 🔹 Main Content */}
      <div className="flex-1 w-full lg:pl-64 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mt-14 lg:mt-0">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-semibold text-white">
            User Management
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-1">
            View and manage platform users.
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
                Fetching users...
              </p>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center">
              <Users className="w-12 h-12 text-slate-700 mb-4" />
              <p className="text-gray-400">
                No users found.
              </p>
            </div>
          ) : (
            <>
              {/* ================= DESKTOP TABLE ================= */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-gray-400 bg-slate-800/50">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Joined Date</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className="border-b border-slate-800 hover:bg-slate-800/20 transition-colors"
                      >
                        <td className="px-4 py-4 text-white font-medium">
                          {user.name || "Unknown"}
                        </td>

                        <td className="px-4 py-4 text-gray-400">
                          {user.email || "Unknown"}
                        </td>

                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                            user.role === 'admin' 
                              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}>
                            {user.role === 'admin' && <Shield className="w-3 h-3 mr-1" />}
                            {user.role}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>

                        <td className="px-4 py-4">
                           <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => handleDelete(user._id, user.role)}
                                disabled={user.role === 'admin'}
                                className="
                                flex items-center gap-1.5 
                                text-red-400 hover:text-red-300
                                text-xs sm:text-sm font-medium
                                transition px-2 py-1 rounded-md hover:bg-red-500/10
                                disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent
                                "
                                title={user.role === 'admin' ? "Cannot delete admin users" : "Delete user"}
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ================= MOBILE CARDS ================= */}
              <div className="md:hidden space-y-4">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3"
                  >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-white font-medium">
                            {user.name || "Unknown"}
                            </p>
                            <p className="text-sm text-gray-400 flex items-center mt-1">
                            <Mail className="w-3.5 h-3.5 mr-1.5" />
                            {user.email}
                            </p>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                            user.role === 'admin' 
                              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}>
                            {user.role}
                        </span>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-800/50">
                        <p className="text-xs text-gray-500 flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                        {new Date(user.createdAt).toLocaleDateString()}
                        </p>

                        <button
                            type="button"
                            onClick={() => handleDelete(user._id, user.role)}
                            disabled={user.role === 'admin'}
                            className="
                            flex items-center gap-1 text-red-400 
                            text-sm px-3 py-1.5 rounded-md 
                            hover:bg-red-500/10 disabled:opacity-30
                            "
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </button>
                    </div>
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

export default AdminUsersPage;
