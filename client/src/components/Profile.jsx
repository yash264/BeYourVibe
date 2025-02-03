import React, { useState, useEffect } from "react";
import axios from "axios";
import { Heart, MessageCircle, Bookmark, Grid, User } from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userProfile, setUserProfile] = useState([]);

  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get('http://localhost:4000/api/fetchUser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success === true) {
          setUserProfile(response.data.message);
        }
        else {
          alert("Some Error Occured");
        }
      }
      catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userProfile]);


  const updateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.post('http://localhost:4000/api/updateUser',
        {
          gender: gender,
          about: about,
          profilePic: profilePic,
          homeTown: city,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      if (response.data.success === true) {
        setUserProfile(response.data.message);
      }
      else {
        alert("Some Error Occured");
      }
      setIsModalOpen(false);
    }
    catch (error) {
      console.log(error);
    }
  };

  const cloud_name = 'dcinkczc2';
  const upload_preset = 'JobFinder';

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setProfilePic(data.secure_url);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center w-full text-white p-4 sm:p-6">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 justify-center sm:justify-start">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-semibold">{userProfile.name}</h2>
          <p className="text-sm text-gray-400 mt-2 px-4 sm:px-0">{userProfile.email}</p>
          <div className="flex gap-4 sm:gap-6 mt-3 text-gray-300 text-sm sm:text-base">
            {
              userProfile.personDetails == null ? "" : userProfile.personDetails.map((value,index) => {
                return <tr>
                  <img
                    src={value.profilePic}
                    key={index}
                    alt="Profile Picture"
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-gray-600 object-cover"
                  />
                  <p>Gender: <span key={index} className="font-semibold">{value.gender}</span></p>
                  <p>HomeTown: <span key={index} className="font-semibold">{value.homeTown}</span></p>
                  <p>About: <span key={index} className="font-semibold">{value.about}</span></p>
                </tr>
              })
            }
          </div>

          <div className="flex gap-3 mt-4 justify-center sm:justify-start">
            <button
              className="bg-gray-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md"
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </button>
            <button
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md ${isFollowing ? "bg-gray-600 text-white" : "bg-blue-500 text-white"}`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>
      </div>

      {/* Highlights */}

      {/*
      <div className="flex gap-4 mt-6 overflow-x-auto sm:overflow-hidden justify-center">
        {userProfile.highlights.map((highlight) => (
          <div key={highlight.id} className="relative">
            <img
              src={highlight.image}
              alt="Highlight"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-gray-600"
            />
          </div>
        ))}
      </div> */}

      {/* Tabs for Posts, Saved, Tagged */}
      {/*<div className="flex mt-6 gap-6 sm:gap-12 border-b border-gray-700 w-full justify-center">
        <button
          onClick={() => setActiveTab("posts")}
          className={`text-sm sm:text-base font-semibold ${activeTab === "posts" ? "border-b-2 border-blue-500" : ""}`}
        >
          Posts
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`text-sm sm:text-base font-semibold ${activeTab === "saved" ? "border-b-2 border-blue-500" : ""}`}
        >
          Saved
        </button>
        <button
          onClick={() => setActiveTab("tagged")}
          className={`text-sm sm:text-base font-semibold ${activeTab === "tagged" ? "border-b-2 border-blue-500" : ""}`}
        >
          Tagged
        </button>
      </div> */}

      {/* Posts Grid */}
      {/*<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 w-full justify-center">
        {userProfile.posts.map((post) => (
          <div key={post.id} className="relative group">
            <img
              src={post.image}
              alt="Post"
              className="w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Heart className="text-white text-lg" />
            </div>
          </div>
        ))}
      </div> */}

      {/* Modal for Edit Profile */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm text-white ">Profile Pic</label>
                <input type="file" onChange={uploadFile} className="w-full p-2 mt-1 bg-gray-700 rounded-md" placeholder="Enter new username" />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-white ">Gender</label>
                <input type="text" onChange={(e) => setGender(e.target.value)} className="w-full p-2 mt-1 bg-gray-700 rounded-md" placeholder="Enter new username" />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-white">HomeTown</label>
                <input type="text" onChange={(e) => setCity(e.target.value)} className="w-full p-2 mt-1 bg-gray-700 rounded-md" placeholder="Enter new username" />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-white">About YourSelf</label>
                <textarea onChange={(e) => setAbout(e.target.value)} className="w-full p-2 mt-1 bg-gray-700 rounded-md" placeholder="Tell about yourSelf"></textarea>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="bg-gray-600 text-white px-4 py-2 rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
                <button type="submit" onClick={updateUser} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
