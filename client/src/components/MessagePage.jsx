import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Avatar from "./Avatar";

const MessagePage = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [selectedFileType, setSelectedFileType] = useState("");

  // Handle selecting a conversation
  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setMessages([]); // Clear previous messages or fetch new ones for the selected user
  };

  // Handle sending a message
  const handleSendMessage = (type = "text", content = "") => {
    if (type === "text" && newMessage.trim()) {
      setMessages((prev) => [
        ...prev,
        { text: newMessage, sender: "You", type: "text" },
      ]);
      setNewMessage("");
    } else if (type !== "text" && content) {
      setMessages((prev) => [...prev, { text: content, sender: "You", type }]);
    }
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleSendMessage(selectedFileType, URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-800 text-white ">
      {/* Sidebar */}
      <Sidebar onConversationSelect={handleSelectConversation} />

      {/* Main Chat Area */}
      <div className="flex-grow flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Avatar
                  imageUrl="https://via.placeholder.com/150" // Replace with actual profile picture
                  firstName={selectedConversation.name.split(" ")[0]}
                  lastName={selectedConversation.name.split(" ")[1]}
                  isOnline={selectedConversation.isOnline}
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {selectedConversation.name}
                  </h2>
                  <p
                    className={`text-sm ${
                      selectedConversation.isOnline
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  >
                    {selectedConversation.isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-900 scrollbar-hide">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.type === "text" ? (
                    <div
                      className={`p-3 rounded-lg ${
                        msg.sender === "You"
                          ? "bg-green-500 text-white"
                          : "bg-gray-700 text-gray-200"
                      } max-w-xs sm:max-w-sm md:max-w-md`}
                    >
                      {msg.text}
                    </div>
                  ) : (
                    <img
                      src={msg.text}
                      alt="Uploaded"
                      className="w-32 h-32 sm:w-48 rounded-lg object-cover"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="bg-gray-800 p-4 border-t border-gray-700">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <div className="relative">
                  {showUploadOptions && (
                    <div className="absolute right-0 bg-gray-800 text-white rounded-md shadow-lg w-40">
                      <button
                        onClick={() => {
                          setSelectedFileType("image");
                          document.getElementById("fileUpload").click();
                        }}
                        className="w-full px-4 py-2 hover:bg-gray-700"
                      >
                        Upload Image
                      </button>
                      <button
                        onClick={() => {
                          setSelectedFileType("video");
                          document.getElementById("fileUpload").click();
                        }}
                        className="w-full px-4 py-2 hover:bg-gray-700"
                      >
                        Upload Video
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => setShowUploadOptions(!showUploadOptions)}
                    className="px-4 py-2 bg-yellow-500 rounded-md hover:bg-yellow-600"
                  >
                    Upload
                  </button>
                </div>
                <input
                  type="file"
                  id="fileUpload"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="px-4 py-2 bg-green-500 rounded-md hover:bg-green-600"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center h-full text-gray-400">
            <h2 className="text-xl font-semibold mb-2">Select user to send message</h2>
            <p>Select a conversation from the sidebar to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagePage;
