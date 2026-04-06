import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  // Password matching ke liye watch use kiya hai
  const password = watch("password");
  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }

    const result = registerUser({
      name: data.fullName,
      email: data.email,
      password: data.password,
    });

    if (result.success) {
      // No alert, no extra login step. Seedha home page!
      navigate("/");
    } else {
      setError("root", { message: result.message });
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-10 p-8">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#d4ff00] rounded-2xl flex items-center justify-center">
          <svg
            className="w-7 h-7 text-black"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M13 2L3 14h8l-2 8 10-12h-8l2-8z" />
          </svg>
        </div>
        <span className="text-2xl font-semibold text-white">
          Sky<span className="font-bold">Mart</span>
        </span>
      </div>

      {/* Sign Up Form */}
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl text-white font-bold mb-2">Create account</h2>
          <p className="text-gray-400 mb-8">Join SkyMart and start shopping</p>

          {errors.root && (
            <p className="text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 text-xs text-center">
              {errors.root.message}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
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
                <input
                  {...register("fullName", { required: "Name is required" })}
                  type="text"
                  placeholder="Full name"
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4ff00]/50 transition"
                />
              </div>
              {errors.fullName && (
                <span className="text-red-500 text-xs mt-1 ml-1">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
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
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                  })}
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4ff00]/50 transition"
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-xs mt-1 ml-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Min 6 characters required",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password (min 6 chars)"
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-xl py-4 pl-12 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4ff00]/50 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer  right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs mt-1 ml-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <input
                  {...register("confirmPassword", {
                    required: "Confirm your password",
                  })}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-xl py-4 pl-12 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4ff00]/50 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute cursor-pointer  right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs mt-1 ml-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer  bg-[#d4ff00] hover:bg-[#c4ef00] text-black font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2 group"
            >
              Create Account
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>

            <p className="text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-[#d4ff00] cursor-pointer  hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
