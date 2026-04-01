import ProjectCard from "./components/ProjectCard";

const Projects = () => {
const projects = [
    {
      title: "Landing page redesign",
      status: "Finished",
      description: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
      progress: 100,
      avatars: ["https://i.pravatar.cc/150?u=1", "https://i.pravatar.cc/150?u=2", "https://i.pravatar.cc/150?u=3"]
    },
    {
      title: "Company posters",
      status: "In progress",
      description: "Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa.",
      progress: 75,
      avatars: ["https://i.pravatar.cc/150?u=1", "https://i.pravatar.cc/150?u=4", "https://i.pravatar.cc/150?u=3"]
    },
    {
      title: "Product page design",
      status: "Finished",
      description: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
      progress: 100,
      avatars: ["https://i.pravatar.cc/150?u=1", "https://i.pravatar.cc/150?u=2", "https://i.pravatar.cc/150?u=3"]
    },
    {
      title: "Upgrade CRM software",
      status: "In progress",
      description: "Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris.",
      progress: 50,
      avatars: ["https://i.pravatar.cc/150?u=1", "https://i.pravatar.cc/150?u=2", "https://i.pravatar.cc/150?u=5"]
    }
  ];

  return (
    <div className="p-8 bg-[#F4F7F6] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
          <a href="#" className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
            Pro Component <span className="text-[8px]">↗</span>
          </a>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition shadow-sm">
          <span className="text-lg">+</span> New project
        </button>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
}

export default Projects


