const TeamSection = () => {
  const values = [
    {
      title: "Trust",
      desc: "Every product is verified for quality and authenticity before listing.",
      icon: "🛡️",
    },
    {
      title: "Speed",
      desc: "We obsess over delivery times so your orders arrive when promised.",
      icon: "⚡",
    },
    {
      title: "Community",
      desc: "Built around real customer feedback, not just business metrics.",
      icon: "💖",
    },
    {
      title: "Quality",
      desc: "We curate the best — no filler, no junk, just great products.",
      icon: "⭐",
    },
  ];

  const team = [
    {
      name: "Aryan Shah",
      role: "Founder & CEO",
      initial: "A",
      color: "bg-[#d4ff00] text-black",
    },
    {
      name: "Priya Mehta",
      role: "Head of Product",
      initial: "P",
      color: "bg-blue-500 text-white",
    },
    {
      name: "Rohan Verma",
      role: "Lead Engineer",
      initial: "R",
      color: "bg-purple-500 text-white",
    },
    {
      name: "Sneha Kapoor",
      role: "Design Director",
      initial: "S",
      color: "bg-red-500 text-white",
    },
  ];

  return (
    <div className="bg-black text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-2xl font-bold mb-10">
          What We Stand For
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
          {values.map((v, i) => (
            <div
              key={i}
              className="border border-gray-800 rounded-2xl p-6 bg-[#0a0a0a] flex gap-4"
            >
              <div className="text-[#d4ff00] mt-1">{v.icon}</div>
              <div>
                <h3 className="font-bold text-lg">{v.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-center text-2xl font-bold mb-10">Meet the Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {team.map((t, i) => (
            <div
              key={i}
              className="border border-gray-800 rounded-2xl p-8 flex flex-col items-center bg-[#0a0a0a]"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl mb-4 ${t.color}`}
              >
                {t.initial}
              </div>
              <h3 className="font-bold text-sm">{t.name}</h3>
              <p className="text-gray-500 text-[10px] mt-1">{t.role}</p>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className="border border-gray-900 rounded-[2rem] p-12 bg-[#050505] text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl font-bold">Ready to shop?</h2>
          <p className="text-gray-500">
            Explore thousands of products at unbeatable prices.
          </p>
          <button className="bg-[#d4ff00] text-black px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition">
            Browse Products <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default TeamSection;
