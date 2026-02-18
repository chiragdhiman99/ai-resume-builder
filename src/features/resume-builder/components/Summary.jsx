import { motion as Motion } from "framer-motion";
import { toast } from "react-toastify";
import { generateSummary } from "../services/ai";
import { useState } from "react";

function Summary({ resumeData, setResumeData }) {
  const [options, setOptions] = useState([]);
  const [loading, setloading] = useState(false);

  const updateresumeData = (value) => {
    setResumeData((prevData) => ({
      ...prevData,
      professional_summary: value,
    }));
  };

  const handlesummary = async () => {
    try {
      setloading(true);

      const summary = await generateSummary(
        resumeData.personal_info.full_name,
        resumeData.skills,
      );

      console.log("Summary received:", summary);

      setResumeData((prevData) => ({
        ...prevData,
        professional_summary: summary.trim(),
      }));
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to generate: ${error.message}`);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between"
        >
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              Professional Summary
            </h1>
            <p className="text-gray-500 text-sm">
              Add summary for your resume here
            </p>
          </div>
          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex w-full sm:w-auto items-center justify-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm"
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            {loading ? (
              <span className="text-purple-700 font-medium text-sm flex items-center gap-1">
                Generating
                <span className="flex gap-0.5">
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "0s" }}
                  >
                    .
                  </span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  >
                    .
                  </span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  >
                    .
                  </span>
                </span>
              </span>
            ) : (
              <span
                className="font-medium cursor-pointer"
                onClick={handlesummary}
              >
                AI Enhance
              </span>
            )}
          </Motion.button>
        </Motion.div>
        <Motion.textarea
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          name="summary"
          value={resumeData.professional_summary}
          onChange={(e) => updateresumeData(e.target.value)}
          placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
          className="w-full h-40 sm:h-48 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 placeholder-gray-400"
        />
        <Motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-lert sm:text-center text-gray-500 text-sm mt-4 mb-6"
        >
          Tip: Keep it concise (3-4 sentences) and focus on your most relevant
          achievements and skills.
        </Motion.p>
      </div>
    </div>
  );
}

export default Summary;
