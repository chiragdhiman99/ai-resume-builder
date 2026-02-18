import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function Reviews({ reviews, setReviews }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setfeedback({ ...feedback, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const [feedback, setfeedback] = useState({
    avatar: "",
    name: "",
    username: "",
    text: "",
  });

  const handleaddreview = () => {
    if (!feedback.avatar) {
      toast.error("Please add your image");
      return;
    }

    if (!feedback.name || feedback.name.trim() === "") {
      toast.error("Please add your name");
      return;
    }

    if (!feedback.username || feedback.username.trim() === "") {
      toast.error("Please add your email");
      return;
    }

    if (!feedback.text || feedback.text.trim() === "") {
      toast.error("Please add your feedback");
      return;
    }

    if (feedback.text.trim().length < 10) {
      toast.error("Feedback should be at least 10 characters");
      return;
    }

    if (!feedback.username.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    toast.success("Review added successfully");

    if (feedback.username.includes("@gmail.com")) {
      feedback.username = feedback.username.replace("@gmail.com", "");
      feedback.username = `@${feedback.username}`;
    }

    setReviews([...reviews, feedback]);
    localStorage.setItem("allreviews", JSON.stringify([...reviews, feedback]));

    setfeedback({
      avatar: "",
      name: "",
      username: "",
      text: "",
    });
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-20 pb-12 px-4"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6"
        >
          <div className="flex -space-x-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
            <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold">
              R
            </div>
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
              S
            </div>
            <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">
              N
            </div>
          </div>
          <span className="text-gray-700 font-medium text-sm">
            Trusted by 12,000+ job seekers
          </span>
        </motion.div>

        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          What Our Users Say
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Real stories from professionals who transformed their careers with our
          resume builder
        </p>
      </motion.div>
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-3xl p-6 shadow-lg border-2 border-emerald-100 hover:border-emerald-300 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-emerald-100"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {review.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{review.username}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border-2 border-emerald-100"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Share Your Feedback
            </h2>
            <p className="text-gray-600 text-sm">
              Help us improve by sharing your experience
            </p>
          </div>
          <form className="space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      onChange={() =>
                        setfeedback({ ...feedback, avatar: imagePreview })
                      }
                      alt="Preview"
                      className="w-24 h-24 rounded-full object-cover ring-4 ring-emerald-100 shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transition-colors"
                    >
                      <svg
                        className=" cursor-pointer w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="w-24 h-24 rounded-full bg-emerald-50 border-2 border-dashed border-emerald-300 hover:border-emerald-500 flex flex-col items-center justify-center transition-colors">
                      <svg
                        className="w-8 h-8 text-emerald-500 mb-1"
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
                      <span className="text-xs text-emerald-600 font-medium">
                        Add Photo
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                value={feedback.name}
                onChange={(event) =>
                  setfeedback({ ...feedback, name: event.target.value })
                }
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-gray-900"
              />
              <input
                type="email"
                name="email"
                value={feedback.username}
                onChange={(e) =>
                  setfeedback({ ...feedback, username: e.target.value })
                }
                placeholder="Email Address"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-gray-900"
              />
            </div>
            <textarea
              value={feedback.text}
              onChange={(e) =>
                setfeedback({ ...feedback, text: e.target.value })
              }
              placeholder="Share your thoughts..."
              rows="3"
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all resize-none text-gray-900"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleaddreview}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl shadow-md transition-colors"
            >
              Submit Feedback
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Reviews;
