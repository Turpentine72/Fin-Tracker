import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaCamera, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    profilePic: null,
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser({
        fullName: currentUser.name || "User",
        email: currentUser.email || "",
        phone: currentUser.mobile || "",
        profilePic: currentUser.profilePic || null,
      });
    } else {
      const name = localStorage.getItem("userName") || "User";
      const email = localStorage.getItem("userEmail") || "";
      const mobile = localStorage.getItem("userMobile") || "";
      const profilePic = localStorage.getItem("profilePic") || null;
      setUser({ fullName: name, email, phone: mobile, profilePic });
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedUser = {
      name: user.fullName,
      email: user.email,
      mobile: user.phone,
      profilePic: user.profilePic,
    };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    localStorage.setItem("userName", user.fullName);
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userMobile", user.phone);
    if (user.profilePic) localStorage.setItem("profilePic", user.profilePic);
    alert("Changes saved successfully! ✅");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userMobile");
    localStorage.removeItem("userPassword");
    localStorage.removeItem("profilePic");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl font-bold overflow-hidden border-4 border-white/30">
                {user.profilePic ? (
                  <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  user.fullName.charAt(0).toUpperCase()
                )}
              </div>
              <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-white text-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-50 transition shadow-lg">
                <FaCamera size={16} />
              </label>
              <input type="file" id="profile-upload" accept="image/*" className="hidden" onChange={handleProfilePicUpload} />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl md:text-3xl font-bold">{user.fullName}</h2>
              <p className="text-indigo-100 flex items-center justify-center sm:justify-start gap-2 mt-1">
                <FaEnvelope size={14} /> {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Personal Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <FaUser className="text-indigo-600" /> Personal Information
          </h3>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-10 pr-4 py-3 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-10 pr-4 py-3 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-10 pr-4 py-3 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
          <button onClick={handleSave} className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
            Save Changes
          </button>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center">
          <button onClick={handleLogout} className="w-auto px-8 bg-black hover:bg-gray-800 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
            <FaSignOutAlt size={18} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;