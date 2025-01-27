import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import axios from "axios";

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [userData, setUserData] = useState({
    name: "John Doe",
    profilePic: "https://via.placeholder.com/150", // Placeholder for profile pic
    hometown: "New York",
  });

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/totalUsers');
        setConversations(response.data.message);
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, [])

  const [requests, setRequests] = useState([])

  useEffect(() => {
    const totalRequests = async () => {
      try {

        const response = await axios.get('http://localhost:4000/api/totalRequests',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          });
        console.log(response.data.message[0]);
        setRequests(response.data.message[0]);
      }
      catch (error) {
        console.log(error);
      }
    }
    totalRequests();
  }, [])

  const sendRequest = async (email) => {

    console.log(email);
    try {
      const response = await axios.post('http://localhost:4000/api/sendRequest',
        {
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.value === "friend request send") {
        alert("friend request send");
      }
      else if (response.data.value === "Friend Request Already Send") {
        alert("Friend Request Already Send");
      }
      else {
        console.log("some error");
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  const acceptRequest = async (email) => {

    try {
      const response = await axios.post('http://localhost:4000/api/acceptRequest',
        {
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.value === "friend request accepted") {
        alert("friend request accepted");
      }
      else if (response.data === "Already a friend") {
        alert("Already a friend");
      }
      else {
        console.log("some error");
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  const [text, setText] = useState([])

  const sendMessage = async (email) => {

    console.log(email);
    try {
      const response = await axios.post('http://localhost:4000/api/sendRequest',
        {
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.value === "friend request send") {
        alert("friend request send");
      }
      else if (response.data.value === "Friend Request Already Send") {
        alert("Friend Request Already Send");
      }
      else {
        console.log("some error");
      }
    }
    catch (error) {
      console.log(error);
    }
  };


  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const openProfileModal = (conversation) => {
    setUserData({
      name: conversation.name,
      profilePic: "https://via.placeholder.com/150",
      hometown: "Unknown",
    });
    toggleModal();
  };

  const toggleFollow = (id) => {
    setConversations((prevConversations) =>
      prevConversations.map((conversation) =>
        conversation.id === id
          ? { ...conversation, followed: !conversation.followed }
          : conversation
      )
    );
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Fixed Left Sidebar */}
      <div className=" relative w-20 bg-gray-800 text-white flex flex-col items-center py-4 space-y-6 border-r border-gray-700">
        {/* Message Button */}
        <button
          className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9zM9.75 15h4.5M9 12h6"
            />
          </svg>
        </button>

        {/* Profile Button */}
        <button
          onClick={toggleModal}
          className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.804A7.975 7.975 0 0012 20c1.933 0 3.692-.688 5.121-1.804m-9.242 0A7.975 7.975 0 014 12c0-1.933.688-3.692 1.804-5.121m12.242 0A7.975 7.975 0 0120 12c0 1.933-.688 3.692-1.804 5.121M6.343 6.343A7.975 7.975 0 0112 4c1.933 0 3.692.688 5.121 1.804"
            />
          </svg>
        </button>

        {/* Logout Button */}
        <button className=" absolute bottom-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition">
          <span className="-ml-2">
            <BiLogOut size={24} />
          </span>

        </button>
      </div>

      {/* Main Sidebar Content */}
      <div className="flex-grow lg:w-1/4 bg-gray-800 text-white  p-4 h-full flex flex-col border-r border-gray-700">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-4">
          <h2 className="text-lg font-semibold">Messages</h2>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Conversations List */}
        <div className="flex-grow overflow-y-auto">
          <ul className="space-y-3">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conversation) => (
                <li
                  key={conversation.id}
                  className="p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition flex items-center space-x-3"
                >
                  <div
                    onClick={() => openProfileModal(conversation)}
                    className={`w-10 h-10 rounded-full flex-shrink-0 cursor-pointer ${conversation.isOnline ? "bg-green-500" : "bg-gray-500"
                      }`}
                  />
                  <div className="flex-grow">
                    <p className="font-medium">{conversation.name}</p>
                    <p className="text-sm text-gray-400 truncate">
                      {conversation.email}
                    </p>
                  </div>
                  <button
                    onClick={() => sendRequest(conversation.email)}
                    className={`px-4 py-2 rounded-md ${conversation.followed ? "bg-red-500" : "bg-green-500"
                      } text-white hover:${conversation.followed ? "bg-red-600" : "bg-green-600"
                      }`}
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

        <div>
          <p>Friend Requests</p>
          {
            requests == null ? "" : requests.map((value) => {
              return <tr>
                <td>{value.name}</td>
                <td>{value.email}</td>
                <td><button className="bg-slate-400" onClick={()=>acceptRequest(value.email)}>Click here</button></td>
              </tr>
            })
          }
        </div>

        {/* Add New Chat Button */}
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Start New Chat
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-sm">
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
                  onClick={toggleModal}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Save the user data logic
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
    </div>
  );
};

export default Sidebar;
