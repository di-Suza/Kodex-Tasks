import ClientRow from "./components/ClientRow";
import ClientDetailPanel from "./components/ClientDetailPanel";
const Clients = () => {
  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          Clients
        </h1>
        <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">
          Pro Component ↗
        </span>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Table Section */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 text-sm">Clients</h3>
            <span className="text-gray-400">...</span>
          </div>
          <table className="w-full text-left">
            <thead className="bg-white text-[11px] uppercase font-bold text-gray-400 border-b border-gray-50">
              <tr>
                <th className="py-4 px-4">#</th>
                <th className="py-4 px-4">Name</th>
                <th className="py-4 px-4">Company</th>
                <th className="py-4 px-4">Email</th>
                <th className="py-4 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              <ClientRow
                id="1"
                name="Garrett Winters"
                company="Good Guys"
                email="garrett@winters.com"
                status="Active"
                avatar="https://i.pravatar.cc/150?u=1"
              />
              <ClientRow
                id="2"
                name="Ashton Cox"
                company="Levitz Furniture"
                email="ashton@cox.com"
                status="Active"
                avatar="https://i.pravatar.cc/150?u=2"
              />
              <ClientRow
                id="3"
                name="Sonya Frost"
                company="Child World"
                email="sonya@frost.com"
                status="Deleted"
                avatar="https://i.pravatar.cc/150?u=3"
              />
              {/* Map more rows here */}
            </tbody>
          </table>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-12 lg:col-span-4">
          <ClientDetailPanel />
        </div>
      </div>
    </div>
  );
};
export default Clients;
