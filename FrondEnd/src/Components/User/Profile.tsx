// import { useSelector } from "react-redux"
import {  useRef, useState } from "react";
import NavBar from "./NavBar";
import { Api } from "../../Api/userApi";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/Store";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import type { userType } from "../../types/user";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../store/user/AuthSlice";

function Profile() {
  const user = useSelector((state: RootState) => state.auth.user);
  const initialData: userType = user ? user : {name:"", email:"", profileImage:"", password: ""}
  const [userData, setUserdata] = useState<userType>(initialData)
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate()
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  const dispatch = useDispatch()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const file = e.target.files?.[0];
    if (!file || !user?._id) return;
    

    const formdata = new FormData();
    formdata.append("file", file);
    // formdata.append("Cloudinary_setup","user_management")
    formdata.append("upload_preset", "user_management");
    try {
      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/ddzjyv5ug/image/upload`,
        formdata
      );
      const data = await cloudinaryRes.data;
      const imageUrl: string = data.secure_url;
      const response = await Api.put(`/user/editProfile/${user._id}`, {
        ...userData,
        profileImage: imageUrl,
      });
      setUserdata((prev) => ({ ...prev, profileImage: imageUrl! }));
      dispatch(updateUser(response.data.update))
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemovePhoto = async () => {
    if (!user?._id) return;

    try {

      const response = await Api.put(`/user/editProfile/${user._id}`, {
        ...userData,
        profileImage: "",
      });
      dispatch(updateUser(response.data.update))
      setUserdata((prev) => ({ ...prev, profileImage: "" }));
      toast.success("Profile photo removed!");
    } catch (error) {
      console.error("Error removing photo:", error);
      toast.error("Failed to remove photo");
    }
  };

  const handleSave = async () => {
    const { name, email, password} = userData;
    console.log(userData);

    if (!name.trim()) {
      toast.error("name cannot be emapty");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (!password) {
      toast.error("Password annot be emapty");
      return;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const updateData = { ...userData };
      const response = await Api.put(`/user/editProfile/${user?._id}`, updateData);
      toast.success("Profile updated successfully");
      setEditMode(false);
      navigate("/home")
      dispatch(updateUser(response.data.update))
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg mt-10 p-8">
        <div className="flex flex-col items-center space-y-4">
          {userData ? (
            <>
              <div className="relative">
                <div
                  onClick={handleImageClick}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden cursor-pointer"
                >
                  {userData.profileImage ? (
                    <>
                      <img
                        src={userData.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={handleRemovePhoto}
                        className="absolute top-1 right-1 bg-green-900 hover:bg-green-700 text-white w-7 h-7 flex items-center justify-center rounded-full shadow-md transition"
                        title="Remove Photo"
                      >
                        <FaTrashAlt className="w-3 h-4" />
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-600">
                      No Image
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              {editMode ? (
                <div className="flex flex-col w-full max-w-md space-y-4 mt-4">
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    readOnly
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <input
                    type="password"
                    name="password"
                    value={userData.password || ""}
                    onChange={handleInputChange}
                    placeholder="New Password"
                    className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                  />
                  <button
                    onClick={handleSave}
                    className="bg-green-900 text-white px-6 py-2 rounded-lg hover:bg-green-900 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="text-green-800 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-2 mt-4">
                  <h1 className="text-xl font-bold">
                    Username: {userData.name}
                  </h1>
                  <h2 className="text-gray-600">Email: {userData.email}</h2>
                  <div className="flex flex-row gap-4 mt-2">
                    <button
                    onClick={() => setEditMode(true)}
                    className="bg-green-900 text-white px-4 py-1 rounded-lg hover:bg-green-800 transition"
                  >
                    Edit Profile
                  </button>
                  <button type="button"
                    onClick={() => handleSave()}
                    className="bg-green-900 text-white px-4 py-1 rounded-lg hover:bg-green-800 transition"
                  >
                    Save
                  </button>

                  </div>
                </div>
              )}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
