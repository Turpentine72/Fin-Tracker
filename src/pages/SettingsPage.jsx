import { useEffect, useState } from "react";
import { FaCamera, FaFileCsv } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user data from localStorage
  useEffect(() => {
    // Try to get from unified currentUser object
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser(currentUser);
    } else {
      // Fallback to individual keys (from signup)
      const name = localStorage.getItem("userName") || "User";
      const email = localStorage.getItem("userEmail") || "";
      const mobile = localStorage.getItem("userMobile") || "";
      const profilePic = localStorage.getItem("profilePic") || null;
      setUser({ name, email, mobile, profilePic });
    }
  }, []);

  // Handle profile picture upload – saves immediately
  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file && user) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...user, profilePic: reader.result };
        setUser(updatedUser);
        // Save to localStorage in both formats
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        localStorage.setItem("profilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Export user data as CSV
  const exportCSV = () => {
    if (!user) return;
    const headers = ["Field", "Value"];
    const data = [
      ["Name", user.name],
      ["Email", user.email],
      ["Mobile", user.mobile || ""],
      ["Profile Picture", user.profilePic ? "Stored" : "None"],
    ];
    const csvContent = [headers, ...data]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "user_settings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle navigation for setting items
  const handleSettingClick = (title) => {
    if (title === "Account Information") {
      navigate("/account");
    } else if (title === "Change Password") {
      // navigate("/change-password") if you have that page
      alert("Change Password page coming soon!");
    } else if (title === "Help & Support") {
      alert("Help & Support coming soon!");
    } else {
      alert(`${title} page coming soon!`);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-blue-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex justify-center items-start py-10 transition">
      <div className="w-full max-w-md space-y-6">
        {/* 👤 PROFILE CARD */}
        <div className="bg-white/70 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl">
          <div className="flex items-center gap-4">
            {/* Profile picture with camera icon */}
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xl font-bold overflow-hidden">
                {user.profilePic ? (
                  <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  user.name?.charAt(0).toUpperCase()
                )}
              </div>
              {/* Camera icon – hidden input is triggered by clicking this label */}
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-blue-700 transition"
              >
                <FaCamera size={14} />
              </label>
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicUpload}
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold dark:text-white">{user.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
              {user.mobile && <p className="text-xs text-gray-500 dark:text-gray-400">{user.mobile}</p>}
            </div>
          </div>
        </div>

        {/* 💎 PREMIUM CARD */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-3xl shadow-xl">
          <h3 className="font-semibold text-lg">Premium Account</h3>
          <p className="text-sm opacity-90">Enjoy your premium features</p>
        </div>

        {/* ⚙ SETTINGS LIST CARD */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl space-y-4">
          <SettingItem 
            title="Account Information" 
            onClick={() => handleSettingClick("Account Information")} 
          />
          <SettingItem 
            title="Change Password" 
            onClick={() => handleSettingClick("Change Password")} 
          />
          <SettingItem 
            title="Devices" 
            onClick={() => handleSettingClick("Devices")} 
          />
          <SettingItem 
            title="Connect to Banks" 
            onClick={() => handleSettingClick("Connect to Banks")} 
          />

          <hr className="border-gray-200 dark:border-gray-700" />

          <SettingItem 
            title="Help & Support" 
            onClick={() => handleSettingClick("Help & Support")} 
          />
          <SettingItem 
            title="About App" 
            onClick={() => handleSettingClick("About App")} 
          />
        </div>

        {/* EXPORT CSV BUTTON */}
        <button
          onClick={exportCSV}
          className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition font-semibold"
        >
          <FaFileCsv /> Export Settings as CSV
        </button>
      </div>
    </div>
  );
}

/* 🔹 Reusable Setting Item with onClick prop */
function SettingItem({ title, onClick }) {
  return (
    <div 
      className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
      onClick={onClick}
    >
      <span className="dark:text-gray-200">{title}</span>
      <span className="text-gray-400">{">"}</span>
    </div>
  );
}