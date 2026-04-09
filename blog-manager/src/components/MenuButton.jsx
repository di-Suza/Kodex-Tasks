
const MenuButton = ({ icon: Icon, label, onClick, isDelete }) => (
  <button
    onClick={onClick}
    className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left ${
      isDelete
        ? "text-red-500 hover:bg-(--accent) dark:hover:bg-red-500/10"
        : "text-(--text1) hover:bg-(--accent) hover:text-(--text2)"
    }`}
  >
    <Icon size={16} className={isDelete ? "text-red-400" : "text-gray-400"} />
    {label}
  </button>
);

export default MenuButton