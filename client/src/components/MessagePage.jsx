import React, { useState } from "react";
import { FiSend, FiImage } from "react-icons/fi";
import { FaVideo, FaPhone } from "react-icons/fa";

const MessagePage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! How's it going?", sender: "other" },
    { id: 2, text: "All good! What about you?", sender: "me" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: "me" }]);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar - Followed Users */}
      <div className="w-full md:w-1/4 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Followed Users</h2>
        <div className="space-y-3">
          {['User 1', 'User 2', 'User 3'].map((user, index) => (
            <div key={index} className="p-3 bg-gray-800 rounded-lg cursor-pointer flex items-center gap-2" onClick={() => alert(`Go to ${user} profile`)}>
              <div className={`w-8 h-8 rounded-full ${user === 'User 2' ? 'bg-gray-500' : 'bg-green-500'}`}></div>
              <span>{user} ({user === 'User 2' ? 'Offline' : 'Online'})</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-gray-100 w-full">
        <div className="p-4 bg-white shadow-md text-lg font-semibold flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
            <span className="cursor-pointer" onClick={() => alert('Go to User Profile')}>Chat with User (Online)</span>
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
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 rounded-lg max-w-xs ${msg.sender === "me" ? "bg-blue-500 text-white self-end" : "bg-gray-300"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        
        {/* Message Input */}
        <div className="p-4 bg-white flex items-center gap-2 border-t w-full">
          <button className="p-2 text-gray-500 hover:text-blue-500">
            <FiImage size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-blue-500">
            <FaVideo size={20} />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg"
          />
          <button onClick={sendMessage} className="p-2 text-blue-500 hover:text-blue-700">
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;

