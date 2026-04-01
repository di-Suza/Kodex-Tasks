
const MarketList = () => {
  const coins = [
    { name: "ETH", price: "0.02309756", vol: "427.563", change: "+1.91" },
    { name: "XRP", price: "0.00002205", vol: "132.691", change: "+0.64" },
    { name: "XRP", price: "0.00002205", vol: "132.691", change: "+0.64" },
    { name: "XRP", price: "0.00002205", vol: "132.691", change: "+0.64" },
    { name: "XRP", price: "0.00002205", vol: "132.691", change: "+0.64" },
  ];
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-full">
      <div className="flex justify-between mb-4">
        <h3 className="font-bold">Markets</h3>
        <span className="text-gray-400">...</span>
      </div>
      <table className="w-full text-xs text-left">
        <thead>
          <tr className="text-gray-400 border-b border-gray-50">
            <th className="pb-2">Coin</th>
            <th className="pb-2 text-right">Price</th>
            <th className="pb-2 text-right">Change</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, i) => (
            <tr key={i} className="border-b border-gray-50 last:border-0">
              <td className="py-3 font-medium">{coin.name}</td>
              <td className="py-3 text-right text-gray-600">{coin.price}</td>
              <td
                className={`py-3 text-right ${coin.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
              >
                {coin.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketList;
