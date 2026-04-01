

const SettingsSideBar = ({ activeItem = 'Account' }) => {
   const menuItems = [
    'Account', 'Password', 'Privacy and safety', 
    'Email notifications', 'Web notifications', 
    'Widgets', 'Your data', 'Delete account'
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden w-64 shrink-0">
      <div className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Profile Settings
      </div>
      <nav>
        {menuItems.map((item) => (
          <button
            key={item}
            className={`w-full text-left px-4 py-3 text-sm transition-colors ${
              activeItem === item 
                ? 'bg-blue-600 text-white font-medium' 
                : 'text-gray-600 hover:bg-gray-50'
            } ${item === 'Delete account' ? 'text-red-500' : ''}`}
          >
            {item}
          </button>
        ))}
      </nav>
    </div>)
}

export default SettingsSideBar


