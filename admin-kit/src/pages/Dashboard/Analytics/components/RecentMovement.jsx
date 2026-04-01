import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", value: 2100 },
  { month: "Feb", value: 1750 },
  { month: "Mar", value: 1900 },
  { month: "Apr", value: 2000 },
  { month: "May", value: 2050 },
  { month: "Jun", value: 2300 },
  { month: "Jul", value: 2700 },
  { month: "Aug", value: 2600 },
  { month: "Sep", value: 3100 },
  { month: "Oct", value: 3300 },
  { month: "Nov", value: 3000 },
  { month: "Dec", value: 3250 },
];

const RecentMovement = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Recent Movement</h3>
        <div className="flex items-center gap-2">
          <select className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600 bg-white outline-none">
            <option>Jan</option><option>Feb</option><option>Mar</option>
          </select>
          <input
            type="text"
            placeholder="Search..."
            className="text-xs border border-gray-200 rounded px-2 py-1 outline-none text-gray-600 placeholder-gray-300 w-24"
          />
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid #e5e7eb" }}
            itemStyle={{ color: "#3b82f6" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#colorVal)"
            dot={{ r: 3, fill: "#3b82f6", strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RecentMovement;