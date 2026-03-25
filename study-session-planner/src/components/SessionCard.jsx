import { useSession } from "../hook/Session";

const priorityConfig = {
  High: { color: "text-red-600", bg: "bg-red-60", border: "border-red-100" },
  Medium: {
    color: "text-orange-600",
    bg: "bg-orange-60",
    border: "border-orange-100",
  },
  Low: {
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
  },
};

const SessionCard = ({ session }) => {
  const { deleteSession, toggleComplete } = useSession();
  const p = priorityConfig[session.priority] || priorityConfig.Low;

  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition group">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="text-sm font-bold text-stone-800 leading-tight">
            {session.topic}
          </h3>
          <p className="text-xs text-stone-400 mt-0.5">{session.subject}</p>
        </div>
        {/* Priority badge */}
        <span
          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${p.color} ${p.bg} ${p.border} shrink-0`}
        >
          {session.priority}
        </span>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-3 text-xs text-stone-400">
        <span className="flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
            />
          </svg>
          {session.duration} mins
        </span>
        <span className="flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {session.date}
        </span>
      </div>

      {/* Delete */}
      <div className="flex w-full justify-around">
        <button
          onClick={() => deleteSession(session.id)}
          className=" cursor-pointer mt-3 w-fit text-xs text-stone-400 hover:text-red-400 hover:bg-red-50 border px-2 border-red-200 py-1.5 rounded-lg transition"
        >
          Delete
        </button>
        <button
          onClick={() => toggleComplete(session.id)}
          className={`cursor-pointer ${session.isComplete ? "border-gray-200" : "hover:text-green-400 border-green-200 hover:bg-green-50"} mt-3 w-fit text-xs text-stone-400  border px-2  py-1.5 rounded-lg transition`}
        >
          {session.isComplete ? "Completed!" : "Mark as Completed!"}
        </button>
      </div>
    </div>
  );
};

export default SessionCard;
