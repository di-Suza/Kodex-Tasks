import InputField from "./components/InputField"
import ProfileUpload from "./components/ProfileUpload"
import SettingsSideBar from "./components/SettingsSideBar"
import TextAreaField from "./components/TextAreaField"

const Settings = ()=> {
 

  return (
  <><div className="bg-[#F4F7F6] min-h-screen p-8 font-sans">
      <h1 className="text-xl font-bold mb-6 text-gray-800">Settings</h1>
      
      <div className="flex gap-8 max-w-6xl mx-auto">
        {/* Sidebar */}
        <SettingsSideBar />

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          
          {/* Public Info Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold text-gray-800 mb-6">Public info</h2>
            <div className="flex gap-8">
              <div className="flex-1 space-y-4">
                <InputField label="Username" placeholder="Username" />
                <TextAreaField label="Biography" placeholder="Tell something about yourself" />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                  Save changes
                </button>
              </div>
              <ProfileUpload />
            </div>
          </div>

          {/* Private Info Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold text-gray-800 mb-6">Private info</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField label="First name" placeholder="First name" />
                <InputField label="Last name" placeholder="Last name" />
              </div>
              <InputField label="Email" placeholder="Email" type="email" />
              <InputField label="Address" placeholder="1234 Main St" />
              <InputField label="Address 2" placeholder="Apartment, studio, or floor" />
              <div className="grid grid-cols-3 gap-4">
                <InputField label="City" placeholder="" />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-gray-50 outline-none">
                    <option>Choose...</option>
                  </select>
                </div>
                <InputField label="Zip" placeholder="" />
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Save changes
              </button>
            </div>
          </div>

        </div>
      </div>
    </div></>)
}

export default Settings

