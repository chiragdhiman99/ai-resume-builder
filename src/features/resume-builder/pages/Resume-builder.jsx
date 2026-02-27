import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion as Motion } from "framer-motion";
import Information from "../components/Information";
import Summary from "../components/Summary";
import ProfessionalExperience from "../components/Experience";
import Education from "../components/Education";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Improve from "../components/Improve";
import ClassicTemplate from "../../templates/components/ClassicTemplate";
import MinimalTemplate from "../../templates/components/MinimalImageTemplate";
import Minimaltemp from "../../templates/components/MinimalTemplate";
import ModernTemplate from "../../templates/components/ModernTemplate";
import { useReactToPrint } from "react-to-print";
import { useNavigate, useNavigation } from "react-router";
import debounce from "lodash/debounce";

export default function Resumebuilder() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const defaultdata = {
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

  const [resumeData, setResumeData] = useState(() => {
    const getdata = localStorage.getItem("currentresumedata");

    if (!getdata || getdata === "undefined") {
      return defaultdata;
    }

    try {
      return JSON.parse(getdata);
    } catch (error) {
      return defaultdata;
    }
  });

  const debouncedSaveResumeData = useMemo(
    () =>
      debounce((nextResumeData) => {
        localStorage.setItem(
          "currentresumedata",
          JSON.stringify(nextResumeData),
        );
      }, 350),
    [],
  );

  const debouncedSaveDrafts = useMemo(
    () =>
      debounce((nextResumeData) => {
        const id = localStorage.getItem("currentDraftId");
        if (!id) return;

        const drafts = JSON.parse(
          localStorage.getItem("resumeDrafts") || "[]",
        ).map((d) =>
          d.id === id
            ? {
                ...d,
                data: nextResumeData,
                updatedAt: new Date().toLocaleDateString(),
              }
            : d,
        );

        localStorage.setItem("resumeDrafts", JSON.stringify(drafts));
      }, 350),
    [],
  );

  const debouncedSavePreferences = useMemo(
    () =>
      debounce((nextStep, nextTemplateLabel, nextAccentLabel) => {
        localStorage.setItem("Step", nextStep);
        localStorage.setItem("selectedtemplate", nextTemplateLabel);
        localStorage.setItem("selectedaccent", nextAccentLabel);
      }, 200),
    [],
  );

  useEffect(() => {
    debouncedSaveResumeData(resumeData);
  }, [resumeData, debouncedSaveResumeData]);

  useEffect(() => {
    debouncedSaveDrafts(resumeData);
  }, [resumeData, debouncedSaveDrafts]);

  const [isTemplateMenuOpen, setIsTemplateMenuOpen] = useState(false);
  const [selectedTemplateLabel, setSelectedTemplateLabel] = useState(() => {
    const getdata = localStorage.getItem("selectedtemplate");
    return getdata ? getdata : "Classic";
  });
  const [isAccentMenuOpen, setIsAccentMenuOpen] = useState(false);
  const [selectedAccentLabel, setSelectedAccentLabel] = useState(() => {
    const getdata = localStorage.getItem("selectedaccent");
    return getdata ? getdata : "Blue";
  });
  const [step, setstep] = useState(() => {
    const getdata = localStorage.getItem("Step");
    return getdata ? JSON.parse(getdata) : 1;
  });

  useEffect(() => {
    debouncedSavePreferences(step, selectedTemplateLabel, selectedAccentLabel);
  }, [
    step,
    selectedTemplateLabel,
    selectedAccentLabel,
    debouncedSavePreferences,
  ]);

  useEffect(() => {
    return () => {
      debouncedSaveResumeData.cancel();
      debouncedSaveDrafts.cancel();
      debouncedSavePreferences.cancel();
    };
  }, [debouncedSaveResumeData, debouncedSaveDrafts, debouncedSavePreferences]);

  const templateOptions = [
    "Classic",
    "MinimalImage",
    "ModernTemplate",
    "Minimal Template",
  ];
  const accentOptions = [
    { name: "Blue", colorClass: "bg-blue-500" },
    { name: "Indigo", colorClass: "bg-indigo-500" },
    { name: "Purple", colorClass: "bg-purple-500" },
    { name: "Green", colorClass: "bg-emerald-500" },
    { name: "Red", colorClass: "bg-red-500" },
    { name: "Orange", colorClass: "bg-orange-500" },
    { name: "Teal", colorClass: "bg-teal-500" },
    { name: "Pink", colorClass: "bg-pink-500" },
    { name: "Gray", colorClass: "bg-gray-500" },
    { name: "Black", colorClass: "bg-slate-800" },
  ];

  const printContentRef = useRef();
  const mountedAtRef = useRef(Date.now());
  const drafttitle = localStorage.getItem("resumeDrafts")
    ? JSON.parse(localStorage.getItem("resumeDrafts"))
    : "";

  const handlePrint = useReactToPrint({
    contentRef: printContentRef,
    documentTitle: drafttitle.title,
    onAfterPrint: () => {
      console.log("Resume downloaded!");
    },
  });

  const handleManualPrint = () => {
    // Block only very-early ghost triggers on mobile after mount.
    if (Date.now() - mountedAtRef.current < 1200) return;
    handlePrint();
  };

  const navigate = useNavigate();

  const dashboard = () => {
    navigate("/dashboard");
  };

  const totalSteps = 7;
  const progressPercent = Math.min((step / totalSteps) * 100, 100);

  return (
    <div className="bg-gray-50 px-4 sm:px-6 lg:px-10 py-5 flex flex-col lg:flex-row items-start gap-6 lg:gap-10">
      <div className="w-full lg:max-w-md text-left">
        <Motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 mb-4 transition-colors text-sm"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span
            onClick={() => dashboard()}
            className=" cursor-pointer font-medium"
          >
            Back to Dashboard
          </span>
        </Motion.button>
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4"
        >
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <Motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="h-full bg-linear-to-r from-purple-500 to-pink-500 rounded-full relative"
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-pink-500 rounded-full shadow-lg"></div>
            </Motion.div>
          </div>
        </Motion.div>
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-4 sm:p-6"
        >
          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div
              className="flex  flex-wrap sm:flex-nowrap items-center gap-2 
             "
            >
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsTemplateMenuOpen((prev) => !prev)}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 shadow-xs transition-colors hover:bg-blue-100"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 3h8l4 4v14H7V3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 3v4h4"
                    />
                  </svg>
                  Template
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        isTemplateMenuOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"
                      }
                    />
                  </svg>
                </button>

                {isTemplateMenuOpen && (
                  <div className="absolute left-0 top-full z-20 mt-2 w-52 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
                    {templateOptions.map((option) => {
                      const isActive = selectedTemplateLabel === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setSelectedTemplateLabel(option);
                            setIsTemplateMenuOpen(false);
                          }}
                          className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors ${
                            isActive
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span>{option}</span>
                          {isActive && (
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsAccentMenuOpen((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 rounded-md cursor-pointer border border-purple-100 bg-purple-50 px-3 py-1.5 text-sm font-medium text-purple-600 shadow-xs transition-colors hover:bg-purple-100"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3a9 9 0 109 9c0-.83-.11-1.64-.31-2.42a3 3 0 01-3.51-3.51A8.98 8.98 0 0012 3z"
                    />
                  </svg>
                  Accent
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={isAccentMenuOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                    />
                  </svg>
                </button>

                {isAccentMenuOpen && (
                  <div className="absolute left-0 top-full z-20 mt-2 w-[280px] sm:w-[300px] rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-3 gap-y-4">
                      {accentOptions.map((accent) => {
                        const isSelected = selectedAccentLabel === accent.name;
                        return (
                          <button
                            key={accent.name}
                            type="button"
                            onClick={() => {
                              setSelectedAccentLabel(accent.name);
                              setIsAccentMenuOpen(false);
                            }}
                            className="flex flex-col items-center gap-2 text-center"
                          >
                            <span
                              className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full ${accent.colorClass} shadow-sm transition-transform hover:scale-105`}
                            >
                              {isSelected && (
                                <svg
                                  className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </span>
                            <span className="text-xs sm:text-[15px] font-medium text-gray-700">
                              {accent.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-5 w-full sm:w-auto justify-between sm:justify-start">
              <Motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setstep((prev) => Math.max(1, prev - 1))}
                className="flex items-center gap-1.5 cursor-pointer text-gray-600 hover:text-purple-600 font-medium transition-colors text-sm"
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
                    d="M15 5l-7 7 7 7"
                  />
                </svg>
                Previous
              </Motion.button>
              <Motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setstep((prev) => Math.min(totalSteps, prev + 1))
                }
                className="flex items-center gap-1.5 cursor-pointer text-gray-600 hover:text-purple-600 font-medium transition-colors text-sm"
              >
                Next
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Motion.button>
            </div>
          </div>

          {step === 1 && (
            <Information
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          )}
          {step === 2 && (
            <Skills resumeData={resumeData} setResumeData={setResumeData} />
          )}
          {step === 3 && (
            <Summary resumeData={resumeData} setResumeData={setResumeData} />
          )}
          {step === 4 && (
            <ProfessionalExperience
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          )}
          {step === 5 && (
            <Education resumeData={resumeData} setResumeData={setResumeData} />
          )}
          {step === 6 && (
            <Projects resumeData={resumeData} setResumeData={setResumeData} />
          )}

          {step === 7 && (
            <Improve resumeData={resumeData} setResumeData={setResumeData} />
          )}
        </Motion.div>
      </div>
      <div className="w-full lg:flex-1">
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 bg-linear-to-r from-slate-50 via-white to-cyan-50 px-4 py-3 gap-3">
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Resume Preview
              </p>
              <p className="text-xs text-gray-500">
                Download your latest version as PDF
              </p>
            </div>
            <Motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={handleManualPrint}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-linear-to-r from-cyan-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md w-full sm:w-auto justify-center"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v1a3 3 0 003 3h10a3 3 0 003-3v-1"
                />
              </svg>
              Download PDF
            </Motion.button>
          </div>
          <div className="p-2 sm:p-4 overflow-x-auto" ref={printContentRef}>
            {selectedTemplateLabel === "Classic" && (
              <ClassicTemplate
                data={resumeData}
                accentColor={selectedAccentLabel}
              />
            )}
            {selectedTemplateLabel === "MinimalImage" && (
              <MinimalTemplate
                data={resumeData}
                accentColor={selectedAccentLabel}
              />
            )}
            {selectedTemplateLabel === "Minimal Template" && (
              <Minimaltemp
                data={resumeData}
                accentColor={selectedAccentLabel}
              />
            )}{" "}
            {selectedTemplateLabel === "ModernTemplate" && (
              <ModernTemplate
                data={resumeData}
                accentColor={selectedAccentLabel}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
