import { useForm } from "react-hook-form";
import { PenLine } from "lucide-react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { role: "reader" },
  });

  const selectedRole = watch("role");

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const result = signup(data.name, data.email, data.password, data.role);
    if (result.success) {
      navigate("/");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-(--secondary) border border-(--border) rounded-2xl shadow-2xl text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-(--accent) p-3 rounded-full">
          <PenLine className="text-(--text2) w-6 h-6" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-(--text1) mb-2">
        Create an Account
      </h2>
      <p className="text-gray-400 text-sm mb-6">
        Join Inkwell to start reading or writing
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
        <div>
          <label className="block text-sm font-medium text-(--text1) mb-1.5">
            Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="John Doe"
            className="w-full px-4 py-1.5 bg-(--input) border border-(--border) rounded-lg text-(--text1) focus:outline-none focus:border-(--accent)"
          />
          {errors.name && (
            <p className="text-red-500 text-[10px] mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-(--text1) mb-1.5">
            Email
          </label>
          <input
            {...register("email", { required: "Email is required" })}
            placeholder="you@example.com"
            className="w-full px-4 py-1.5 bg-(--input) border border-(--border) rounded-lg text-(--text1) focus:outline-none focus:border-(--accent)"
          />
          {errors.email && (
            <p className="text-red-500 text-[10px] mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-(--text1) mb-1.5">
            Password
          </label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            placeholder="Create password"
            className="w-full px-4 py-1.5 bg-(--input) border border-(--border) rounded-lg text-(--text1) focus:outline-none focus:border-(--accent)"
          />
          {errors.password && (
            <p className="text-red-500 text-[10px] mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-(--text1) mb-1.5">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword", { required: true })}
            placeholder="Confirm password"
            className="w-full px-4 py-1.5 bg-(--input) border border-(--border) rounded-lg text-(--text1) focus:outline-none focus:border-(--accent)"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-[10px] mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-(--text1) mb-3">
            Account Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => setValue("role", "reader")}
              className={`cursor-pointer p-3 rounded-lg border transition-all ${
                selectedRole === "reader"
                  ? "border-(--accent) bg-(--accent)/10"
                  : "border-(--border) bg-transparent"
              }`}
            >
              <h4 className="text-(--text1) text-center font-semibold text-sm">
                Reader
              </h4>
              <p className="text-gray-500 text-[10px] text-center">
                Read articles
              </p>
            </div>

            <div
              onClick={() => setValue("role", "writer")}
              className={`cursor-pointer p-3 rounded-lg border transition-all ${
                selectedRole === "writer"
                  ? "border-(--accent) bg-(--accent)/10"
                  : "border-(--border) bg-transparent"
              }`}
            >
              <h4 className="text-(--text1) text-center font-semibold text-sm">
                Author
              </h4>
              <p className="text-gray-500 text-[10px] text-center">
                Write & publish
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-1.5 mt-2 cursor-pointer  bg-(--accent) text-(--text2) font-bold rounded-lg hover:opacity-90 transition-all"
        >
          Create Account
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-400">
        Already have an account?{" "}
        <Link to="/auth/login" className=" cursor-pointer text-(--accent) hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Signup;
