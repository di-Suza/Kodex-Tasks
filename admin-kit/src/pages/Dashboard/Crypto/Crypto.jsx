import StatCard from "./components/StatCard";
import OrderBookTable from "./components/OrderBookTable";
import MarketList from "./components/MarketList";
import TradePanel from "./components/TrendPanel";

const Crypto = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen p-6 font-sans text-gray-800">
      {/* Header Area */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Crypto <span className="font-light">Dashboard</span></h1>
        <div className="flex gap-3">
          <button className="text-blue-600 text-sm font-medium px-4 py-2">Invite a Friend</button>
          <button className="bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-lg">New Project</button>
        </div>
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total balance" value="$53,252" subValue="2.30 BTC" change="+6.15%" color="bg-blue-500" icon="S" />
        <StatCard title="USD/BTC" value="$23,077.05" subValue="€22,617.47" color="bg-orange-400" icon="B" />
        <StatCard title="LTC/BTC" value="0.00256" subValue="$59.02" color="bg-blue-800" icon="Ł" />
        <StatCard title="XMR/BTC" value="0.006854" subValue="$157.68" color="bg-orange-600" icon="M" />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left & Center: Chart & Tables */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          {/* Chart Placeholder */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 h-80 flex flex-col justify-center items-center italic text-gray-400">
            [Insert Candlestick Chart Component Here]
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <OrderBookTable title="Sell Orders" data={[{price:'0.03892501', btc:'1.2486', sum:'1.2632'}]} />
            <OrderBookTable title="Buy Orders" data={[{price:'0.03892000', btc:'0.0087', sum:'0.0087'}]} />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <MarketList />
          <TradePanel />
        </div>
      </div>
    </div>
  )
}

export default Crypto


