const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0 bg-[#0d0d0d] py-10 mt-10 border-t border-gray-900">
      <div className="flex flex-col items-center justify-center gap-2">
        {/* SkyMart Text */}
        <h2 className="text-[#d4ff00] text-xl font-bold tracking-tight">
          SkyMart
        </h2>
        
        {/* Copyright & Tech Stack */}
        <p className="text-gray-500 text-[11px] font-medium">
          © 2025 SkyMart • Built with React + Context Api
        </p>
      </div>
    </footer>
  );
};

export default Footer;