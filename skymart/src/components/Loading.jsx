

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center gap-5 transition-opacity duration-300">
      {/* Container for Loader and Logo */}
      <div className="relative flex items-center justify-center">
        {/* Outer Spinning Ring - Theme Color (Lime Green) */}
        <div className="w-20 h-20 rounded-full border-4 border-t-[#d4ff00] border-r-transparent border-b-[#d4ff00]/10 border-l-transparent animate-spin"></div>

        {/* Inner Static Logo/Icon - Fits perfectly inside the ring */}
        <div className="absolute w-12 h-12 bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-[#d4ff00] text-2xl font-black italic tracking-tighter">
            S
          </span>
        </div>
      </div>

      {/* Loading Text */}
      <div className="text-center mt-2">
        <p className="text-white text-lg font-bold tracking-tight">
          Loading<span className="animate-pulse">...</span>
        </p>
        <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest">
          Fetching data
        </p>
      </div>
    </div>
  );
};

export default Loading;
