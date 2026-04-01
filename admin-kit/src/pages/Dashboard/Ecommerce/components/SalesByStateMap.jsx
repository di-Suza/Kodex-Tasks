
import ChartControls from './ChartControls';

const SalesByStateMap = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full md:w-[350px]">
    <ChartControls title="Sales by State" options={['Jan', 'Feb', 'Mar']} />
    {/* Map Chart Placeholder */}
    <div className="h-72 border border-gray-100 bg-gray-50 rounded-lg flex flex-col justify-center items-center italic text-gray-400 relative">
      <p>[Insert US Map here]</p>
      <p className="text-xs">e.g., use react-usa-map-chart</p>
      {/* Zoom controls */}
      <div className="absolute top-2 left-2 flex flex-col gap-1">
        <button className="bg-white border text-gray-500 rounded p-1 text-xs font-bold">+</button>
        <button className="bg-white border text-gray-500 rounded p-1 text-xs font-bold">-</button>
      </div>
    </div>
  </div>
  )
}

export default SalesByStateMap
