const Toast = ({ message }) => {
  return (
    <div className="fixed bottom-5 right-5 z-[9999] animate-in fade-in slide-in-from-right-full duration-700 ease-out">
      <div className="flex items-center gap-3 bg-[#1a1a1a] text-white px-5 py-2.5 rounded-full border border-[#333] shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
        <span className="text-sm font-medium whitespace-nowrap">{message}</span>
      </div>
    </div>
  );
};
export default Toast;
