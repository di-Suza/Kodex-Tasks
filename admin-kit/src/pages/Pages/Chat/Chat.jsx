import React from 'react'
import ChatWindow from './components/ChatWindow';
import ContactItem from './components/ContactItem';

const Chat = () => {
 return (
    <div className="p-8 bg-[#F4F7F6] min-h-screen">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
        <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">Pro Component ↗</span>
      </div>

      <div className="flex h-[750px] rounded-xl shadow-sm border border-gray-100 overflow-hidden bg-white">
        {/* Sidebar */}
        <div className="w-80 border-r flex flex-col">
          <div className="p-4 border-b">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-gray-50 border rounded-md px-3 py-2 text-sm outline-none focus:border-blue-300" 
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            <ContactItem name="Vanessa Tucker" status="Online" unread="5" avatar="https://i.pravatar.cc/150?u=1" />
            <ContactItem name="William Harris" status="Online" unread="2" avatar="https://i.pravatar.cc/150?u=2" active />
            <ContactItem name="Sharon Lessman" status="Online" avatar="https://i.pravatar.cc/150?u=3" />
            <ContactItem name="Christina Mason" status="Offline" avatar="https://i.pravatar.cc/150?u=4" />
          </div>
        </div>

        {/* Chat Area */}
        <ChatWindow/>
      </div>
    </div>
  );
}

export default Chat