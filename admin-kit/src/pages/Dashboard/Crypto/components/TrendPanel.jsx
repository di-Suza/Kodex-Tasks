

const TrendPanel = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-center mb-6">
      <h3 className="font-bold">Operations</h3>
      <div className="flex bg-blue-900 rounded p-1">
        <button className="bg-blue-600 text-white px-3 py-1 text-xs rounded shadow">Buy</button>
        <button className="text-white px-3 py-1 text-xs">Sell</button>
        <button className="text-white px-3 py-1 text-xs">Send</button>
      </div>
    </div>
    <div className="space-y-4">
      <div>
        <label className="text-xs text-gray-400 block mb-1">Amount</label>
        <div className="flex border rounded px-3 py-2 bg-gray-50">
          <input type="text" className="bg-transparent w-full text-sm outline-none" defaultValue="0.25" />
          <span className="text-xs text-gray-500">BTC</span>
        </div>
      </div>
      <div>
        <label className="text-xs text-gray-400 block mb-1">Price</label>
        <div className="flex border rounded px-3 py-2 bg-gray-50">
          <input type="text" className="bg-transparent w-full text-sm outline-none" defaultValue="23,077.05" />
          <span className="text-xs text-gray-500">$</span>
        </div>
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold text-sm transition mt-2">
        Process to wallet
      </button>
    </div>
  </div>
  )
}

export default TrendPanel


