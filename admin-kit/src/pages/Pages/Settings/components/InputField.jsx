
const InputField = ({ label, placeholder, type = "text", fullWidth = true })=> {
  return (
     <div className={fullWidth ? "w-full" : ""}>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-300"
    />
  </div>
  )
}

export default InputField


