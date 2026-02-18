import { useRef } from "react";
import { motion as Motion } from "framer-motion";

function Information({ resumeData, setResumeData }) {
  const imageInputRef = useRef(null);

  const updateresumeData = (name, value) => {
    setResumeData((prevData) => ({
      ...prevData,
      personal_info: {
        ...prevData.personal_info,
        [name]: value,
      },
    }));
  };

  const handleImageSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      updateresumeData("image", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const inputClassName =
    "w-full max-w-md px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all";

  return (
    <div className="w-full">
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-0"
      >
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
          Personal Information
        </h1>
        <p className="text-gray-500 text-sm">
          Get Started with the personal information
        </p>
      </Motion.div>
      <Motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-5"
      >
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />
        <button
          type="button"
          onClick={() => imageInputRef.current?.click()}
          className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
        >
          {resumeData.personal_info?.image ? (
            <img
              src={resumeData.personal_info.image}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <svg
              className="w-8 h-8 text-purple-400"
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
          )}
        </button>
      </Motion.div>
      <div className="space-y-4 w-full">
        <Motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-1.5 text-sm">
            <svg
              className="w-4 h-4 text-gray-400"
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
            Full Name
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="full_name"
            value={resumeData.personal_info?.full_name || ""}
            onChange={(e) => updateresumeData(e.target.name, e.target.value)}
            placeholder="Alex Smith"
            className={inputClassName}
          />
        </Motion.div>
        <Motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-1.5 text-sm">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Email Address
            <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={resumeData.personal_info?.email || ""}
            onChange={(e) => updateresumeData(e.target.name, e.target.value)}
            placeholder="alex@example.com"
            className={inputClassName}
          />
        </Motion.div>
        <Motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-1.5 text-sm">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={resumeData.personal_info?.phone || ""}
            onChange={(e) => updateresumeData(e.target.name, e.target.value)}
            placeholder="0 123456789"
            className={inputClassName}
          />
        </Motion.div>
        <Motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-1.5 text-sm">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Location
          </label>
          <input
            type="text"
            name="location"
            value={resumeData.personal_info?.location || ""}
            onChange={(e) => updateresumeData(e.target.name, e.target.value)}
            placeholder="NY, USA"
            className={inputClassName}
          />
        </Motion.div>
      </div>
    </div>
  );
}

export default Information;
