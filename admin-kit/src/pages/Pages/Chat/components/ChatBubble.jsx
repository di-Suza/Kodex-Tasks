const ChatBubble = ({ message, time, isMe, avatar, name }) => (
  <div className={`flex gap-3 mb-6 ${isMe ? 'flex-row-reverse' : ''}`}>
    <div className="flex flex-col items-center">
      <img src={avatar} className="w-9 h-9 rounded-full object-cover shadow-sm" alt="profile" />
      <span className="text-[10px] text-gray-400 mt-1 font-medium">{time}</span>
    </div>
    <div className="max-w-[70%]">
      {!isMe && <p className="text-[11px] font-bold text-gray-700 mb-1">{name}</p>}
      <div className={`p-4 rounded-lg text-sm shadow-sm ${
        isMe ? 'bg-blue-50 text-gray-700 rounded-tr-none' : 'bg-gray-50 text-gray-600 rounded-tl-none'
      }`}>
        {message}
      </div>
    </div>
  </div>
);
export default ChatBubble