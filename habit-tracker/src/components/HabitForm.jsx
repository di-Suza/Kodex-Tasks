import { useForm } from "react-hook-form";
import { useHabit } from "../context/HabitContext";

const HabitForm = () => {
  const { addHabit } = useHabit();

  const { register, handleSubmit, reset } = useForm();

  const onCommit = (values) => {
    const payload = {
      ...values,
      completed: false,
    };

    
    addHabit(payload);
    reset();
  };



  return (
    <form
      onSubmit={handleSubmit(onCommit)}
      className="bg-white p-6 w-full max-w-sm"
    >
      <h2 className="text-lg font-bold text-gray-800 mb-5">Add Habit</h2>

      {/* Habit Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Habit Name
        </label>
        <input
          required
          {...register("name")}
          type="text"
          placeholder="e.g. Morning Exercise"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-indigo-400"
        />
      </div>

      {/* Daily Goal + Unit */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Daily Goal
          </label>
          <input
            required
            {...register("goalValue")}
            type="number"
            placeholder="30"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-indigo-400"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unit
          </label>
          <select
            {...register("unit")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-indigo-400"
          >
            <option>Minutes</option>
            <option>Pages</option>
            <option>Reps</option>
            <option>Liters</option>
          </select>
        </div>
      </div>

      {/* Start Date + Category */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            {...register("startDate")}
            type="date"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-indigo-400"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            {...register("category")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-indigo-400"
          >
            <option>Mindset</option>
            <option>Health</option>
            <option>Focus</option>
            <option>Growth</option>
          </select>
        </div>
      </div>

      {/* Motivation */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Motivation
        </label>
        <textarea
          {...register("motivation")}
          placeholder="Why is this important to you?"
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-indigo-400 resize-none"
        />
      </div>

      {/* Priority Level */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Priority Level
        </label>
        <div className="flex items-center gap-6">
          {["Low", "Medium", "High"].map((level) => (
            <label
              key={level}
              className="flex items-center gap-1.5 cursor-pointer text-sm text-gray-600"
            >
              <input
                {...register("priority")}
                type="radio"
                value={level}
                defaultChecked={level === "Medium"}
                className="accent-indigo-600"
              />
              {level}
            </label>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition text-sm"
      >
        Create Habit
      </button>
    </form>
  );
};

export default HabitForm;
