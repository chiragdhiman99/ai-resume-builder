import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";

function Skills({ resumeData, setResumeData }) {
  const [savedSkills, setSavedSkills] = useState(resumeData.skills || []);
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    const draftSkill = skillInput.trim();
    const previewSkills = draftSkill
      ? [...savedSkills, draftSkill]
      : savedSkills;

    setResumeData((prevData) => ({
      ...prevData,
      skills: previewSkills,
    }));
  }, [skillInput, savedSkills, setResumeData]);

  const handleAddSkill = () => {
    const skill = skillInput.trim();
    if (!skill) return;

    setSavedSkills((prev) => [...prev, skill]);
    setSkillInput("");
  };

  const handleDeleteSkill = (indexToDelete) => {
    setSavedSkills((prev) =>
      prev.filter((_, index) => index !== indexToDelete),
    );
  };

  const hasAnySkill = savedSkills.length > 0 || skillInput.trim().length > 0;

  return (
    <div className="bg-gray-50 p-4 sm:p-5">
      <div className="max-w-3xl mx-auto">
        <Motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
            Skills
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Add your technical and soft skills
          </p>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="mb-5 flex flex-col gap-2 sm:flex-row"
        >
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSkill();
              }
            }}
            placeholder="Enter a skill (e.g., JavaScript, Project Management)"
            className="w-full rounded-lg border border-blue-500 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <span className="text-base leading-none">+</span>
            Add
          </button>
        </Motion.div>

        {!hasAnySkill ? (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mb-5 flex min-h-[120px] flex-col items-center justify-center text-center"
          >
            <svg
              className="mb-2 h-10 w-10 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <p className="text-sm sm:text-base font-medium text-gray-600">
              No skills added yet.
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Add your technical and soft skills above.
            </p>
          </Motion.div>
        ) : (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mb-5 flex flex-wrap gap-2"
          >
            {savedSkills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs sm:text-sm text-blue-800"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleDeleteSkill(index)}
                  className="text-blue-700 hover:text-blue-900"
                  aria-label={`Remove ${skill}`}
                >
                  x
                </button>
              </span>
            ))}
            {skillInput.trim() && (
              <span className="inline-flex items-center rounded-full border border-dashed border-blue-300 bg-blue-50 px-3 py-1 text-xs sm:text-sm text-blue-700">
                {skillInput.trim()}
              </span>
            )}
          </Motion.div>
        )}

        <Motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="mb-5 rounded-lg bg-blue-50 p-3 text-xs sm:text-sm text-slate-700"
        >
          <span className="font-semibold text-blue-700">Tip:</span> Add 8-12
          relevant skills. Include both technical skills (programming languages,
          tools) and soft skills (leadership, communication).
        </Motion.div>

        <Motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          type="button"
          onClick={handleAddSkill}
          className="rounded-lg bg-emerald-200 px-4 py-2 text-xs sm:text-sm font-medium text-emerald-700 hover:bg-emerald-300 transition-colors w-full sm:w-auto"
        >
          Save Changes
        </Motion.button>
      </div>
    </div>
  );
}

export default Skills;
