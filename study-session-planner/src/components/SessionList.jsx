import { useState } from "react";
import { useSession } from "../hook/Session";
import SessionCard from "./SessionCard";

const SessionList = () => {
  const { sessions } = useSession();

  // filter by completed
  const filters = ["All", "Active", "Completed"];
  const [SelectedFilter, setSelectedFilter] = useState("All");

  const sessionsWithFilter =
    SelectedFilter === "Active"
      ? sessions.filter((s) => !s.isComplete)
      : SelectedFilter === "Completed"
        ? sessions.filter((s) => s.isComplete)
        : sessions;
  // total duration
  const totalMins = sessionsWithFilter.reduce(
    (sum, s) => sum + Number(s.duration),
    0,
  );
  const hrs = Math.floor(totalMins / 60);
  const mins = totalMins % 60;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className=" w-full flex justify-between">
          <div>
            <h2 className="text-base font-bold text-stone-800">Sessions</h2>
            <p className="text-xs text-stone-400 mt-0.5">
              {sessionsWithFilter.length} session
              {sessionsWithFilter.length !== 1 ? "s" : ""}
              {sessionsWithFilter.length > 0 && (
                <>
                  {" "}
                  &middot; {hrs > 0 ? `${hrs}h ` : ""}
                  {mins}m total
                </>
              )}
            </p>
          </div>
          <div className="flex">
            {filters.map((btn) => (
              <div
                key={btn}
                onClick={() => setSelectedFilter(btn)}
                className={`${SelectedFilter === btn && "bg-stone-800 text-white"} cursor-pointer mt-3 w-fit text-xs text-stone-400 hover:text-stone-400 border px-2 border-stone-200 py-1.5 transition`}
              >
                {btn}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Empty state */}
      {sessionsWithFilter.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-stone-100 rounded-2xl">
          <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center mb-3">
            <svg
              className="w-5 h-5 text-stone-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-stone-400">No sessions yet</p>
          <p className="text-xs text-stone-300 mt-1">
            Add your first study session
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {sessionsWithFilter.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SessionList;
