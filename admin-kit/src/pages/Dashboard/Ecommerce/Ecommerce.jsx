import StatCard from "./components/StatCard";
import RevenueLineChart from "./components/RevenueLineChart";
import SalesByStateMap from "./components/SalesByStateMap";


const Ecommerce = () => {
  return (
     <div className="bg-[#F8FAFC] min-h-screen p-6 font-sans text-gray-800">
      {/* Header Area */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">E-Commerce <span className="font-light">Dashboard</span></h1>
        <div className="flex gap-3">
          <button className="text-blue-600 text-sm font-medium px-4 py-2 hover:text-blue-700 transition">Invite a Friend</button>
          <button className="bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition">New Project</button>
        </div>
      </div>

      {/* Top Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard title="Income" value="$47.482" change="+3.65%" changeType="positive" icon="$" />
        <StatCard title="Orders" value="2.542" change="-5.25%" changeType="negative" icon="🛒" />
        <StatCard title="Activity" value="16.300" change="+4.65%" changeType="positive" icon="📈" />
        <StatCard title="Revenue" value="$20.120" change="+2.35%" changeType="positive" icon="💳" />
      </div>

      {/* Main Charts Area */}
      <div className="flex flex-col md:flex-row gap-6">
        <RevenueLineChart />
        <SalesByStateMap />
      </div>
    </div>
  )
}

export default Ecommerce

