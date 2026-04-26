import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Briefcase,
  Users,
  LayoutDashboard,
  Settings,
  FileText,
  ChevronLeft,
  Menu
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  // 🔹 Internal state for standalone usage
  const [internalOpen, setInternalOpen] = useState(false);

  // 🔹 Decide which state to use
  const open = isOpen !== undefined ? isOpen : internalOpen;

  const openSidebar = () => {
    if (onClose) return;
    setInternalOpen(true);
  };

  const closeSidebar = () => {
    if (onClose) onClose();
    else setInternalOpen(false);
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'My Applications', path: '/my-applications', icon: FileText },
    { name: 'Find Jobs', path: '/jobs', icon: Briefcase },
    { name: 'Applications', path: '/applications', icon: FileText },
    { name: 'Network', path: '/network', icon: Users },
  ];

  const bottomItems = [
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const LinkItem = ({ item }) => (
    <NavLink
      to={item.path}
      onClick={closeSidebar}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
          isActive
            ? 'bg-indigo-500/10 text-indigo-400'
            : 'text-gray-400 hover:bg-slate-800 hover:text-white'
        }`
      }
    >
      <item.icon className="w-5 h-5 shrink-0" />
      <span className="truncate text-sm">{item.name}</span>
    </NavLink>
  );

  return (
    <>
      {/* 🔹 MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 flex items-center px-4 bg-slate-950 border-b border-slate-800 z-50">
        <button
          onClick={openSidebar}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800 transition"
        >
          <Menu className="w-6 h-6" />
        </button>

        <span className="ml-3 text-white font-semibold">
          Menu
        </span>
      </div>

      {/* 🔹 Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* 🔹 Sidebar */}
      <aside
        className={`
          fixed top-14 left-0 bottom-0 
          w-64 sm:w-72 lg:w-64
          bg-slate-950/95 backdrop-blur-xl 
          border-r border-slate-800
          flex flex-col z-50
          transform transition-transform duration-300

          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* 🔹 Mobile Header */}
        <div className="flex items-center justify-between px-4 py-3 lg:hidden border-b border-slate-800">
          <span className="text-white font-semibold">Menu</span>
          <button
            onClick={closeSidebar}
            className="p-2 rounded-lg hover:bg-slate-800 text-gray-400 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* 🔹 Main Nav */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Menu
            </p>

            {navItems.map((item) => (
              <LinkItem key={item.path} item={item} />
            ))}
          </div>
        </div>

        {/* 🔹 Bottom */}
        <div className="px-3 py-4 border-t border-slate-800 space-y-1">
          {bottomItems.map((item) => (
            <LinkItem key={item.path} item={item} />
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;