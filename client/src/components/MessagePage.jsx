import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSend, FiImage } from "react-icons/fi";
import { FaVideo, FaPhone } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const MessagePage = () => {

  const location = useLocation()
  const name = location.state.name;
  const email = location.state.email;
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(name, email);
  const [values, setValues] = useState([])

  useEffect(() => {
    const particularUser = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.post('http://localhost:4000/api/particularUser',
          {
            email: email
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        console.log(response.data);

        if (response.data.success === true) {
          setValues(response.data.message);
        }
        else {
          alert("Some Error Occured");
        }
      }
      catch (error) {
        console.log(error);
      }
    };
    particularUser();
  }, []);

  const [message, setMessage] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const sendMessage = async (text) => {
    const token = localStorage.getItem('authToken');

    try {
      const response = await axios.post('http://localhost:4000/api/sendMessage',
        {
          email: email,
          message: message,
          text: text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);

      alert("message send");
    }
    catch (error) {
      console.log(error);
    }
  };

  const [chats, setChats] = useState([])

  useEffect(() => {
    const fetchMessages = async () => {

      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.post('http://localhost:4000/api/fetchMessages',
          {
            email: email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        console.log(response.data);
        if (response.data.success === true) {
          setChats(response.data.message);
        }
      }
      catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [chats])

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
      setMessage(data.secure_url);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar - Followed Users */}
      <div className="w-full md:w-1/4 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-4">User Detail</h2>
        <div className="space-y-3">
          <div className="p-3 bg-gray-800 rounded-lg cursor-pointer flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full bg-green-500`}>
              <p>{values.name}</p>
              <p>{values.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-gray-100 w-full">
        <div className="p-4 bg-white shadow-md text-lg font-semibold flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
            <p className="cursor-pointer">{name} (Online)</p>
            <span>{email}</span>
          </div>
          <div className="flex gap-3">
            <button className="p-2 text-gray-500 hover:text-blue-500">
              <FaPhone size={20} />
            </button>
            <button className="p-2 text-gray-500 hover:text-blue-500">
              <FaVideo size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {chats.map((data) => (
            <div
              key={data._id}
              className={`p-2 rounded-lg max-w-xs ${data.sender != values._id ? "bg-blue-500 text-white self-end" : "bg-gray-300"}`}
            >
              {
                data.type == "image" ? 
                <img src={data.value} alt={data.value} />
                :
                data.value +", "+data.read
              }
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white flex items-center gap-2 border-t w-full">
          <button className="p-2 text-gray-500 hover:text-blue-500" onClick={() => setIsModalOpen(true)}>
            <FiImage size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-blue-500">
            <FaVideo size={20} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg"
          />
          <button onClick={() => sendMessage("text")} className="p-2 text-blue-500 hover:text-blue-700">
            <FiSend size={20} />
          </button>
        </div>

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
                  <input type="text" value={message} className="w-full p-2 mt-1 bg-gray-700 rounded-md" placeholder="Enter new username" />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    className="bg-gray-600 text-white px-4 py-2 rounded-md"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                  <button type="button" onClick={() => sendMessage("image")} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagePage;

