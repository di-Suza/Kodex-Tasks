import PricingCard from "./components/PricingCard";


const Pricing = () => {
 return (
    <div className="bg-[#F8FAFC] min-h-screen p-8 font-sans">
      {/* Header */}
      <div className="flex items-center gap-2 mb-12">
        <h1 className="text-xl font-bold text-gray-800">Plans & Pricing</h1>
        <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">Pro Component ↗</span>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">We have a plan for everyone</h2>
        <p className="text-gray-500 text-sm max-w-2xl mx-auto">
          Whether you're a business or an individual, 14-day trial no credit card required.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-16">
        <div className="bg-white border rounded-md p-0.5 flex shadow-sm">
          <button className="bg-blue-600 text-white px-6 py-2 text-xs font-bold rounded-l-[4px]">Monthly billing</button>
          <button className="text-blue-600 px-6 py-2 text-xs font-bold hover:bg-gray-50">Annual billing</button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        <PricingCard
          plan="Free" 
          price="0" 
          features={["1 users", "5 projects", "5 GB storage"]} 
          buttonText="Sign up" 
        />
        
        <PricingCard 
          plan="Standard" 
          price="19" 
          isFeatured={true}
          features={["5 users", "50 projects", "50 GB storage", "Security policy", "Weekly backups"]} 
          buttonText="Try it for free" 
        />

        <PricingCard 
          plan="Plus" 
          price="39" 
          features={["Unlimited users", "Unlimited projects", "250 GB storage", "Priority support", "Security policy", "Daily backups", "Custom CSS"]} 
          buttonText="Try it for free" 
        />
      </div>

      {/* Bottom Divider */}
      <div className="mt-20 border-t border-gray-200 w-full max-w-7xl mx-auto"></div>
    </div>
  );
}

export default Pricing