import { motion } from "framer-motion";
import { useState } from "react";
import { fixGrammar } from "../services/ai";

function Improve({ resumeData, setResumeData }) {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setloading] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [activeButton, setActiveButton] = useState("");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setShowOutput(true);
  };

  const handleoptimize = async (resumeData, mode) => {
    try {
      setloading(true);
      const optdescription = await fixGrammar(resumeData, mode);

      setOutputText(optdescription);
    } catch (error) {
      alert(`Failed to generate: ${error.message}`);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pb-4 border-b border-gray-100"
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl"
          >
            {"\u2728"}
          </motion.span>
          <h2 className="text-xl font-bold text-gray-800">AI Resume Polish</h2>
        </div>
        <p className="text-sm text-gray-600">
          Fix grammar, strengthen verbs, optimize for ATS
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-2"
      >
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          name="grammar"
          onClick={(e) => {
            (handleButtonClick(e.target.name),
              handleoptimize(resumeData, e.target.name));
          }}
          className={`flex cursor-pointer flex-col items-center gap-1.5 p-3 rounded-lg transition-all border-2 ${
            activeButton === "grammar"
              ? "bg-blue-500 text-white border-blue-600 shadow-lg"
              : "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100"
          }`}
        >
          <span className="text-xl">{"\u{1F4DD}"}</span>
          <span className="text-xs font-semibold">Fix Grammar</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          name="strongVerbs"
          onClick={(e) => {
            (handleButtonClick(e.target.name),
              handleoptimize(resumeData, e.target.name));
          }}
          className={`flex cursor-pointer flex-col items-center gap-1.5 p-3 rounded-lg transition-all border-2 ${
            activeButton === "strongVerbs"
              ? "bg-purple-500 text-white border-purple-600 shadow-lg"
              : "bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100"
          }`}
        >
          <span className="text-xl">{"\u{1F4AA}"}</span>
          <span className="text-xs font-semibold">Strong Verbs</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          name="ats"
          onClick={(e) => {
            (handleButtonClick(e.target.name),
              handleoptimize(resumeData, e.target.name));
          }}
          className={`flex cursor-pointer flex-col items-center gap-1.5 p-3 rounded-lg transition-all border-2 ${
            activeButton === "ats"
              ? "bg-green-500 text-white border-green-600 shadow-lg"
              : "bg-green-50 text-green-700 border-green-100 hover:bg-green-100"
          }`}
        >
          <span className="text-xl">{"\u{1F3AF}"}</span>
          <span className="text-xs font-semibold">ATS Optimize</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          name="improveall"
          onClick={(e) => {
            (handleButtonClick(e.target.name),
              handleoptimize(resumeData, e.target.name));
          }}
          className={`flex cursor-pointer flex-col items-center gap-1.5 p-3 rounded-lg transition-all ${
            activeButton === "improveall"
              ? "bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-xl border-2 border-orange-300 scale-105"
              : "bg-gradient-to-br from-purple-100 to-purple-500 text-white hover:opacity-90 shadow-sm"
          }`}
        >
          <span className="text-xl">{"\u{1F680}"}</span>
          <span className="text-xs font-semibold">Improve All</span>
        </motion.button>
      </motion.div>
      {showOutput && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
              <span>{"\u2728"}</span>
              AI Improved
            </label>
          </div>
          <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg min-h-[100px] max-h-[200px] overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-24 gap-2">
                <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs text-gray-600">AI is working...</p>
              </div>
            ) : outputText ? (
              <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                {outputText}
              </p>
            ) : (
              <div className="flex items-center justify-center h-24 text-gray-400 text-center">
                <div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-2xl mb-1"
                  >
                    {"\u2728"}
                  </motion.div>
                  <p className="text-xs">Waiting for AI magic...</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-2"
      >
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <span className="text-lg">{"\u{1F4DD}"}</span>
            <div>
              <h4 className="text-xs font-bold text-blue-900 mb-0.5">
                Fix Grammar
              </h4>
              <p className="text-xs text-blue-700 leading-relaxed">
                Corrects spelling & punctuation errors
              </p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <span className="text-lg">{"\u{1F4AA}"}</span>
            <div>
              <h4 className="text-xs font-bold text-purple-900 mb-0.5">
                Strong Verbs
              </h4>
              <p className="text-xs text-purple-700 leading-relaxed">
                Replaces weak verbs with powerful action words
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <span className="text-lg">{"\u{1F3AF}"}</span>
            <div>
              <h4 className="text-xs font-bold text-green-900 mb-0.5">
                ATS Optimize
              </h4>
              <p className="text-xs text-green-700 leading-relaxed">
                Adds keywords for tracking systems
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-yellow-50 border border-yellow-200 rounded-lg p-3"
      >
        <h4 className="text-xs font-bold text-yellow-900 mb-2 flex items-center gap-1.5">
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {"\u{1F4A1}"}
          </motion.span>
          Pro Tips
        </h4>
        <ul className="space-y-1.5">
          <li className="flex items-start gap-1.5 text-xs text-yellow-800">
            <span className="text-green-600 font-bold">{"\u2713"}</span>
            <span>Paste sections individually for best results</span>
          </li>
          <li className="flex items-start gap-1.5 text-xs text-yellow-800">
            <span className="text-green-600 font-bold">{"\u2713"}</span>
            <span>Use "Improve All" for full enhancement</span>
          </li>
          <li className="flex items-start gap-1.5 text-xs text-yellow-800">
            <span className="text-green-600 font-bold">{"\u2713"}</span>
            <span>Review AI suggestions carefully</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

export default Improve;
