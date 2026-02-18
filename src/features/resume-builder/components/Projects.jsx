import { useState } from "react";
import { motion as Motion } from "framer-motion";

const emptyProject = {
  name: "",
  type: "",
  description: "",
};

function Projects({ resumeData, setResumeData }) {
  const [showProjectForm, setShowProjectForm] = useState(
    resumeData?.project?.length > 0,
  );
  const [projectForm, setProjectForm] = useState(emptyProject);

  const inputClassName =
    "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400";

  const updateProject = (key, value) => {
    const nextForm = {
      ...projectForm,
      [key]: value,
    };

    setProjectForm(nextForm);

    setResumeData((prevData) => {
      const withoutDraft = prevData.project.filter((proj) => !proj.__draft);
      return {
        ...prevData,
        project: [...withoutDraft, { ...nextForm, __draft: true }],
      };
    });
  };

  const handleAddProject = () => {
    setShowProjectForm(true);
    setProjectForm(emptyProject);
    setResumeData((prevData) => ({
      ...prevData,
      project: prevData.project.filter((proj) => !proj.__draft),
    }));
  };

  const handleSaveProject = () => {
    if (!projectForm.name.trim() && !projectForm.description.trim()) return;

    setResumeData((prevData) => ({
      ...prevData,
      project: [
        ...prevData.project.filter((proj) => !proj.__draft),
        { ...projectForm },
      ],
    }));

    setProjectForm(emptyProject);
  };

  const handleDeleteProject = () => {
    setProjectForm(emptyProject);
    setResumeData((prevData) => ({
      ...prevData,
      project: prevData.project.filter((proj) => !proj.__draft),
    }));
  };

  return (
    <div className="bg-gray-50 p-4 sm:p-5">
      <div className="max-w-3xl mx-auto">
        <Motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
        >
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              Projects
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Add your projects
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddProject}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-lg bg-emerald-100 px-3 py-2 text-xs sm:text-sm font-medium text-emerald-700 hover:bg-emerald-200 transition-colors"
          >
            <span className="text-sm sm:text-base leading-none">+</span>
            Add Project
          </button>
        </Motion.div>

        {!showProjectForm ? (
          <Motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4 rounded-xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm"
          >
            <div className="flex min-h-[120px] flex-col items-center justify-center text-center">
              <p className="text-sm sm:text-base font-medium text-gray-600">
                No projects added yet.
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                Click "Add Project" to get started.
              </p>
            </div>
          </Motion.div>
        ) : (
          <Motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4 rounded-xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                Project #
                {resumeData.project.filter((proj) => !proj.__draft).length + 1}
              </h2>
              <button
                type="button"
                onClick={handleDeleteProject}
                className="text-red-500 hover:text-red-600"
                aria-label="Delete project"
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

            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={projectForm.name}
                onChange={(e) => updateProject(e.target.name, e.target.value)}
                placeholder="Project Name"
                className={inputClassName}
              />
              <input
                type="text"
                name="type"
                value={projectForm.type}
                onChange={(e) => updateProject(e.target.name, e.target.value)}
                placeholder="Project Type"
                className={inputClassName}
              />
              <textarea
                rows={4}
                name="description"
                value={projectForm.description}
                onChange={(e) => updateProject(e.target.name, e.target.value)}
                placeholder="Describe your project..."
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
              />
            </div>
          </Motion.div>
        )}

        <Motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          type="button"
          onClick={handleSaveProject}
          className="rounded-lg bg-emerald-200 px-4 py-2 text-xs sm:text-sm font-medium text-emerald-700 hover:bg-emerald-300 transition-colors w-full sm:w-auto"
        >
          Save Changes
        </Motion.button>
      </div>
    </div>
  );
}

export default Projects;
