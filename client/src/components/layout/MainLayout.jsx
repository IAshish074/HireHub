import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100">

      {/* 🔹 Navbar */}
      <Navbar onToggleSidebar={() => setIsSidebarOpen(true)} />

      {/* 🔹 Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* 🔹 Overlay (FIXED z-index) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 🔹 Main Content */}
      <main className="pt-14 sm:pt-16 lg:pl-64 transition-all duration-300">

        <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>

      </main>
    </div>
  );
};

export default MainLayout;