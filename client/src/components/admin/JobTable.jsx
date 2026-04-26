import React, { useState } from "react";
import { Edit, Trash2, Check, X } from "lucide-react";
import { Link } from "react-router-dom";

const JobTable = ({ jobs, onDelete }) => {
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        No jobs available
      </div>
    );
  }

  const handleDeleteConfirm = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof onDelete === "function") {
      onDelete(id);
    }
    setConfirmDeleteId(null);
  };

  const handleCancelDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setConfirmDeleteId(null);
  };

  const handleDeleteClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setConfirmDeleteId(id);
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
            const isConfirming = confirmDeleteId === jobId;

            return (
              <tr
                key={jobId}
                className={`border-b border-slate-800 transition ${isConfirming ? 'bg-red-500/5' : 'hover:bg-slate-800/40'}`}
              >
                <td className="p-3 sm:p-4 text-gray-200">
                  {job.title}
                </td>

                <td className="p-3 sm:p-4 text-gray-400">
                  {job.company}
                </td>

                <td className="p-3 sm:p-4">
                  <div className="flex items-center justify-end gap-3 sm:gap-4">
                    {isConfirming ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-red-400 font-medium mr-2">Are you sure?</span>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteConfirm(e, jobId)}
                          className="flex items-center gap-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 px-2 py-1 rounded text-xs font-bold transition"
                        >
                          <Check className="w-3.5 h-3.5" /> Yes
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelDelete}
                          className="flex items-center gap-1 bg-slate-700 text-gray-300 hover:bg-slate-600 px-2 py-1 rounded text-xs font-bold transition"
                        >
                          <X className="w-3.5 h-3.5" /> No
                        </button>
                      </div>
                    ) : (
                      <>
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

                        {/* 🔹 DELETE */}
                        <button
                          type="button"
                          onClick={(e) => handleDeleteClick(e, jobId)}
                          className="flex items-center gap-1.5 text-red-400 hover:text-red-300 text-xs sm:text-sm font-medium transition px-2 py-1 rounded-md hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </>
                    )}
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