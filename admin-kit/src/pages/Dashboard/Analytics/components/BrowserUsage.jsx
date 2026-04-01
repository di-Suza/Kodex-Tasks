import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Chrome",  value: 4306, color: "#3b82f6", change: "+12%", pos: true },
  { name: "Firefox", value: 3801, color: "#f59e0b", change: "-3%",  pos: false },
  { name: "Edge",    value: 1689, color: "#ef4444", change: "",      pos: null },
  { name: "Other",   value: 3251, color: "#1f2937", change: "",      pos: null },
];

const BrowserUsage = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Browser Usage</h3>
        <span className="text-gray-400 text-sm cursor-pointer">···</span>
      </div>

      {/* Donut */}
      <div className="flex justify-center mb-4">
        <ResponsiveContainer width={160} height={160}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={72}
              paddingAngle={2}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ fontSize: 11, borderRadius: 6, border: "1px solid #e5e7eb" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-2">
        {data.map((d) => (
          <div key={d.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
              <span className="text-xs text-gray-600">{d.name}</span>
              {d.change && (
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                    d.pos ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
                  }`}
                >
                  {d.change}
                </span>
              )}
            </div>
            <span className="text-xs font-semibold text-gray-700">{d.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowserUsage;