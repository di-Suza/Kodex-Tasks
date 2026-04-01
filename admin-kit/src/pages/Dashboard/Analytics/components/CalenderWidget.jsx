import { useState } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const CalendarWidget = () => {
  const today = new Date();
  const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const firstDay = new Date(current.year, current.month, 1).getDay();
  const daysInMonth = new Date(current.year, current.month + 1, 0).getDate();
  const daysInPrev = new Date(current.year, current.month, 0).getDate();

  const prev = () => setCurrent(c => c.month === 0 ? { year: c.year - 1, month: 11 } : { ...c, month: c.month - 1 });
  const next = () => setCurrent(c => c.month === 11 ? { year: c.year + 1, month: 0 } : { ...c, month: c.month + 1 });

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push({ day: daysInPrev - firstDay + 1 + i, outside: true });
  for (let i = 1; i <= daysInMonth; i++) cells.push({ day: i, outside: false });
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) cells.push({ day: i, outside: true });

  const isToday = (d, outside) =>
    !outside &&
    d === today.getDate() &&
    current.month === today.getMonth() &&
    current.year === today.getFullYear();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Calendar</h3>
        <span className="text-gray-400 text-sm cursor-pointer">···</span>
      </div>

      {/* Month nav */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={prev} className="text-gray-400 hover:text-gray-600 text-sm px-1">‹</button>
        <span className="text-sm font-semibold text-gray-700">
          {MONTHS[current.month]} {current.year}
        </span>
        <button onClick={next} className="text-gray-400 hover:text-gray-600 text-sm px-1">›</button>
      </div>

      {/* Days header */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[11px] font-semibold text-gray-400 py-1">{d}</div>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7">
        {cells.map((cell, i) => (
          <div
            key={i}
            className={`text-center text-xs py-1.5 rounded-full mx-auto w-7 cursor-pointer transition
              ${cell.outside ? "text-gray-300" : "text-gray-600 hover:bg-gray-100"}
              ${isToday(cell.day, cell.outside) ? "!bg-blue-500 !text-white font-bold hover:!bg-blue-600" : ""}
            `}
          >
            {cell.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarWidget;