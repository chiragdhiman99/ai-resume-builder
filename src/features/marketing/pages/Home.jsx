import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { link } from "framer-motion/client";
import { useSelector } from "react-redux";
import user1Image from "../../../assets/features/user1.avif";
import user2Image from "../../../assets/features/user2.webp";

function Home({ reviews, setReviews }) {
  const [text] = useTypewriter({
    words: [
      "a remote job.",
      "an internship.",
      "a freelance gig.",
      "a dream job.",
    ],
    loop: true,
    typeSpeed: 85,
    deleteSpeed: 50,
    delaySpeed: 1400,
  });

  const useref = useRef(null);
  const userdata = useSelector((state) => state.signupdata);

  const { scrollYProgress } = useScroll({
    target: useref,
    offset: ["start end", "end start"],
  });

  const leftside = useTransform(scrollYProgress, [0, 1], [-100, 50]);
  const rightside = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1.5]);

  const navigate = useNavigate();

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white px-4 pb-20 pt-14 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -left-28 top-10 h-64 w-64 rounded-full bg-emerald-200/50 blur-3xl sm:h-80 sm:w-80" />
        <div className="pointer-events-none absolute -right-24 top-32 h-64 w-64 rounded-full bg-cyan-100/60 blur-3xl sm:h-80 sm:w-80" />

        <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8 flex items-center gap-3 rounded-full border border-emerald-100 bg-white/90 px-4 py-2 shadow-[0_16px_35px_-24px_rgba(16,185,129,0.8)] backdrop-blur"
          >
            <div className="flex -space-x-2">
              <span className="grid h-8 w-8 place-content-center rounded-full border-2 border-white bg-gradient-to-br from-emerald-300 to-emerald-500 text-xs font-bold text-white">
                A
              </span>
              <span className="grid h-8 w-8 place-content-center rounded-full border-2 border-white bg-gradient-to-br from-cyan-300 to-cyan-500 text-xs font-bold text-white">
                R
              </span>
              <span className="grid h-8 w-8 place-content-center rounded-full border-2 border-white bg-gradient-to-br from-sky-300 to-indigo-500 text-xs font-bold text-white">
                S
              </span>
              <span className="grid h-8 w-8 place-content-center rounded-full border-2 border-white bg-gradient-to-br from-violet-300 to-violet-500 text-xs font-bold text-white">
                N
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-700">
              <span className="text-emerald-600">Trusted by 12,000+</span> job
              seekers
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-4xl"
          >
            Build a standout resume with
            <span className="block bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent">
              AI guidance that gets
            </span>
            <span className=" bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent">
              {text}
            </span>
            <Cursor />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-md"
          >
            Craft, optimize, and export polished resumes in minutes with smart
            suggestions, ATS-friendly formatting, and role-specific content
            help.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
            className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          >
            {userdata.name ? (
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-3 text-base font-semibold text-white shadow-[0_18px_30px_-20px_rgba(5,150,105,0.95)] sm:w-auto"
                >
                  Start Building
                </motion.button>
              </Link>
            ) : (
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-3 text-base font-semibold text-white shadow-[0_18px_30px_-20px_rgba(5,150,105,0.95)] sm:w-auto"
                onClick={() => navigate("/login")}
              >
                Start Building
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-2xl border border-slate-300 bg-white px-8 py-3 text-base font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 sm:w-auto"
            >
              Watch Preview
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
            className="mt-16 w-full max-w-5xl rounded-2xl border border-emerald-100 bg-white/90 px-5 py-6 shadow-[0_20px_40px_-30px_rgba(2,132,199,0.45)] backdrop-blur"
          >
            <p className="text-sm font-medium text-slate-500">
              Trusted by teams at
            </p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100/80 px-3 py-2.5 text-slate-500">
                <img
                  src="https://cdn.simpleicons.org/framer/94a3b8"
                  alt="Framer Motion logo"
                  className="h-4 w-4"
                />
                <span className="text-sm font-semibold">Framer Motion</span>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100/80 px-3 py-2.5 text-slate-500">
                <img
                  src="https://cdn.simpleicons.org/airbnb/94a3b8"
                  alt="Airbnb logo"
                  className="h-4 w-4"
                />
                <span className="text-sm font-semibold">Airbnb</span>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100/80 px-3 py-2.5 text-slate-500">
                <span
                  className="grid h-4 w-4 grid-cols-2 grid-rows-2 gap-[2px]"
                  aria-label="Microsoft logo"
                >
                  <span className="rounded-[1px] bg-slate-400" />
                  <span className="rounded-[1px] bg-slate-400" />
                  <span className="rounded-[1px] bg-slate-400" />
                  <span className="rounded-[1px] bg-slate-400" />
                </span>
                <span className="text-sm font-semibold">Microsoft</span>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100/80 px-3 py-2.5 text-slate-500">
                <img
                  src="https://cdn.simpleicons.org/spotify/94a3b8"
                  alt="Spotify logo"
                  className="h-4 w-4"
                />
                <span className="text-sm font-semibold">Spotify</span>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100/80 px-3 py-2.5 text-slate-500">
                <img
                  src="https://cdn.simpleicons.org/stripe/94a3b8"
                  alt="Stripe logo"
                  className="h-4 w-4"
                />
                <span className="text-sm font-semibold">Stripe</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <div
        className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 py-16 px-4 sm:px-6 lg:px-8"
        ref={useref}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 mb-6 shadow-sm">
              <svg
                className="w-4 h-4 text-emerald-600"
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
              <span className="text-sm font-semibold text-emerald-700 tracking-wide">
                Simple Process
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Build your{" "}
              <span className="text-emerald-600 relative inline-block">
                resume
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,7 Q50,0 100,7 T200,7"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    className="text-emerald-300"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our streamlined process helps you create a professional resume in
              minutes with intelligent AI-powered tools and features.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center overflow-hidden">
            <motion.div
              style={{
                x: leftside,
                opacity: opacity,
              }}
              className="relative h-[500px] lg:h-[600px] order-2 lg:order-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-green-200 rounded-3xl opacity-20 blur-3xl"></div>
              <div className="relative h-full flex items-center justify-center">
                <motion.div className="absolute top-20 left-0 w-3/5 h-2/5   ">
                  <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white">
                    <img
                      src={user1Image}
                      alt="Professional workspace"
                      className="w-full h-full object-cover "
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent"></div>
                  </div>
                </motion.div>
                <motion.div className="absolute bottom-0 right-0 w-4/5 h-1/2 sm:w-3/4 sm:h-2/5 lg:w-3/5 lg:h-2/5 sm:bottom-0 sm:right-0 animate-slide-up-delay-2">
                  <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white">
                    <img
                      src={user2Image}
                      alt="Resume building"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent"></div>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-white rounded-full shadow-lg border border-emerald-100 animate-float z-10"
                  style={{ opacity: opacity }}
                >
                  <p className="text-sm font-semibold text-emerald-600">
                    ✨ AI-Powered
                  </p>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              className="space-y-6 order-1 lg:order-2"
              style={{ x: rightside, opacity: opacity }}
            >
              <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 animate-slide-in-delay-1">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-7 h-7 text-violet-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Real-Time Analytics
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Get instant insights into your finances with live
                      dashboards.
                    </p>
                  </div>
                </div>
              </div>
              <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 animate-slide-in-delay-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-7 h-7 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Bank-Grade Security
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      End-to-end encryption, 2FA, compliance with GDPR
                      standards.
                    </p>
                  </div>
                </div>
              </div>
              <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 animate-slide-in-delay-3">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-7 h-7 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                      />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Customizable Reports
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Export professional, audit-ready financial reports for tax
                      or internal review.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-100/80 border-2 border-emerald-200 mb-8">
              <div className="w-5 h-5 bg-emerald-500 rounded flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm font-bold text-emerald-700 tracking-wide">
                Testimonials
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              Don't just take our{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                words
              </span>
            </h2>

            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Hear what our users say about us. We're always looking for ways to
              improve. If you have a positive experience with us, leave a
              review.
            </p>
          </div>
          <div className="overflow-hidden pb-8">
            <div className="flex gap-6">
              <motion.div
                animate={{ x: [0, -2800] }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }}
                className="flex gap-6 flex-shrink-0"
              >
                {reviews.map((testimonial, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-3xl p-8 border-2 border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 w-[350px] flex-shrink-0"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover ring-4 ring-emerald-100 group-hover:ring-emerald-200 transition-all duration-300"
                        />
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium">
                          {testimonial.username}
                        </p>
                      </div>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {testimonial.text}
                    </p>
                  </div>
                ))}
              </motion.div>
              <motion.div
                animate={{ x: [0, -2800] }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }}
                className="flex gap-6 flex-shrink-0"
              >
                {reviews.map((testimonial, index) => (
                  <div
                    key={`duplicate-${index}`}
                    className="group bg-white rounded-3xl p-8 border-2 border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 w-[350px] flex-shrink-0"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover ring-4 ring-emerald-100 group-hover:ring-emerald-200 transition-all duration-300"
                        />
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium">
                          {testimonial.username}
                        </p>
                      </div>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {testimonial.text}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <footer className="relative overflow-hidden border-t border-emerald-100 bg-gradient-to-r from-slate-50 via-emerald-50/60 to-slate-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-emerald-200/50 blur-3xl" />

        <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:col-span-1"
          >
            <h3 className="text-4xl font-extrabold tracking-tight text-slate-900">
              resume<span className="text-emerald-500">.</span>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Build interview-ready resumes with clean templates and AI
              guidance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
          >
            <h4 className="text-lg font-bold text-slate-900">Product</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="hover:text-emerald-600 transition-colors cursor-pointer">
                Builder
              </li>
              <li className="hover:text-emerald-600 transition-colors cursor-pointer">
                Templates
              </li>
              <li className="hover:text-emerald-600 transition-colors cursor-pointer">
                ATS Check
              </li>
              <li className="hover:text-emerald-600 transition-colors cursor-pointer">
                Pricing
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
          >
            <h4 className="text-lg font-bold text-slate-900">Resources</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="hover:text-emerald-600 transition-colors cursor-pointer">
                Blog
              </li>
              <li className="hover:text-emerald-600 transition-colors cursor-pointer">
                Career Tips
              </li>
              <li className="hover:text-emerald-600 transition-colors cursor-pointer">
                Help Center
              </li>
              <li className="hover:text-emerald-600 transition-colors cursor-pointer">
                Community
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
          >
            <h4 className="text-lg font-bold text-slate-900">Legal</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="hover:text-emerald-600 transition-colors cursor-pointer">
                Privacy
              </li>
              <li className="hover:text-emerald-600 transition-colors cursor-pointer">
                Terms
              </li>
              <li className="hover:text-emerald-600 transition-colors cursor-pointer">
                Security
              </li>
              <li className="hover:text-emerald-600 transition-colors cursor-pointer">
                Cookies
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
            className="lg:pl-2"
          >
            <p className="max-w-xs text-sm leading-relaxed text-slate-600">
              Designed to help every candidate feel confident, no matter where
              they start.
            </p>

            <div className="mt-5 flex items-center gap-2">
              <span className="grid h-8 w-8 place-content-center rounded-full border border-slate-300 text-slate-500">
                in
              </span>
              <span className="grid h-8 w-8 place-content-center rounded-full border border-slate-300 text-slate-500">
                X
              </span>
              <span className="grid h-8 w-8 place-content-center rounded-full border border-slate-300 text-slate-500">
                ig
              </span>
              <span className="grid h-8 w-8 place-content-center rounded-full border border-slate-300 text-slate-500">
                yt
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.25 }}
          className="mx-auto mt-10 flex w-full max-w-7xl flex-col items-center justify-between gap-3 border-t border-slate-200 pt-5 text-sm text-slate-500 sm:flex-row"
        >
          <p>© 2026 Resume Builder. All rights reserved.</p>
          <p>Made for modern job seekers.</p>
        </motion.div>
      </footer>
    </>
  );
}

export default Home;
