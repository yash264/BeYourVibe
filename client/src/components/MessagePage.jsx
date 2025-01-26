import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Avatar from "./Avatar"; // Import the Avatar component

const MessagePage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showUploadOptions, setShowUploadOptions] = useState(false); // State to show the upload options
  const [selectedFileType, setSelectedFileType] = useState(""); // To track the selected file type (image or video)
  const [isOnline, setIsOnline] = useState(true); // State for online status (true = online, false = offline)

  // Handle sending a message
  const handleSendMessage = (type = "text", content = "") => {
    if (type === "text" && newMessage.trim()) {
      setMessages([
        ...messages,
        { text: newMessage, sender: "You", type: "text" },
      ]);
      setNewMessage("");
    } else if (type !== "text" && content) {
      setMessages([...messages, { text: content, sender: "You", type }]);
    }
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleSendMessage(selectedFileType, URL.createObjectURL(file));
    }
  };

  // Handle video call initiation
  const handleVideoCall = () => {
    alert("Initiating video call...");
    // Here, you would add logic to initiate the video call (e.g., through WebRTC)
  };

  // Handle audio call initiation
  const handleAudioCall = () => {
    alert("Initiating audio call...");
    // Here, you would add logic to initiate the audio call (e.g., through WebRTC)
  };

  return (
    <div className="flex h-max-h bg-gray-800 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Chat Area */}
      <div className="flex-grow flex flex-col">
        {/* Chat Header */}
        <div className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {/* Profile Section: Using the Avatar component */}
            <Avatar
              imageUrl="https://via.placeholder.com/150" // Use actual profile picture URL
              firstName="John"
              lastName="Doe"
              isOnline={isOnline}
            />
          </div>
          <div className="space-x-3">
            {/* Video Call Button */}
            <button
              onClick={handleVideoCall}
              className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Video Call
            </button>

            {/* Audio Call Button */}
            <button
              onClick={handleAudioCall}
              className="px-4 py-2 bg-indigo-500 rounded-md hover:bg-indigo-600"
            >
              Audio Call
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-900">
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
                  } max-w-xs`}
                >
                  {msg.text}
                </div>
              ) : msg.type === "file" ? (
                <img
                  src={msg.text}
                  alt="Uploaded"
                  className="w-32 h-32 rounded-lg object-cover"
                />
              ) : null}
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

            {/* Upload Options */}
            <div className="relative">
              <button
                onClick={() => setShowUploadOptions(!showUploadOptions)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 cursor-pointer"
              >
                Upload
              </button>

              {/* Dropdown for upload options */}
              {showUploadOptions && (
                <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded-md shadow-lg w-40">
                  <button
                    onClick={() => {
                      setSelectedFileType("image");
                      document.getElementById("fileUpload").click();
                    }}
                    className="w-full px-4 py-2 hover:bg-gray-700 text-left"
                  >
                    Upload Image
                  </button>
                  <button
                    onClick={() => {
                      setSelectedFileType("video");
                      document.getElementById("fileUpload").click();
                    }}
                    className="w-full px-4 py-2 hover:bg-gray-700 text-left"
                  >
                    Upload Video
                  </button>
                </div>
              )}
            </div>

            {/* Hidden file input for both image and video */}
            <input
              type="file"
              id="fileUpload"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            <button
              onClick={() => handleSendMessage()}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
