import ChartControls from "./ChartControls";

const TotalRevenue = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1">
      <ChartControls
        title="Total Revenue"
        options={["Jan", "Feb", "Mar", "Apr"]}
      />
      {/* Line Chart Placeholder */}
      <div className="h-72 border border-gray-100 bg-gray-50 rounded-lg flex flex-col justify-center items-center italic text-gray-400">
        <p>[Insert Line Chart here]</p>
        <p className="text-xs">e.g., use Recharts LineChart</p>
      </div>
    </div>
  );
};

export default TotalRevenue;
