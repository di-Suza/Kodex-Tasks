const ContactItem = ({ name, status, avatar, unread, active }) => (
  <div className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${active ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
    <div className="flex items-center gap-3">
      <div className="relative">
        <img src={avatar} className="w-10 h-10 rounded-full object-cover" alt={name} />
        <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${status === 'Online' ? 'bg-green-500' : 'bg-red-400'}`}></div>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-700">{name}</h4>
        <p className="text-[10px] text-gray-400">{status}</p>
      </div>
    </div>
    {unread && (
      <span className="bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
        {unread}
      </span>
    )}
  </div>
);

export default ContactItem