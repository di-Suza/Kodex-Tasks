import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    const result = login(data.email, data.password);

    if (result.success) {
      navigate("/");
    } else {
      setError("root", { message: result.message });
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Side - Hero Section (Same as your code) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-gradient-to-br from-gray-900 to-black border-r-1 border-r-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#d4ff00] rounded-xl flex items-center justify-center">
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

        <div className="space-y-8">
          <div>
            <p className="text-[#d4ff00] text-sm font-semibold tracking-wider uppercase mb-4">
              WELCOME BACK
            </p>
            <h1 className="text-5xl font-bold text-white mb-2">
              Shop the future.
            </h1>
            <h1 className="text-5xl font-bold text-[#d4ff00]">Today.</h1>
          </div>
          <p className="text-gray-400 text-lg max-w-md">
            Thousands of products, lightning-fast delivery, and prices that make
            your wallet happy.
          </p>

          <div className="flex gap-4">
            <div className="flex-1 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition">
              <div className="text-2xl font-bold text-[#d4ff00] mb-1">20K+</div>
              <div className="text-gray-500 text-sm">Products</div>
            </div>
               <div className="flex-1 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition">
              <div className="text-2xl font-bold text-[#d4ff00] mb-1">50K+</div>
              <div className="text-gray-500 text-sm">Users</div>
            </div>
               <div className="flex-1 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition">
              <div className="text-2xl font-bold text-[#d4ff00] mb-1">4.9★</div>
              <div className="text-gray-500 text-sm">Rating</div>
            </div>
          </div>
        </div>
        <div></div>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 ">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-2 text-white">Sign in</h2>
            <p className="text-gray-400 mb-8">
              Enter your credentials to continue
            </p>

            {/* Error Message from Context */}
            {errors.root && (
              <p className="text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 text-sm text-center">
                {errors.root.message}
              </p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Input */}
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
                    {...register("email", { required: "Email is required" })}
                    type="email"
                    placeholder="Email address"
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#d4ff00]/50 transition"
                  />
                </div>
                {errors.email && (
                  <span className="text-red-500 text-xs ml-1">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password Input */}
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
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-[#d4ff00]/50 transition"
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
                  <span className="text-red-500 text-xs ml-1">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full cursor-pointer  bg-[#d4ff00] hover:bg-[#c4ef00] text-black font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2 group"
              >
                Sign in
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
                Don't have an account?{" "}
                <Link
                  to="/auth/signup"
                  className="text-[#d4ff00] cursor-pointer hover:underline font-medium"
                >
                  Create one
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
