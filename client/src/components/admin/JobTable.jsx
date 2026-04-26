import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const JobTable = ({ jobs, onDelete }) => {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        No jobs available
      </div>
    );
  }

  // 🔹 SAFE DELETE HANDLER
  const handleDeleteClick = (e, id) => {
    e.preventDefault();        // ✅ stop form submit
    e.stopPropagation();       // ✅ stop bubbling

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    if (typeof onDelete === "function") {
      onDelete(id); // ✅ ONLY AFTER CONFIRM
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[500px] text-sm text-left">

        {/* 🔹 Header */}
        <thead>
          <tr className="bg-slate-800/60 text-gray-300 border-b border-slate-700">
            <th className="p-3 sm:p-4 font-medium">Title</th>
            <th className="p-3 sm:p-4 font-medium">Company</th>
            <th className="p-3 sm:p-4 font-medium text-right">Actions</th>
          </tr>
        </thead>

        {/* 🔹 Body */}
        <tbody>
          {jobs.map((job) => {
            const jobId = job._id || job.id;

            return (
              <tr
                key={jobId}
                className="border-b border-slate-800 hover:bg-slate-800/40 transition"
              >
                <td className="p-3 sm:p-4 text-gray-200">
                  {job.title}
                </td>

                <td className="p-3 sm:p-4 text-gray-400">
                  {job.company}
                </td>

                <td className="p-3 sm:p-4">
                  <div className="flex items-center justify-end gap-3 sm:gap-4">

                    {/* 🔹 View Applicants */}
                    <Link
                      to={`/admin/applications?jobId=${jobId}`}
                      className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 text-xs sm:text-sm font-medium transition px-2 py-1 rounded-md hover:bg-emerald-500/10"
                      title="View Applicants"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      Applicants
                    </Link>

                    {/* 🔹 Edit */}
                    <Link
                      to={`/admin/edit-job/${jobId}`}
                      className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 text-xs sm:text-sm font-medium transition px-2 py-1 rounded-md hover:bg-indigo-500/10"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>

                    {/* 🔹 DELETE (FULLY FIXED) */}
                    <button
                      type="button" // ✅ prevents form submit
                      onClick={(e) => handleDeleteClick(e, jobId)} // ✅ wrapper
                      className="flex items-center gap-1.5 text-red-400 hover:text-red-300 text-xs sm:text-sm font-medium transition px-2 py-1 rounded-md hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>

                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>

      </table>
    </div>
  );
};

export default JobTable;