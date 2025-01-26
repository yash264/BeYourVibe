import React, { useState } from "react";

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [userData, setUserData] = useState({
    name: "John Doe",
    profilePic: "https://via.placeholder.com/150", // Placeholder for profile pic
    hometown: "New York",
  });

  // Example conversation data
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, are you free later?",
      isOnline: true,
      followed: false, // Track follow status for each conversation
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Let me know when you're free.",
      isOnline: false,
      followed: false,
    },
    {
      id: 3,
      name: "Alice Johnson",
      lastMessage: "Sure, see you at 5!",
      isOnline: true,
      followed: false,
    },
    {
      id: 4,
      name: "Bob Brown",
      lastMessage: "Let’s catch up next week.",
      isOnline: false,
      followed: false,
    },
  ]);

  // Filter conversations based on the search query
  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle modal toggle
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Function to open the modal and set user data based on the clicked conversation
  const openProfileModal = (conversation) => {
    setUserData({
      name: conversation.name,
      profilePic: "https://via.placeholder.com/150", // You can change this to actual profile picture URL
      hometown: "Unknown", // Set hometown to actual data if available
    });
    toggleModal();
  };

  // Function to toggle follow/unfollow for a specific conversation
  const toggleFollow = (id) => {
    setConversations((prevConversations) =>
      prevConversations.map((conversation) =>
        conversation.id === id
          ? { ...conversation, followed: !conversation.followed } // Toggle follow status
          : conversation
      )
    );
  };

  return (
    <div className="w-3/4 bg-gray-800 text-white rounded-lg p-4 h-full flex flex-col">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-gray-700 pb-6 mb-4">
        {/* Header Title */}
        <h2 className="text-lg font-semibold">Messages</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-red-500 rounded-md hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>

      {/* Search Bar for Conversations */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search conversations..."
          className="w-full px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Conversations List (scrollable) */}
      <div className="flex-grow overflow-y-auto">
        <ul className="space-y-3">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => (
              <li
                key={conversation.id}
                className="p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition flex items-center space-x-3"
              >
                {/* Online Status Indicator */}
                <div
                  onClick={() => openProfileModal(conversation)} // Open modal when avatar is clicked
                  className={`w-10 h-10 rounded-full flex-shrink-0 cursor-pointer ${
                    conversation.isOnline ? "bg-green-500" : "bg-gray-500"
                  }`}
                />
                
                {/* Conversation Info */}
                <div className="flex-grow">
                  <p className="font-medium">{conversation.name}</p>
                  <p className="text-sm text-gray-400 truncate">
                    {conversation.lastMessage}
                  </p>
                </div>

                {/* Follow/Unfollow Button */}
                <button
                  onClick={() => toggleFollow(conversation.id)}
                  className={`px-4 py-2 rounded-md ${
                    conversation.followed ? "bg-red-500" : "bg-green-500"
                  } text-white hover:${conversation.followed ? "bg-red-600" : "bg-green-600"}`}
                >
                  {conversation.followed ? "Unfollow" : "Follow"}
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-400 text-center">No conversations found</p>
          )}
        </ul>
      </div>

      {/* Add New Chat Button */}
      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
        Start New Chat
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-80">
            <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
            <div className="mb-4">
              <label className="block text-gray-300">Name</label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className="w-full p-2 mt-2 bg-gray-700 text-white rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300">Profile Picture URL</label>
              <input
                type="text"
                value={userData.profilePic}
                onChange={(e) =>
                  setUserData({ ...userData, profilePic: e.target.value })
                }
                className="w-full p-2 mt-2 bg-gray-700 text-white rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300">Hometown</label>
              <input
                type="text"
                value={userData.hometown}
                onChange={(e) =>
                  setUserData({ ...userData, hometown: e.target.value })
                }
                className="w-full p-2 mt-2 bg-gray-700 text-white rounded-md"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={toggleModal} // Close modal
                className="px-4 py-2 bg-gray-600 text-white rounded-md"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Save the user data logic can go here
                  toggleModal();
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

