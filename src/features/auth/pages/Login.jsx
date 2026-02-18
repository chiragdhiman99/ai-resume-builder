import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupData } from "../../../app/store/formdata";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function Login() {
  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const formdata = useSelector((state) => state.signupdata);
  console.log(formdata);

  const dispatch = useDispatch();

  const handledata = (data) => {
    if (!data.name || !data.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!data.password || data.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    dispatch(signupData(data));
    navigate("/dashboard");
    toast.success("Login Successful 🚀");
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-cyan-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-16 top-10 h-52 w-52 rounded-full bg-emerald-200/50 blur-3xl sm:h-72 sm:w-72" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-56 w-56 rounded-full bg-cyan-200/50 blur-3xl sm:h-80 sm:w-80" />

      <div className="mx-auto grid w-full max-w-6xl items-center -mt-30 gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="rounded-3xl mt-25 lg:mt-0 border border-emerald-100 bg-white/70 p-8 shadow-[0_20px_60px_-40px_rgba(16,185,129,0.65)] backdrop-blur"
        >
          <p className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700">
            Resume Builder
          </p>
          <h1 className="mt-5 text-4xl font-black leading-tight text-slate-900">
            Welcome back.
            <span className="block bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Continue your career journey.
            </span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            Sign in to edit resumes, track applications, and export ATS-ready
            versions in one place.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4">
              <p className="text-2xl font-extrabold text-emerald-700">50K+</p>
              <p className="text-sm text-slate-600">Resumes created</p>
            </div>
            <div className="rounded-2xl border border-cyan-100 bg-cyan-50/80 p-4">
              <p className="text-2xl font-extrabold text-cyan-700">92%</p>
              <p className="text-sm text-slate-600">Interview callback rate</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
          className="mx-auto mt-10 lg:mt-20 w-full max-w-md rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_-40px_rgba(2,132,199,0.65)] backdrop-blur sm:p-8"
        >
          <div className="mb-7 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">Sign in</h2>
            <p className="mt-2 text-sm text-slate-500">
              Enter your details to access your dashboard
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Name
              </label>
              <input
                type="text"
                value={userdata.name}
                onChange={(e) =>
                  setuserdata({ ...userdata, name: e.target.value })
                }
                placeholder="Enter your Name"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Email address
              </label>
              <input
                type="email"
                value={userdata.email}
                onChange={(e) =>
                  setuserdata({ ...userdata, email: e.target.value })
                }
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Password
              </label>
              <input
                value={userdata.password}
                onChange={(e) =>
                  setuserdata({ ...userdata, password: e.target.value })
                }
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300"
                />
                Remember me
              </label>
              <span className="cursor-pointer font-semibold text-emerald-600 hover:text-emerald-700">
                Forgot password?
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handledata(userdata)}
              type="button"
              className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-18px_rgba(5,150,105,0.9)]"
            >
              Submit
            </motion.button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              or continue with
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ y: -2 }}
              type="button"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
            >
              Google
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              type="button"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
            >
              LinkedIn
            </motion.button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-600">
            New here?{" "}
            <span className="cursor-pointer font-semibold text-emerald-600 hover:text-emerald-700">
              Create account
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Login;
