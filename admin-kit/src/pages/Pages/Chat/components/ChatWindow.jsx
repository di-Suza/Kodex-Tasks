import ChatBubble from "./ChatBubble";

const ChatWindow = () => (
  <div className="flex-1 flex flex-col bg-white">
    {/* Header */}
    <div className="p-4 border-b flex justify-between items-center">
      <div className="flex flex-col">
        <h3 className="font-bold text-gray-800 text-sm">Sharon Lessman</h3>
        <span className="text-[10px] text-gray-400 italic">Typing...</span>
      </div>
      <div className="flex gap-2">
        <button className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">📞</button>
        <button className="bg-cyan-500 text-white p-2 rounded-md hover:bg-cyan-600">📹</button>
        <button className="text-gray-400 border p-2 rounded-md hover:bg-gray-50">•••</button>
      </div>
    </div>

    {/* Messages Area */}
    <div className="flex-1 overflow-y-auto p-6 bg-white custom-scrollbar">
      <ChatBubble 
        name="Sharon Lessman" 
        time="2:37 am" 
        message="Cras pulvinar, sapien id vehicula aliquet, diam velit elementum orci." 
        avatar="https://i.pravatar.cc/150?u=sharon"
      />
      <ChatBubble 
        isMe 
        time="2:38 am" 
        message="Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix." 
        avatar="https://i.pravatar.cc/150?u=me"
      />
    </div>

    {/* Input Area */}
    <div className="p-4 border-t">
      <div className="flex gap-2 border rounded-lg p-1">
        <input 
          type="text" 
          placeholder="Type your message" 
          className="flex-1 px-3 py-2 text-sm outline-none bg-transparent" 
        />
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-bold hover:bg-blue-700">
          Send
        </button>
      </div>
    </div>
  </div>
);
export default ChatWindow