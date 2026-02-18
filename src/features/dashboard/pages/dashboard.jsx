import { AnimatePresence, motion as Motion } from "framer-motion";
import { use, useEffect, useState } from "react";
import {
  FiPlus,
  FiEdit,
  FiFileText,
  FiDownload,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [isAddResumeOpen, setIsAddResumeOpen] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  const openAddResumeModal = () => setIsAddResumeOpen(true);

  const closeAddResumeModal = () => {
    setIsAddResumeOpen(false);
    setResumeTitle("");
  };

  useEffect(() => {
    if (!isAddResumeOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeAddResumeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isAddResumeOpen]);

  const handleCreateResume = () => {
    if (!resumeTitle.trim()) return;

    const defaultResumeData = {
      personal_info: {
        full_name: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: "",
        image: "",
      },
      professional_summary: "",
      experience: [],
      education: [],
      project: [],
      skills: [],
    };

    const drafts = JSON.parse(localStorage.getItem("resumeDrafts") || "[]");

    const newDraft = {
      id: Date.now().toString(),
      title: resumeTitle.trim(),
      status: "draft",
      updatedAt: new Date().toLocaleDateString(),
      data: defaultResumeData,
    };

    drafts.unshift(newDraft);

    localStorage.setItem("resumeDrafts", JSON.stringify(drafts));
    localStorage.setItem("currentDraftId", newDraft.id);
    localStorage.setItem("currentresumedata", JSON.stringify(newDraft.data));

    localStorage.removeItem("currentresumedata");
    localStorage.removeItem("Step");

    closeAddResumeModal();
    navigate("/dashboard/resume-builder");
  };

  const [draf, setDrafts] = useState(
    JSON.parse(localStorage.getItem("resumeDrafts") || "[]"),
  );

  const handleDeleteResume = (id) => {
    const drafts = JSON.parse(localStorage.getItem("resumeDrafts") || "[]");
    const updatedDrafts = drafts.filter((draft) => draft.id !== id);
    localStorage.setItem("resumeDrafts", JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
  };

  const editfunc = (draft) => {
    let drafts = JSON.parse(localStorage.getItem("resumeDrafts") || "[]");

    drafts = drafts.filter((d) => d.id !== draft.id);
    drafts.unshift(draft);

    localStorage.setItem("resumeDrafts", JSON.stringify(drafts));

    setDrafts(drafts);

    localStorage.setItem("currentDraftId", draft.id);
    localStorage.setItem("currentresumedata", JSON.stringify(draft.data));

    navigate("/dashboard/resume-builder");
  };

  const updateexisting = (draft) => {
    localStorage.setItem("currentDraftId", draft.id);
    localStorage.setItem("currentresumedata", JSON.stringify(draft.data));
    navigate("/dashboard/resume-builder");
  };

  const drafts = localStorage.getItem("resumeDrafts");
  const parsedDrafts = JSON.parse(drafts);

  return (
    <div>
      <div
        className={`min-h-screen bg-gray-50 transition-all duration-300 ${
          isAddResumeOpen ? "blur-sm" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h2>

            <p className="text-gray-600">
              Manage your resumes and create new ones
            </p>
          </Motion.div>
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          >
            <Motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ y: -8 }}
              onClick={openAddResumeModal}
              className="relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 cursor-pointer shadow-lg overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white opacity-5">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                ></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-white bg-opacity-20 p-4 rounded-xl backdrop-blur-sm">
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="text-teal-600 w-5 h-5"
                    />
                  </div>
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  Create New Resume
                </h3>
                <p className="text-white text-opacity-90 mb-6">
                  Start building your professional resume from scratch with our
                  easy-to-use builder
                </p>

                <div className="flex items-center gap-2 text-white text-sm font-medium">
                  <span>Get Started</span>
                  <span>→</span>
                </div>
              </div>
            </Motion.div>
            <Motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() =>
                updateexisting(parsedDrafts ? parsedDrafts[0] : null)
              }
              className="relative bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 cursor-pointer shadow-lg overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white opacity-5">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                ></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-white bg-opacity-20 p-4 rounded-xl backdrop-blur-sm">
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-indigo-600 w-5 h-5"
                    />
                  </div>
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  Update Existing Resume
                </h3>
                <p className="text-white text-opacity-90 mb-6">
                  Edit and improve your existing resumes with updated
                  information and design
                </p>

                <div className="flex items-center gap-2 text-white text-sm font-medium">
                  <span>View Resumes</span>
                  <span>→</span>
                </div>
              </div>
            </Motion.div>
          </Motion.div>
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Your Resumes</h3>
              <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                View All →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parsedDrafts &&
                parsedDrafts.map((draft) => (
                  <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ y: -4 }}
                    key={draft.id}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow cursor-pointer border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-emerald-100 p-3 rounded-lg">
                        <FiFileText className="w-6 h-6 text-emerald-600" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        {draft.status}
                      </span>
                    </div>

                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {draft.title}
                    </h4>
                    <p className="text-gray-500 text-sm mb-4">
                      Updated {draft.updatedAt}
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          editfunc(draft);
                        }}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <FiEdit className="w-4 h-4" />
                        Edit
                      </button>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors">
                        <FiDownload className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteResume(draft.id)}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-2 rounded-lg transition-colors border border-rose-100"
                        aria-label="Delete resume"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </Motion.div>
                ))}
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ y: -4 }}
                onClick={openAddResumeModal}
                className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300 hover:border-emerald-500 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[200px]"
              >
                <div className="bg-white p-4 rounded-full mb-4 shadow-sm">
                  <FiPlus className="w-8 h-8 text-emerald-500" />
                </div>
                <h4 className="text-lg font-semibold text-gray-700 mb-1">
                  Create New Resume
                </h4>
                <p className="text-gray-500 text-sm text-center">
                  Start a fresh resume
                </p>
              </Motion.div>
            </div>
          </Motion.div>
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FiFileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Resumes</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <FiDownload className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Downloads</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Profile Views</p>
                  <p className="text-2xl font-bold text-gray-900">248</p>
                </div>
              </div>
            </div>
          </Motion.div>
        </div>
      </div>{" "}
      <AnimatePresence>
        {isAddResumeOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center px-4"
            onClick={closeAddResumeModal}
          >
            <Motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-emerald-100"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Add Resume
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Enter your resume title to get started.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeAddResumeModal}
                  className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  aria-label="Close modal"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="resume-title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Resume Title
                </label>
                <input
                  id="resume-title"
                  type="text"
                  value={resumeTitle}
                  onChange={(event) => setResumeTitle(event.target.value)}
                  placeholder="e.g. Product Designer Resume"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition"
                  autoFocus
                />
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeAddResumeModal}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateResume}
                  disabled={!resumeTitle.trim()}
                  className="px-4 py-2.5 rounded-xl cursor-pointer bg-emerald-500 text-white font-medium hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Create Resume
                </button>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;
