import React, { useState } from "react";
import { useTheme } from "./ui/theme-provider";
import { Edit, Save, Camera, Link, X, Eye, EyeOff, Pencil } from "lucide-react";

export default function Account() {
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/100");
  const [imageUrl, setImageUrl] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [dummyPassword, setDummyPassword] = useState("**********"); // Dummy password for display

  const initialUserData = {
    username: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    address: "123 Main Street, City, Country",
  };

  const [userData, setUserData] = useState(initialUserData);
  const [tempData, setTempData] = useState(initialUserData); // Temp storage for canceling edits

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setProfileImage(imageUrl);
      setImageUrl(""); // Clear URL input when an image file is selected
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const applyImageUrl = () => {
    if (imageUrl.trim() !== "") {
      setProfileImage(imageUrl);
      setShowUrlInput(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(userData); // Backup current data
  };

  const handleSave = () => {
    setIsEditing(false);
    setUserData(tempData); // Save changes
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempData(userData); // Restore previous data
  };

  const handleChangePassword = () => {
    // Logic to handle password change
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    // Reset fields after updating
    setOldPassword("");
    setNewPassword("");
    setIsChangePasswordDialogOpen(false); // Close dialog after updating
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-5 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className={`max-w-lg w-full rounded-xl shadow-lg p-6 transition-colors ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <div className="mb-6 text-center">
          <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-black"}`}>Account Details</h2>
        </div>

        {/* Profile Image */}
        <div className={`flex flex-col items-center space-y-4`}>
          <div className={`relative w-24 h-24`}>
            <img
              src={profileImage}
              alt="Profile"
              className={`w-24 h-24 rounded-full object-cover border-4 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}
            />
            {isEditing && (
              <div className="absolute bottom-0 right-0 flex space-x-2">
                {/* File Upload */}
                <label className={`bg-gray-200 ${theme === "dark" ? "bg-gray-600" : ""} p-2 rounded-full cursor-pointer`}>
                  <Camera className={`w-5 h-5 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`} />
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
                {/* URL Upload */}
                <button
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className={`bg-gray-200 ${theme === "dark" ? "bg-gray-600" : ""} p-2 rounded-full cursor-pointer`}
                >
                  <Link className={`w-5 h-5 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`} />
                </button>
              </div>
            )}
          </div>

          {/* URL Input for Profile Image */}
          {isEditing && showUrlInput && (
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={handleUrlChange}
                className={`p-2 border rounded-lg ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-900"} focus:ring-2 focus:ring-blue-500 transition-colors w-48`}
              />
              <button
                onClick={applyImageUrl}
                className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Editable Fields */}
        <div className={`mt-6 space-y-4`}>
          {["username", "email"].map((field) => (
            <div key={field}>
              <label className={`block text-sm font-medium mb-1 ${theme === "dark" ? "dark:text-gray-300" : ""} capitalize`}>
                {field}
              </label>
              <input
                type="text"
                name={field}
                value={tempData[field]}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-2 border rounded-lg transition-colors ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900"} focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          ))}
        </div>

        {/* Dummy Password Input */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type="password"
              value={dummyPassword}
              readOnly
              className={`w-full p-2 border rounded-lg pr-10 ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900"} focus:ring-2 focus:ring-blue-500`}
              style={{ textIndent: '0.5em' }}
            />
            <button
              onClick={() => setIsChangePasswordDialogOpen(true)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition p-1"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Change Password Dialog */}
        {isChangePasswordDialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className={`bg-white rounded-lg p-6 shadow-lg ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
              <h3 className="text-lg font-semibold mb-4">Change Password</h3>
              <div>
                <label className="block text-sm font-medium mb-1">Old Password</label>
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className={`w-full p-2 border rounded-lg transition-colors ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900"} focus:ring-2 focus:ring-blue-500`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`w-full p-2 border rounded-lg transition-colors ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900"} focus:ring-2 focus:ring-blue-500`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-center mt-4 space-x-2">
                <button
                  onClick={handleChangePassword}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => setIsChangePasswordDialogOpen(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end mt-6 space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className={`px-4 py-2 ${theme === "dark" ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} rounded-lg transition flex items-center space-x-2`}
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
