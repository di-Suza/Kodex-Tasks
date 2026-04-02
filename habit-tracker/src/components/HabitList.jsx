import { useHabit } from "../context/HabitContext";
import HabitItem from "./HabitItem";

const HabitList = () => {
  const { habits, showAll } = useHabit();

  const today = new Date().toISOString().split("T")[0];

  const completedToday = habits.filter((h) =>
    h.completedDates.includes(today),
  ).length;

  const progressPercent =
    habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;

  const topCategory = habits.reduce((acc, h) => {
    if (!h.category) return acc;
    acc[h.category] = (acc[h.category] || 0) + 1;
    return acc;
  }, {});

  const mainFocus =
    Object.keys(topCategory).length > 0
      ? Object.keys(topCategory).reduce((a, b) =>
          topCategory[a] < topCategory[b] ? a : b,
        )
      : "None";

  if (habits.length === 0) {
    return null;
  }

  const visibleHabits = showAll ? habits : habits.slice(0, 3);

  return (
    <>
      <div className="max-w-md mx-auto mt-6 px-4 pb-20 ">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-4 w-full">
          {/* Top */}
          <div className="flex items-start justify-between mb-1">
            <div>
              <p className="text-xs font-semibold text-gray-400 tracking-widest mb-1">
                DAILY PROGRESS
              </p>
              <h2 className="text-xl font-bold text-gray-900">
                {habits.length !== completedToday
                  ? `Keep going!`
                  : `All caught up!!`}
              </h2>
            </div>
            <p className="text-sm text-gray-400 font-medium mt-1">
              {completedToday} / {habits.length}
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-100 rounded-full h-1.5 my-4">
            <div
              className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent || 0}%` }}
            />
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-0.5">
                FOCUS
              </p>
              <p className="text-sm font-semibold text-gray-700">
                {mainFocus || "Focus"}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-0.5">
                PRIORITY
              </p>
              <p className="text-sm font-semibold text-gray-700">
                {habits.filter((h) => h.priority === "High").length} High Tasks
              </p>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between mt-6 my-3">
          <h3 class="text-xs font-bold uppercase text-slate-500">
            Your Routine
          </h3>
        </div>
        <div className="space-y-3">
          {visibleHabits.map((habit) => (
            <HabitItem key={habit.id} habit={habit} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HabitList;
