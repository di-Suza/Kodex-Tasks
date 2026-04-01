import React from 'react'
import OrderRow from './components/OrderRow';

const Orders = () => {
 const orders = [
    { id: "0001", name: "Brian Smith", date: "2023-12-04", total: "353.00", status: "Paid", method: "Mastercard" },
    { id: "0002", name: "Patrick Babcock", date: "2023-12-05", total: "939.00", status: "Chargeback", method: "Visa" },
    // ... baki data map se aa jayega
  ];

  return (
    <div className="p-8 bg-[#F4F7F6] min-h-screen font-sans">
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">Pro Component ↗</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Controls */}
        <div className="p-5 flex justify-between items-center border-b border-gray-50">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            Show 
            <select className="border rounded px-2 py-1 bg-gray-50 outline-none focus:border-blue-300">
              <option>10</option>
            </select>
            entries
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            Search: 
            <input type="text" className="border rounded px-3 py-1 outline-none focus:border-blue-300" />
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-left">
          <thead className="bg-white text-[11px] uppercase font-bold text-gray-400 border-b border-gray-50">
            <tr>
              <th className="py-4 px-4">#</th>
              <th className="py-4 px-4">Billing Name</th>
              <th className="py-4 px-4">Date</th>
              <th className="py-4 px-4">Total</th>
              <th className="py-4 px-4">Payment Status</th>
              <th className="py-4 px-4">Payment Method</th>
              <th className="py-4 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => <OrderRow key={order.id} {...order} />)}
          </tbody>
        </table>

        {/* Footer / Pagination */}
        <div className="p-5 flex justify-between items-center bg-white">
          <p className="text-xs text-gray-400">Showing 1 to 10 of 15 entries</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 border rounded text-xs text-gray-400 hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-bold">1</button>
            <button className="px-3 py-1 border rounded text-xs text-gray-600 hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border rounded text-xs text-gray-600 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders