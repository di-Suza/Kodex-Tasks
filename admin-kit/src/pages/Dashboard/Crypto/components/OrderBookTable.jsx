
const OrderBookTable = ({ title, data, type }) => {
  return (
   <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1">
    <div className="flex justify-between mb-4">
      <h3 className="font-bold text-sm">{title}</h3>
      <button className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded">View all</button>
    </div>
    <table className="w-full text-[10px] text-left">
      <thead className="text-gray-400 uppercase">
        <tr>
          <th>Price</th>
          <th className="text-right">BTC</th>
          <th className="text-right">Sum(BTC)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="hover:bg-gray-50 cursor-pointer">
            <td className="py-1.5 text-gray-600 font-mono">{row.price}</td>
            <td className="py-1.5 text-right font-mono">{row.btc}</td>
            <td className="py-1.5 text-right font-mono">{row.sum}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default OrderBookTable
