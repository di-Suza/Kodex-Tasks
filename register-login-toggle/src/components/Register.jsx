const Register = ({ onSwitch }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
      <div className="text-center mb-7">
        <h1 className="text-3xl font-bold text-gray-900">Create account</h1>
        <p className="text-sm text-gray-400 mt-1">Join us today</p>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-800">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-800">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-800">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition"
          />
        </div>

        <button className="bg-gray-900 cursor-pointer  text-white rounded-xl py-3 text-sm font-semibold hover:bg-gray-700 transition mt-1">
          Sign up
        </button>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <span
            onClick={onSwitch}
            className="font-bold text-gray-900 cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
