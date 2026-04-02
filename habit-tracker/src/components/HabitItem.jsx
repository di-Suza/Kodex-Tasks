import { useState } from "react";
import { useHabit } from "../context/HabitContext";
const priorityColor = {
  Low: "bg-green-100 text-green-600",
  Medium: "bg-orange-100 text-orange-500",
  High: "bg-red-100 text-red-500",
};
const HabitItem = ({ habit }) => {
  const { toggleHabit, deleteHabit, updateHabit, getStreak } = useHabit();

  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(habit);

  const today = new Date().toISOString().split("T")[0];
  const isDoneToday = habit.completedDates?.includes(today) ?? false;

  const handleSave = () => {
    updateHabit(habit.id, editData);
    setEditing(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-3 shadow-sm">
      {editing ? (
        /* ── EDIT MODE ── */
        <div>
          <p className="text-xs font-semibold text-indigo-500 tracking-widest mb-3">
            EDIT HABIT
          </p>

          {/* Name input */}
          <input
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            className="w-full border border-indigo-400 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 mb-3"
          />

          {/* Priority + Category row */}
          <div className="flex gap-3 mb-4">
            <select
              value={editData.priority}
              onChange={(e) =>
                setEditData({ ...editData, priority: e.target.value })
              }
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-indigo-400"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
            <select
              value={editData.category}
              onChange={(e) =>
                setEditData({ ...editData, category: e.target.value })
              }
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-indigo-400"
            >
              <option>Focus</option>
              <option>Mindset</option>
              <option>Health</option>
              <option>Growth</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-sm transition"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-5 py-2.5 border border-gray-300 text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        /* ── VIEW MODE ── */
        <div>
          {/* Top row — badges + streak */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-indigo-500 tracking-widest">
                {habit.category?.toUpperCase() || "FOCUS"}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${priorityColor[habit.priority] || priorityColor.Low}`}
              >
                {habit.priority || "Low"}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800">
                {getStreak(habit.completedDates)}{" "}
                <span className="text-indigo-400">^^</span>
              </p>
              <p className="text-[10px] text-gray-400 font-semibold tracking-widest">
                STREAK
              </p>
            </div>
          </div>

          {/* Habit name */}
          <h3 className="text-lg font-bold text-gray-900 mb-2">{habit.name}</h3>

          {/* Motivation */}
          {habit.motivation && (
            <p className="text-sm text-gray-400 border border-gray-100 rounded-lg px-3 py-2 mb-3 bg-gray-50">
              {habit.motivation}
            </p>
          )}

          {/* Goal + actions */}
          <div className="flex items-center justify-between mt-1">
            <div>
              <p className="text-[10px] font-semibold text-gray-400 tracking-widest">
                GOAL
              </p>
              <p className="text-sm font-semibold text-gray-700">
                {habit.goalValue} {habit.unit || "pages"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setEditing(true)}
                className="text-sm font-medium text-gray-500 hover:text-gray-800 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteHabit(habit.id)}
                className="text-sm font-medium text-gray-500 hover:text-red-500 transition"
              >
                Delete
              </button>
              <button
                onClick={() => toggleHabit(habit.id)}
                className={`${isDoneToday ? "bg-gray-500 hover:bg-gray-600" : "bg-indigo-600 hover:bg-indigo-700"} text-white text-sm font-semibold px-5 py-2 rounded-xl transition`}
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitItem;
