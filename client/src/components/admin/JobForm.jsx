import React, { useState, useEffect } from "react";
import Button from "../ui/Button";

const JobForm = ({ initialValues, onSubmit, isSubmitting }) => {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setForm({
        title: initialValues.title || "",
        company: initialValues.company || "",
        location: initialValues.location || "",
        description: initialValues.description || "",
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Job title is required";
    if (!form.company.trim()) newErrors.company = "Company is required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onSubmit(form);
  };

  const inputStyle = `
    w-full bg-slate-900/80 border border-slate-700 
    rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 
    text-sm sm:text-base text-gray-200 
    placeholder:text-gray-500
    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
    outline-none transition
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">

      {/* 🔹 Basic Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

        {/* Title */}
        <div className="sm:col-span-2">
          <label className="block text-xs sm:text-sm text-gray-300 mb-1">
            Job Title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            className={inputStyle}
          />
          {errors.title && (
            <p className="text-red-400 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        {/* Company */}
        <div>
          <label className="block text-xs sm:text-sm text-gray-300 mb-1">
            Company
          </label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="e.g. Google"
            className={inputStyle}
          />
          {errors.company && (
            <p className="text-red-400 text-xs mt-1">{errors.company}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs sm:text-sm text-gray-300 mb-1">
            Location
          </label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Remote"
            className={inputStyle}
          />
          {errors.location && (
            <p className="text-red-400 text-xs mt-1">{errors.location}</p>
          )}
        </div>

      </div>

      {/* 🔹 Description */}
      <div>
        <label className="block text-xs sm:text-sm text-gray-300 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          placeholder="Describe the job role..."
          className={inputStyle}
        />
        {errors.description && (
          <p className="text-red-400 text-xs mt-1">{errors.description}</p>
        )}
      </div>

      {/* 🔹 Submit Button */}
      <div className="pt-2 sm:pt-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
          className="text-sm sm:text-base"
        >
          {isSubmitting ? "Saving..." : "Save Job"}
        </Button>
      </div>

    </form>
  );
};

export default JobForm;