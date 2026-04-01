const PricingCard = ({ plan, price, features, buttonText, isFeatured }) => (
  <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center w-full max-w-sm transition-transform hover:scale-[1.02]">
    <p className="text-gray-500 font-medium text-sm mb-4">{plan}</p>
    
    <div className="flex items-start justify-center mb-8">
      <span className="text-4xl font-bold mt-2 text-gray-800">$</span>
      <span className="text-7xl font-bold text-gray-800">{price}</span>
      {price !== "0" && <span className="text-gray-400 text-lg mt-10 ml-1">/mo</span>}
    </div>

    <div className="w-full space-y-3 mb-12">
      <p className="text-gray-800 font-bold text-sm mb-4">Includes:</p>
      {features.map((feature, i) => (
        <p key={i} className="text-gray-500 text-sm">{feature}</p>
      ))}
    </div>

    <button 
      className={`mt-auto px-10 py-2.5 rounded-md font-medium text-sm transition-all ${
        isFeatured 
        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200' 
        : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
      }`}
    >
      {buttonText}
    </button>
  </div>
);
export default PricingCard