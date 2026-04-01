const ChartControls = ({ title, options, currentFilter }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h3 className="font-bold text-gray-900">{title}</h3>
      <div className="flex gap-2">
        <div className="relative">
          <select className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium pr-7 text-gray-700 focus:ring-0 focus:border-gray-300">
            {options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[8px]">
            ▼
          </span>
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-600 placeholder:text-gray-300 focus:ring-0 focus:border-gray-300"
        />
      </div>
    </div>
  );
};

export default ChartControls;
