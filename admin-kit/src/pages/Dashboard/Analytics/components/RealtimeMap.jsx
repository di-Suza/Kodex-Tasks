const dots = [
  { x: "18%", y: "45%" }, // North America west
  { x: "23%", y: "40%" }, // North America east
  { x: "25%", y: "42%" },
  { x: "50%", y: "35%" }, // Europe/Middle East
  { x: "55%", y: "38%" },
  { x: "48%", y: "40%" },
  { x: "62%", y: "42%" }, // South Asia
  { x: "72%", y: "38%" }, // East Asia
  { x: "74%", y: "45%" },
  { x: "65%", y: "55%" }, // Southeast Asia
  { x: "56%", y: "60%" }, // Africa
  { x: "32%", y: "60%" }, // South America
];

const RealTimeMap = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Real-Time</h3>
        <span className="text-gray-400 text-sm cursor-pointer">···</span>
      </div>

      <div className="relative w-full" style={{ paddingBottom: "50%" }}>
        {/* World map SVG background */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 1000 500" className="w-full h-full opacity-20">
            {/* Simplified world map continents */}
            {/* North America */}
            <ellipse cx="200" cy="180" rx="120" ry="100" fill="#94a3b8" />
            <ellipse cx="170" cy="270" rx="60" ry="80" fill="#94a3b8" />
            {/* South America */}
            <ellipse cx="280" cy="360" rx="70" ry="100" fill="#94a3b8" />
            {/* Europe */}
            <ellipse cx="490" cy="150" rx="70" ry="60" fill="#94a3b8" />
            {/* Africa */}
            <ellipse cx="500" cy="310" rx="90" ry="120" fill="#94a3b8" />
            {/* Asia */}
            <ellipse cx="680" cy="180" rx="180" ry="110" fill="#94a3b8" />
            {/* Australia */}
            <ellipse cx="780" cy="370" rx="70" ry="50" fill="#94a3b8" />
          </svg>
        </div>

        {/* Zoom buttons */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          <button className="w-6 h-6 bg-white border border-gray-200 rounded text-gray-600 text-sm hover:bg-gray-50 flex items-center justify-center">+</button>
          <button className="w-6 h-6 bg-white border border-gray-200 rounded text-gray-600 text-sm hover:bg-gray-50 flex items-center justify-center">−</button>
        </div>

        {/* Dots */}
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 z-10"
            style={{ left: dot.x, top: dot.y, transform: "translate(-50%, -50%)" }}
          >
            <span className="absolute inset-0 rounded-full bg-blue-500 opacity-30 animate-ping" />
            <span className="relative block w-full h-full rounded-full bg-blue-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealTimeMap;