const projects = [
  { name: "Project Apollo",  type: "Web, UI/UX Design", company: "Lechters",                   industry: "Real Estate",    author: "Vanessa Tucker", stack: "HTML, JS, React", progress: 65, color: "#3b82f6", icon: "🌸" },
  { name: "Project Bongo",   type: "Web",               company: "Cellophane Transportation",  industry: "Transportation", author: "William Harris", stack: "HTML, JS, Vue",   progress: 33, color: "#ef4444", icon: "🌿" },
  { name: "Project Canary",  type: "Web, UI/UX Design", company: "Clemens",                    industry: "Insurance",      author: "Sharon Lessman", stack: "HTML, JS, Laravel",progress: 50, color: "#f59e0b", icon: "⬛" },
  { name: "Project Edison",  type: "UI/UX Design",      company: "Affinity Investment Group",  industry: "Finance",        author: "Vanessa Tucker", stack: "HTML, JS, React", progress: 80, color: "#10b981", icon: "🔴" },
  { name: "Project Indigo",  type: "Web, UI/UX Design", company: "Konsili",                    industry: "Retail",         author: "Christina Mason",stack: "HTML, JS, Vue",   progress: 78, color: "#3b82f6", icon: "🔵" },
];

const progressColor = (p) => {
  if (p >= 70) return "bg-green-400";
  if (p >= 45) return "bg-yellow-400";
  return "bg-red-400";
};

const LatestProjects = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Latest Projects</h3>
        <span className="text-gray-400 text-sm cursor-pointer">···</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {["Name", "Company", "Author", "Status", "Action"].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-gray-400 pb-3 pr-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.name} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                {/* Name */}
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-sm">
                      {p.icon}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-blue-600">{p.name}</p>
                      <p className="text-[11px] text-gray-400">{p.type}</p>
                    </div>
                  </div>
                </td>

                {/* Company */}
                <td className="py-3 pr-4">
                  <p className="text-xs font-medium text-gray-700">{p.company}</p>
                  <p className="text-[11px] text-gray-400">{p.industry}</p>
                </td>

                {/* Author */}
                <td className="py-3 pr-4">
                  <p className="text-xs font-medium text-gray-700">{p.author}</p>
                  <p className="text-[11px] text-gray-400">{p.stack}</p>
                </td>

                {/* Progress */}
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5 w-20">
                      <div
                        className={`h-1.5 rounded-full ${progressColor(p.progress)}`}
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-gray-500">{p.progress}%</span>
                  </div>
                </td>

                {/* Action */}
                <td className="py-3">
                  <button className="text-xs border border-gray-200 text-gray-600 px-3 py-1 rounded hover:bg-gray-50 transition">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestProjects;