import React, { useState } from "react";
import { Heart, MessageCircle, Bookmark, Grid, User } from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userProfile = {
    username: "Bambam Gupta",
    profilePicture:
      "https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVufGVufDB8fDB8fHww",
    bio: "📸 Photographer | ✈️ Traveler | 🏕️ Explorer",
    posts: [
      { id: 1, image: "https://images.unsplash.com/photo-1738250733850-1507b75f5e2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D" },
      { id: 2, image: "https://images.unsplash.com/photo-1738250733850-1507b75f5e2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D" },
      { id: 3, image: "https://images.unsplash.com/photo-1738250733850-1507b75f5e2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D" },
      { id: 4, image: "https://images.unsplash.com/photo-1738250733850-1507b75f5e2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D" },
      
    ],
    followers: 2000,
    following: 150,
    highlights: [
      { id: 1, image: "https://images.unsplash.com/photo-1738250733850-1507b75f5e2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D" },
    ],
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center w-full text-white p-4 sm:p-6">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 justify-center sm:justify-start">
        <img
          src={userProfile.profilePicture}
          alt="Profile"
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-gray-600 object-cover"
        />
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-semibold">{userProfile.username}</h2>
          <p className="text-sm text-gray-400 mt-2 px-4 sm:px-0">{userProfile.bio}</p>
          <div className="flex gap-4 sm:gap-6 mt-3 text-gray-300 text-sm sm:text-base">
            <p><span className="font-semibold">{userProfile.posts.length}</span> posts</p>
            <p><span className="font-semibold">{userProfile.followers}</span> followers</p>
            <p><span className="font-semibold">{userProfile.following}</span> following</p>
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
      </div>

      {/* Tabs for Posts, Saved, Tagged */}
      <div className="flex mt-6 gap-6 sm:gap-12 border-b border-gray-700 w-full justify-center">
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
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 w-full justify-center">
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
      </div>

      {/* Modal for Edit Profile */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm text-white ">Username</label>
                <input type="text" className="w-full p-2 mt-1 bg-gray-700 rounded-md" placeholder="Enter new username" />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-white">Bio</label>
                <textarea className="w-full p-2 mt-1 bg-gray-700 rounded-md" placeholder="Enter new bio"></textarea>
              </div>
              <div className="flex justify-end gap-4">
                <button 
                  type="button"
                  className="bg-gray-600 text-white px-4 py-2 rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
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
