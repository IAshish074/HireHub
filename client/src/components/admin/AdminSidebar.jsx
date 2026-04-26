import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Users,
  LogOut,
  X,
  Menu
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = ({ isOpen: externalOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();


  const [internalOpen, setInternalOpen] = useState(false);

  const isOpen = externalOpen ?? internalOpen;
  const setIsOpen = onClose
    ? (val) => (val ? null : onClose())
    : setInternalOpen;

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Manage Jobs", path: "/admin/create-job", icon: Briefcase },
    { name: "Applications", path: "/admin/applications", icon: FileText },
    { name: "Users", path: "/admin/users", icon: Users }
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <>
      
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 flex items-center px-4 bg-slate-950 border-b border-slate-800 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800 transition"
        >
          <Menu className="w-6 h-6" />
        </button>

        <span className="ml-3 text-white font-semibold">
          Admin Panel
        </span>
      </div>

      {/* 🔹 Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 🔹 Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen
          w-64 sm:w-72 lg:w-64
          bg-slate-950/95 backdrop-blur-xl
          border-r border-slate-800
          z-50 flex flex-col
          transform transition-transform duration-300 ease-in-out

          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* 🔹 Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
          <h2 className="text-lg font-semibold text-white">
            Admin Panel
          </h2>

          {/* Close */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 🔹 Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "text-gray-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}

          {/* 🔹 Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition mt-6"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </nav>

        {/* 🔹 Footer */}
        <div className="px-4 py-4 border-t border-slate-800 text-xs text-gray-500">
          © 2026 Admin
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;