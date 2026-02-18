import { useState } from "react";
import { motion as Motion } from "framer-motion";

const emptyEducation = {
  institution: "",
  degree: "",
  field: "",
  graduation_date: "",
  gpa: "",
};

function Education({ resumeData, setResumeData }) {
  const [showEducationForm, setShowEducationForm] = useState(
    resumeData?.education?.length > 0,
  );
  const [educationForm, setEducationForm] = useState(emptyEducation);

  const inputClassName =
    "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400";

  const updateEducation = (key, value) => {
    const nextForm = {
      ...educationForm,
      [key]: value,
    };

    setEducationForm(nextForm);

    setResumeData((prevData) => {
      const withoutDraft = prevData.education.filter((edu) => !edu.__draft);
      return {
        ...prevData,
        education: [...withoutDraft, { ...nextForm, __draft: true }],
      };
    });
  };

  const handleAddEducation = () => {
    setShowEducationForm(true);
    setEducationForm(emptyEducation);
    setResumeData((prevData) => ({
      ...prevData,
      education: prevData.education.filter((edu) => !edu.__draft),
    }));
  };

  const handleSaveEducation = () => {
    if (!educationForm.institution.trim() && !educationForm.degree.trim())
      return;

    setResumeData((prevData) => ({
      ...prevData,
      education: [
        ...prevData.education.filter((edu) => !edu.__draft),
        { ...educationForm },
      ],
    }));

    setEducationForm(emptyEducation);
  };

  const handleDeleteEducation = () => {
    setEducationForm(emptyEducation);
    setResumeData((prevData) => ({
      ...prevData,
      education: prevData.education.filter((edu) => !edu.__draft),
    }));
  };

  return (
    <div className="bg-gray-50 p-4 sm:p-5">
      <div className="max-w-3xl mx-auto">
        <Motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
        >
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              Education
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Add your education details
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddEducation}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-100 px-3 py-2 text-xs sm:text-sm font-medium text-emerald-700 hover:bg-emerald-200 transition-colors w-full sm:w-auto"
          >
            <span className="text-sm sm:text-base leading-none">+</span>
            Add Education
          </button>
        </Motion.div>

        {!showEducationForm ? (
          <Motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="rounded-xl bg-white p-6 sm:p-8 shadow-sm border border-gray-100 mb-4"
          >
            <div className="flex min-h-[120px] flex-col items-center justify-center text-center">
              <svg
                className="mb-3 h-10 w-10 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
              </svg>

              <p className="text-sm sm:text-base font-medium text-gray-600">
                No education added yet.
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                Click "Add Education" to get started.
              </p>
            </div>
          </Motion.div>
        ) : (
          <Motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl bg-white p-4 sm:p-5 shadow-sm border border-gray-100 mb-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                Education #
                {resumeData.education.filter((edu) => !edu.__draft).length + 1}
              </h2>
              <button
                type="button"
                onClick={handleDeleteEducation}
                className="text-red-500 hover:text-red-600"
                aria-label="Delete education"
              >
                <svg
                  className="h-5 w-5"
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
                name="institution"
                value={educationForm.institution}
                onChange={(e) => updateEducation(e.target.name, e.target.value)}
                placeholder="Institution Name"
                className={inputClassName}
              />
              <input
                type="text"
                name="degree"
                value={educationForm.degree}
                onChange={(e) => updateEducation(e.target.name, e.target.value)}
                placeholder="Degree (e.g., Bachelor's, Master's)"
                className={inputClassName}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                name="field"
                value={educationForm.field}
                onChange={(e) => updateEducation(e.target.name, e.target.value)}
                placeholder="Field of Study"
                className={inputClassName}
              />
              <div className="relative">
                <input
                  type="date"
                  name="graduation_date"
                  value={educationForm.graduation_date}
                  onChange={(e) =>
                    updateEducation(e.target.name, e.target.value)
                  }
                  className={`${inputClassName} pr-10`}
                />
                <svg
                  className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            <div className="max-w-[340px]">
              <input
                type="text"
                name="gpa"
                value={educationForm.gpa}
                onChange={(e) => updateEducation(e.target.name, e.target.value)}
                placeholder="GPA (optional)"
                className={inputClassName}
              />
            </div>
          </Motion.div>
        )}

        <Motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          type="button"
          onClick={handleSaveEducation}
          className="rounded-lg bg-emerald-200 px-4 py-2 text-xs sm:text-sm font-medium text-emerald-700 hover:bg-emerald-300 transition-colors w-full sm:w-auto"
        >
          Save Changes
        </Motion.button>
      </div>
    </div>
  );
}

export default Education;
