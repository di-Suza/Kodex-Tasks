
const ClientRow = ({ id, name, company, email, status, avatar }) => {
 const statusColors = {
    Active: 'bg-emerald-500',
    Deleted: 'bg-red-500',
    Inactive: 'bg-amber-500'
  };

  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
      <td className="py-3 px-4 text-gray-500 text-xs">#{id}</td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <img src={avatar} className="w-7 h-7 rounded-full object-cover" alt={name} />
          <span className="text-sm font-medium text-gray-700">{name}</span>
        </div>
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">{company}</td>
      <td className="py-3 px-4 text-sm text-gray-600">{email}</td>
      <td className="py-3 px-4">
        <span className={`${statusColors[status]} text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase`}>
          {status}
        </span>
      </td>
    </tr>
  );}

export default ClientRow