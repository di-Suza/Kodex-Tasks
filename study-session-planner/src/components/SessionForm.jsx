import { useForm } from "react-hook-form";
import { useSession } from "../hook/Session";

const SessionForm = () => {
  const { addSession } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    addSession({ ...data, isComplete: false });
    reset();
  };

  const inputClass =
    "w-full border border-stone-200 rounded-lg px-3.5 py-2.5 text-sm text-stone-800 bg-white placeholder-stone-300 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition";

  const labelClass =
    "block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5";

  const errorClass = "text-xs text-red-400 mt-1";

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
      <div className="mb-5">
        <h2 className="text-base font-bold text-stone-800">
          Add Study Session
        </h2>
        <p className="text-xs text-stone-400 mt-0.5">
          Fill in the details below
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Topic Name */}
        <div>
          <label className={labelClass}>Topic Name</label>
          <input
            type="text"
            placeholder="e.g. Binary Search Trees"
            className={inputClass}
            {...register("topic", { required: "Topic name is required" })}
          />
          {errors.topic && <p className={errorClass}>{errors.topic.message}</p>}
        </div>

        {/* Subject */}
        <div>
          <label className={labelClass}>Subject</label>
          <select
            className={inputClass}
            {...register("subject", { required: "Subject is required" })}
          >
            <option value="">Select subject</option>
            <option value="DSA">DSA</option>
            <option value="Web Dev">Web Dev</option>
            <option value="DBMS">DBMS</option>
            <option value="OS">OS</option>
            <option value="Other">Other</option>
          </select>
          {errors.subject && (
            <p className={errorClass}>{errors.subject.message}</p>
          )}
        </div>

        {/* Duration + Priority in a row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Duration (mins)</label>
            <input
              type="number"
              placeholder="e.g. 60"
              className={inputClass}
              {...register("duration", {
                required: "Required",
                min: { value: 10, message: "Min 10 mins" },
              })}
            />
            {errors.duration && (
              <p className={errorClass}>{errors.duration.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Priority</label>
            <select
              className={inputClass}
              {...register("priority", { required: "Required" })}
            >
              <option value="">Select</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {errors.priority && (
              <p className={errorClass}>{errors.priority.message}</p>
            )}
          </div>
        </div>

        {/* Date */}
        <div>
          <label className={labelClass}>Date</label>
          <input
            type="date"
            className={inputClass}
            {...register("date", { required: "Date is required" })}
          />
          {errors.date && <p className={errorClass}>{errors.date.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-stone-800 hover:bg-stone-700 text-white text-sm font-semibold py-2.5 rounded-lg transition mt-1"
        >
          Add Session
        </button>
      </form>
    </div>
  );
};

export default SessionForm;
