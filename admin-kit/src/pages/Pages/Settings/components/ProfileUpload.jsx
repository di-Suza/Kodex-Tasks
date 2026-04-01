

const ProfileUpload = () => {
  return (
      <div className="flex flex-col items-center gap-3">
    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-50 shadow-sm">
      <img src="https://via.placeholder.com/150" alt="Profile" className="w-full h-full object-cover" />
    </div>
    <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-blue-700">
      <span>↑</span> Upload
    </button>
    <p className="text-[10px] text-gray-400 text-center max-w-[150px]">
      For best results, use an image at least 128px by 128px in .jpg format
    </p>
  </div>
  )
}

export default ProfileUpload


