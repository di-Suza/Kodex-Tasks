

const StatCard = ({ title, value, change, icon, changeType }) => {
  const isPositive = changeType === 'positive';
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <div className="p-2.5 rounded-full bg-blue-50 text-blue-500 text-lg">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold mt-1 text-gray-900">{value}</h3>
      <div className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full w-fit ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
        <span>{isPositive ? '↑' : '↓'}</span>
        <span>{change}</span>
        <span className="text-gray-400 font-normal">Since last week</span>
      </div>
    </div>
  )
}

export default StatCard

