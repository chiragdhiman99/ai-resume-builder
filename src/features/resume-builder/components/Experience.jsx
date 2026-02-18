import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { generateJobDescription } from "../services/ai";

const emptyExperience = {
  company: "",
  position: "",
  start_date: "",
  end_date: "",
  is_current: false,
  description: "",
};

export default function ProfessionalExperience({ resumeData, setResumeData }) {
  const [showExperienceForm, setShowExperienceForm] = useState(
    resumeData?.experience?.length > 0,
  );

  const [experienceForm, setExperienceForm] = useState(emptyExperience);

  const inputClassName =
    "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400";

  const updateExperience = (key, value) => {
    const nextForm = {
      ...experienceForm,
      [key]: value,
    };

    setExperienceForm(nextForm);

    setResumeData((prevData) => {
      const withoutDraft = prevData.experience.filter((exp) => !exp.__draft);
      return {
        ...prevData,
        experience: [...withoutDraft, { ...nextForm, __draft: true }],
      };
    });
  };

  const handlesummary = async () => {
    try {
      const generatedescription = await generateJobDescription(
        experienceForm.position,
        experienceForm.company,
      );
      setExperienceForm((prevData) => ({
        ...prevData,
        description: generatedescription.trim(),
      }));
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to generate: ${error.message}`);
    } finally {
    }
  };

  const handleAddExperience = () => {
    setShowExperienceForm(true);
    setExperienceForm(emptyExperience);
    setResumeData((prevData) => ({
      ...prevData,
      experience: prevData.experience.filter((exp) => !exp.__draft),
    }));
  };

  const handleSaveExperience = () => {
    if (!experienceForm.company.trim() && !experienceForm.position.trim())
      return;

    setResumeData((prevData) => ({
      ...prevData,
      experience: [
        ...prevData.experience.filter((exp) => !exp.__draft),
        { ...experienceForm },
      ],
    }));

    setExperienceForm(emptyExperience);
  };

  const handleDeleteExperience = () => {
    setExperienceForm(emptyExperience);
    setResumeData((prevData) => ({
      ...prevData,
      experience: prevData.experience.filter((exp) => !exp.__draft),
    }));
  };

  return (
    <div className="bg-gray-50 p-4 sm:p-5">
      <div className="max-w-3xl mx-auto">
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5"
        >
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
              Professional Experience
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm">
              Add your job experience
            </p>
          </div>

          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddExperience}
            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium text-xs sm:text-sm w-full sm:w-auto"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Add Experience</span>
          </Motion.button>
        </Motion.div>

        {!showExperienceForm ? (
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-4"
          >
            <div className="flex flex-col items-center justify-center text-center">
              <Motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mb-4"
              >
                <svg
                  className="w-14 h-14 sm:w-16 sm:h-16 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <p className="text-gray-600 text-sm sm:text-base font-medium mb-1.5">
                  No work experience added yet.
                </p>
                <p className="text-gray-500 text-xs sm:text-sm">
                  Click "Add Experience" to get started.
                </p>
              </Motion.div>
            </div>
          </Motion.div>
        ) : (
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                Experience #1
              </h2>
              <button
                type="button"
                onClick={handleDeleteExperience}
                className="text-red-500 hover:text-red-600 transition-colors"
                aria-label="Delete experience"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-5-3h4a1 1 0 011 1v2H9V5a1 1 0 011-1z"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                name="company"
                value={experienceForm.company}
                onChange={(e) =>
                  updateExperience(e.target.name, e.target.value)
                }
                placeholder="Company Name"
                className={inputClassName}
              />
              <input
                type="text"
                name="position"
                value={experienceForm.position}
                onChange={(e) =>
                  updateExperience(e.target.name, e.target.value)
                }
                placeholder="Job Title"
                className={inputClassName}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div className="relative">
                <input
                  type="date"
                  name="start_date"
                  value={experienceForm.start_date}
                  onChange={(e) =>
                    updateExperience(e.target.name, e.target.value)
                  }
                  className={`${inputClassName} pr-10`}
                />
              </div>
              <div className="relative">
                <input
                  type="date"
                  name="end_date"
                  value={experienceForm.end_date}
                  onChange={(e) =>
                    updateExperience(e.target.name, e.target.value)
                  }
                  disabled={experienceForm.is_current}
                  className={`${inputClassName} pr-10`}
                />
              </div>
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-gray-700 mb-4">
              <input
                type="checkbox"
                checked={experienceForm.is_current}
                onChange={(e) =>
                  updateExperience("is_current", e.target.checked)
                }
                className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-400"
              />
              Currently working here
            </label>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <p className="text-sm sm:text-base font-semibold text-gray-800">
                Job Description
              </p>
              <button
                type="button"
                onClick={handlesummary}
                className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-500 w-fit"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Enhance with AI
              </button>
            </div>

            <textarea
              rows={5}
              value={experienceForm.description}
              onChange={(e) => updateExperience("description", e.target.value)}
              placeholder="Describe your key responsibilities and achievements..."
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
            />
          </Motion.div>
        )}

        <Motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSaveExperience}
          className="px-4 py-2 bg-green-400 text-white font-medium rounded-lg hover:bg-green-500 transition-colors text-xs sm:text-sm w-full sm:w-auto"
        >
          Save Changes
        </Motion.button>
      </div>
    </div>
  );
}
