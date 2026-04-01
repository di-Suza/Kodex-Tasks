import BrowserUsage from "./components/BrowserUsage";
import CalendarWidget from "./components/CalenderWidget";
import LatestProjects from "./components/LatestProjects";
import MonthlySales from "./components/MonthlySales";
import RealTimeMap from "./components/RealtimeMap";
import RecentMovement from "./components/RecentMovement";
import StatCard from "./components/StatCard";




const stats = [
  { title: "Sales",    value: "2.382",   change: "-3.65%", positive: false, icon: "🚚" },
  { title: "Earnings", value: "$21.300", change: "+6.65%", positive: true,  icon: "💲" },
  { title: "Visitors", value: "14.212",  change: "+5.25%", positive: true,  icon: "👥" },
  { title: "Orders",   value: "64",      change: "-2.25%", positive: false, icon: "🛒" },
];
const Analytics = () => {
  return (
    <>
    
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      {/* Page title */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">
          <span className="font-normal">Analytics</span> Dashboard
        </h1>
        <div className="flex items-center gap-3">
          <button className="text-sm border border-gray-200 text-gray-600 px-4 py-2 rounded-md hover:bg-white transition bg-white">
            Invite a Friend
          </button>
          <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition font-medium">
            New Project
          </button>
        </div>
      </div>
 
      {/* Row 1 — Stat cards + Recent Movement */}
      <div className="grid grid-cols-12 gap-4 mb-4">
        {/* Stat cards 2x2 */}
        <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <StatCard key={s.title} {...s} />
          ))}
        </div>
 
        {/* Recent Movement chart */}
        <div className="col-span-12 lg:col-span-8">
          <RecentMovement />
        </div>
      </div>
 
      {/* Row 2 — Calendar + RealTime Map + Browser Usage */}
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-12 md:col-span-4 lg:col-span-3">
          <CalendarWidget />
        </div>
        <div className="col-span-12 md:col-span-8 lg:col-span-6">
          <RealTimeMap />
        </div>
        <div className="col-span-12 md:col-span-12 lg:col-span-3">
          <BrowserUsage />
        </div>
      </div>
 
      {/* Row 3 — Latest Projects + Monthly Sales */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8">
          <LatestProjects />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <MonthlySales />
        </div>
      </div>
    </div>
    </>
  )
}

export default Analytics