import ActionButtons from "./ActionButtons";
import StatusBadge from "./StatusBadge";

const OrderRow = ({ id, name, date, total, status, method }) => (
  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
    <td className="py-4 px-4 text-xs font-bold text-gray-700">#{id}</td>
    <td className="py-4 px-4 text-sm text-gray-600">{name}</td>
    <td className="py-4 px-4 text-sm text-gray-500 font-mono">{date}</td>
    <td className="py-4 px-4 text-sm text-gray-600 font-medium">${total}</td>
    <td className="py-4 px-4"><StatusBadge status={status} /></td>
    <td className="py-4 px-4">
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span className="opacity-60">💳</span> {method}
      </div>
    </td>
    <td className="py-4 px-4"><ActionButtons /></td>
  </tr>
);

export default OrderRow