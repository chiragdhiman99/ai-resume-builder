import "./App.css";
import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import testUser1 from "../assets/features/testimonials/testuser1.jpg";
import testUser2 from "../assets/features/testimonials/testuser2.jpg";
import testUser3 from "../assets/features/testimonials/testuser3.jpg";
import testUser4 from "../assets/features/testimonials/testuser4.jpg";
import testUser5 from "../assets/features/testimonials/testuser5.avif";
import testUser6 from "../assets/features/testimonials/testuser6.avif";
import testUser7 from "../assets/features/testimonials/testuser7.webp";

const Home = lazy(() => import("../features/marketing/pages/Home"));
const Login = lazy(() => import("../features/auth/pages/Login"));
const Resumebuilder = lazy(() => import("../features/resume-builder/pages/Resume-builder"));
const Dashboard = lazy(() => import("../features/dashboard/pages/dashboard"));
const Reviews = lazy(() => import("../features/marketing/pages/Reviews"));
const Contact = lazy(() => import("../features/marketing/pages/Contact"));
const Feature = lazy(() => import("../features/marketing/pages/Feature"));

function App() {
  const userdata = useSelector((state) => state.signupdata);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("allreviews");
    if (savedReviews) return JSON.parse(savedReviews);
    return [
      {
        id: 1,
        name: "Sarah Mitchell",
        username: "@sarahcodes",
        avatar: testUser1,
        text: "This resume builder helped me land my dream job at Google. The AI suggestions were spot on!",
      },
      {
        id: 2,
        name: "Marcus Chen",
        username: "@marcusdesigns",
        avatar: testUser2,
        text: "I got 3 interview calls within a week of updating my resume. The ATS optimization really works!",
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        username: "@emilyintech",
        avatar: testUser3,
        text: "Best resume builder I've used. Clean templates and smart AI content suggestions saved me hours!",
      },
      {
        id: 4,
        name: "David Kim",
        username: "@davidwrites",
        avatar: testUser4,
        text: "Switched careers easily with their role-specific templates. Highly recommend for career changers!",
      },
      {
        id: 5,
        name: "Priya Sharma",
        username: "@priyatalks",
        avatar: testUser5,
        text: "The real-time feedback feature helped me avoid common mistakes. Got hired within 2 weeks!",
      },
      {
        id: 6,
        name: "Alex Thompson",
        username: "@alexbuilds",
        avatar: testUser6,
        text: "Super easy to use and professional results. Finally have a resume I'm proud to send out!",
      },
      {
        id: 7,
        name: "Maya Patel",
        username: "@mayainspires",
        avatar: testUser7,
        text: "Game changer for my job search! The formatting is perfect and recruiters love it.",
      },
    ];
  });

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Features", to: "/features" },
    { label: "Reviews", to: "/Reviews" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <>
      <header className="relative w-full border-b border-emerald-100 bg-white/95 shadow-[0_10px_35px_-25px_rgba(16,185,129,0.65)] backdrop-blur">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="bg-gradient-to-r from-emerald-100 via-lime-100 to-emerald-100 px-4 py-2 text-center text-xs font-semibold tracking-wide text-emerald-900 sm:text-sm"
        >
          <span className="mr-2 rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white sm:text-xs">
            New
          </span>
          AI feature added
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 md:py-2"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="text-3xl font-extrabold leading-none text-slate-900 sm:text-[2.15rem]"
          >
            resume<span className="text-emerald-500">.</span>
          </motion.div>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-white px-2 py-2 text-sm font-medium text-slate-700 shadow-sm md:flex">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                <motion.span
                  whileHover={{ y: -2 }}
                  className="cursor-pointer rounded-full px-4 py-2 transition hover:bg-emerald-50"
                >
                  {link.label}
                </motion.span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {userdata.name ? (
              <>
                <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-2 py-2 text-sm font-medium text-slate-700 shadow-sm">
                  <Link to="/dashboard">
                    <motion.span
                      whileHover={{ y: -2 }}
                      className="cursor-pointer rounded-full px-4 py-1 transition hover:bg-emerald-50"
                    >
                      Dashboard
                    </motion.span>
                  </Link>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full px-5 py-2.5 text-sm font-medium text-slate-700 cursor-pointer sm:px-6 sm:text-base"
                >
                  Hey {"\u{1F44B}"} {userdata.name}
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_20px_-12px_rgba(5,150,105,0.8)] transition sm:px-6 sm:text-base"
                >
                  <Link to="/login">Get started</Link>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 sm:px-6 sm:text-base"
                >
                  <Link to="/login">Sign In</Link>
                </motion.button>
              </>
            )}
          </div>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex md:hidden flex-col justify-center items-center gap-[5px] p-2 rounded-lg hover:bg-emerald-50 transition"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-[2.5px] bg-slate-800 rounded-full origin-center"
            />
            <motion.span
              animate={
                menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.2 }}
              className="block w-6 h-[2.5px] bg-slate-800 rounded-full"
            />
            <motion.span
              animate={
                menuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3 }}
              className="block w-6 h-[2.5px] bg-slate-800 rounded-full origin-center"
            />
          </button>
        </motion.nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/40 "
              style={{ zIndex: 9998 }}
            />

            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col"
              style={{ zIndex: 9999 }}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-emerald-100">
                <span className="text-2xl font-extrabold text-slate-900">
                  resume<span className="text-emerald-500">.</span>
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-emerald-50 transition text-sm font-bold"
                >
                  {"\u2715"}
                </button>
              </div>

              <div className="flex flex-col flex-1 px-6 py-6 gap-6 overflow-y-auto">
                {userdata.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="bg-emerald-50 rounded-2xl px-4 py-4"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-500 mb-1">
                      Welcome back
                    </p>
                    <p className="text-base font-bold text-slate-800">
                      Hey {"\u{1F44B}"} {userdata.name}
                    </p>
                  </motion.div>
                )}

                <div className="flex flex-col gap-1">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2 px-2">
                    Menu
                  </p>
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.07 + i * 0.05 }}
                    >
                      <Link
                        to={link.to}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-emerald-50 hover:text-emerald-700 transition group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 group-hover:bg-emerald-500 transition" />
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="px-6 py-6 border-t border-emerald-100">
                {userdata.name ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(5,150,105,0.7)] transition"
                      >
                        Dashboard {"\u2192"}
                      </motion.button>
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col gap-3"
                  >
                    <Link to="/login" onClick={() => setMenuOpen(false)}>
                      <button className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(5,150,105,0.7)] transition">
                        Get started {"\u2192"}
                      </button>
                    </Link>
                    <Link to="/login" onClick={() => setMenuOpen(false)}>
                      <button className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-emerald-50 transition">
                        Sign In
                      </button>
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Suspense
        fallback={
          <div className="mx-auto w-full max-w-6xl px-4 py-10 text-sm text-slate-500">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={<Home reviews={reviews} setReviews={setReviews} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/resume-builder" element={<Resumebuilder />} />
          <Route
            path="/Reviews"
            element={<Reviews reviews={reviews} setReviews={setReviews} />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/features" element={<Feature />} />
        </Routes>
      </Suspense>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        style={{ marginTop: "100px", marginRight: "20px" }}
      />
    </>
  );
}

export default App;
