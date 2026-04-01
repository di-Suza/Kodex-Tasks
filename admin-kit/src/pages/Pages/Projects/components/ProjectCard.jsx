
const ProjectCard = ({ title, status, description, progress, avatars }) => {
  const isFinished = status === "Finished";
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-gray-700 text-base">{title}</h3>
        <button className="text-gray-400 hover:text-gray-600">•••</button>
      </div>

      {/* Status Badge */}
      <div className="mb-4">
        <span
          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
            isFinished ? "bg-emerald-500 text-white" : "bg-amber-400 text-white"
          }`}
        >
          {status}
        </span>
      </div>

      <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-grow">
        {description}
      </p>

      {/* Avatars Stack */}
      <div className="flex -space-x-2 mb-6">
        {avatars.map((src, i) => (
          <img
            key={i}
            src={src}
            className="w-8 h-8 rounded-full border-2 border-white object-cover"
            alt="team"
          />
        ))}
      </div>

      {/* Progress Section */}
      <div className="mt-auto">
        <div className="flex justify-between text-xs font-medium text-gray-500 mb-2">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};


export default ProjectCard