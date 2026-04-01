
import ActivityItem from './ActivityItem';

const ClientDetailPanel = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit sticky top-6">
    <div className="flex justify-between mb-6">
      <h3 className="font-bold text-gray-800">Angelica Ramos</h3>
      <span className="text-gray-400">...</span>
    </div>
    
    <div className="flex gap-4 mb-8">
      <img src="https://i.pravatar.cc/150?u=9" className="w-16 h-16 rounded-full object-cover shadow-sm" alt="profile" />
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase mb-1">About me</p>
        <p className="text-xs text-gray-500 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
      </div>
    </div>

    <div className="space-y-3 mb-8 border-t border-gray-50 pt-4">
      {[
        ['Name', 'Angelica Ramos'],
        ['Company', 'The Wiz'],
        ['Email', 'angelica@ramos.com'],
        ['Phone', '+1234123123123'],
      ].map(([label, val]) => (
        <div key={label} className="flex justify-between text-xs border-b border-gray-50 pb-2">
          <span className="font-bold text-gray-700">{label}</span>
          <span className="text-gray-500">{val}</span>
        </div>
      ))}
      <div className="flex justify-between text-xs pt-1">
        <span className="font-bold text-gray-700">Status</span>
        <span className="bg-emerald-500 text-white text-[9px] px-2 py-0.5 rounded font-bold">ACTIVE</span>
      </div>
    </div>

    <div className="pt-4">
      <p className="text-[11px] font-bold text-gray-400 uppercase mb-4 tracking-wider">Activity</p>
      <ActivityItem title="Signed out" desc="Nam pretium turpis et arcu. Duis arcu tortor, suscipit..." time="30m ago" />
      <ActivityItem title="Created invoice #1204" desc="Sed aliquam ultrices mauris. Integer ante arcu..." time="2h ago" />
      <ActivityItem title="Signed up" desc="Sed aliquam ultrices mauris. Integer ante arcu..." time="2d ago" isLast />
    </div>
  </div>
);

export default ClientDetailPanel