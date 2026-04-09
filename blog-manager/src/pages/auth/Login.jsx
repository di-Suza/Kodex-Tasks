import { useForm } from "react-hook-form";
import { PenLine } from "lucide-react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const result = login(data.email, data.password);

    if (result.success) {
      navigate("/");
    } else {
      setError("root", {
        type: "manual",
        message: result.message,
      });
    }
  };

  return (
    <div className="bg-(--secondary) border-(--border) flex flex-col gap-6 rounded-xl border p-6 shadow-sm w-full max-w-md">
      <div className="flex justify-center">
        <div className="bg-(--accent) p-3 rounded-full">
          <PenLine className=" text-(--text1)  w-6 h-6" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-2xl text-center font-bold  text-(--text1)  ">
          Welcome Back
        </div>
        <div className="text-gray-400 text-center text-sm">
          Sign in to your account to continue
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
        {errors.root && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-2 rounded text-sm text-center">
            {errors.root.message}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-(--text1)  mb-2">
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="you@example.com"
            className={`w-full px-4 py-1.5  bg-(--input) text-(--text1) border ${errors.email ? "border-red-500" : "border-(--border)"} rounded-lg focus:outline-none focus:border-[#00a884] transition-colors`}
          />
          {errors.email && (
            <span className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium  text-(--text1)  mb-2">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 characters required" },
            })}
            placeholder="Enter your password"
            className={`w-full px-4 py-1.5 bg-(--input) text-(--text1) border ${errors.password ? "border-red-500" : "border-(--border)"} rounded-lg focus:outline-none focus:border-[#00a884] transition-colors`}
          />
          {errors.password && (
            <span className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer py-1.5 bg-(--accent) text-(--text2) font-bold rounded-lg hover:bg-(--accent)/90 transition-all active:scale-[0.98]"
        >
          Sign In
        </button>
      </form>

      <p className="text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <Link
          to="/auth/signup"
          className="cursor-pointer text-(--accent) hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
