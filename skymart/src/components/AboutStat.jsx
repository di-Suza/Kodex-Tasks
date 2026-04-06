

const AboutSection = () => {
  const stats = [
    { 
      label: "Products", 
      value: "20K+", 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    { 
      label: "Happy Customers", 
      value: "50K+", 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      label: "Avg. Rating", 
      value: "4.9", 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )
    },
    { 
      label: "On-time Delivery", 
      value: "99%", 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      )
    },
  ];

  return (
    <div className="bg-black text-white  px-4">
      <div className="max-w-6xl mx-auto">
        {/* Logo and Heading */}
        <div className="flex flex-col items-center mb-16">
          {/* Logo */}
          <div className="w-16 h-16 bg-[#d4ff00] rounded-3xl flex items-center justify-center mb-6">
            <svg className="w-9 h-9 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 2L3 14h8l-2 8 10-12h-8l2-8z"/>
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
            About <span className="text-[#d4ff00]">SkyMart</span>
          </h1>

          {/* Subheading */}
          <p className="text-gray-400 text-center max-w-2xl text-lg">
            SkyMart is a next-generation e-commerce platform built to make online shopping fast, fair, and enjoyable — for everyone.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="border border-gray-800 rounded-3xl p-8 flex flex-col items-center justify-center bg-[#0a0a0a] hover:border-gray-700 transition-colors"
            >
              <div className="text-[#d4ff00] mb-3">
                {stat.icon}
              </div>
              <h2 className="text-4xl font-bold mb-1">{stat.value}</h2>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Our Story Box */}
        <div className="border border-gray-800 rounded-3xl p-10 lg:p-12 bg-[#0a0a0a]">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-5 text-gray-400 leading-relaxed">
            <p>
              SkyMart started in 2022 as a small side project — two engineers tired of bloated, slow e-commerce experiences. We asked ourselves: what if shopping online was actually{" "}
              <span className="italic text-gray-300">enjoyable</span>?
            </p>
            <p>
              Three years later, SkyMart serves over 50,000 customers across the country. We stock electronics, fashion, jewelry, and everyday essentials — all at prices that don't require a second mortgage.
            </p>
            <p>
              We're still the same team at heart: obsessed with speed, transparency, and making you feel good about every purchase you make here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;