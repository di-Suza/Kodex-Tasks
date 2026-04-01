

const ActivityItem = ({ title, desc, time, isLast }) => (
  <div className="flex gap-4 relative">
    {!isLast && <div className="absolute left-[7px] top-5 w-[1px] h-full bg-gray-200"></div>}
    <div className="z-10 w-3.5 h-3.5 rounded-full border-2 border-blue-500 bg-white mt-1"></div>
    <div className="flex-1 pb-6">
      <div className="flex justify-between items-start mb-1">
        <h4 className="text-sm font-bold text-gray-800">{title}</h4>
        <span className="text-[10px] text-gray-400 font-medium">{time}</span>
      </div>
      <p className="text-xs text-gray-500 leading-tight">{desc}</p>
    </div>
  </div>
);

export default ActivityItem