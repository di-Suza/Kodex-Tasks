const StatCard = ({ title, value, change, positive, icon }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <span className="text-sm text-gray-500 font-medium">{title}</span>
        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-base">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900 tracking-tight">{value}</p>
      <div className="flex items-center gap-2">
        <span
          className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
            positive
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-500"
          }`}
        >
          {change}
        </span>
        <span className="text-xs text-gray-400">Since last week</span>
      </div>
    </div>
  );
};

export default StatCard;