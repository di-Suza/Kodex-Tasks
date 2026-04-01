const StatCard = ({ title, value, subValue, change, icon, color }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <h3 className="text-xl font-bold mt-1">
          {value}{" "}
          <span className="text-gray-400 text-sm font-normal">{subValue}</span>
        </h3>
        {change && (
          <p
            className={`text-xs mt-2 ${change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
          >
            {change} <span className="text-gray-400">Since last week</span>
          </p>
        )}
      </div>
      <div className={`p-2 rounded-full ${color} bg-opacity-10 text-xl`}>
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
