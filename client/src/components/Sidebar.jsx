import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHome, AiFillMessage, AiOutlineBell } from "react-icons/ai";
import { RiUserSearchFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { MdCreateNewFolder } from "react-icons/md";

const Sidebar = () => {
  const [unreadNotifications, setUnreadNotifications] = useState(5);  // Example unread notifications
  const navigate = useNavigate();

  return (
    <div className="fixed left-0 top-0 h-screen w-16 md:w-20 lg:w-24 bg-gray-900 text-white flex flex-col items-center py-6 space-y-6">
      
      {/* Home Icon */}
      <div 
        className="group flex flex-col items-center space-y-1 cursor-pointer" 
        onClick={() => navigate("/")}
      >
        <AiFillHome className="text-3xl group-hover:text-blue-500 transition duration-200" />
        <span className="text-xs opacity-0 group-hover:opacity-100 transition duration-200">Home</span>
      </div>

      {/* Search Icon */}
      <div 
        className="group flex flex-col items-center space-y-1 cursor-pointer" 
        onClick={() => navigate("/search")}
      >
        <RiUserSearchFill className="text-3xl group-hover:text-blue-500 transition duration-200" />
        <span className="text-xs opacity-0 group-hover:opacity-100 transition duration-200">Search</span>
      </div>

      {/* Messages Icon */}
      <div 
        className="group flex flex-col items-center space-y-1 cursor-pointer" 
        onClick={() => navigate("/messages")}
      >
        <AiFillMessage className="text-3xl group-hover:text-blue-500 transition duration-200" />
        <span className="text-xs opacity-0 group-hover:opacity-100 transition duration-200">Messages</span>
      </div>

      {/* Notifications Icon */}
      <div 
        className="group flex flex-col items-center space-y-1 cursor-pointer relative" 
        onClick={() => navigate("/notifications")}
      >
        <AiOutlineBell className="text-3xl group-hover:text-blue-500 transition duration-200" />
        {unreadNotifications > 0 && (
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadNotifications}
          </div>
        )}
        <span className="text-xs opacity-0 group-hover:opacity-100 transition duration-200">Notifications</span>
      </div>

      {/* Profile Icon */}
      <div 
        className="group flex flex-col items-center space-y-1 cursor-pointer" 
        onClick={() => navigate("/profile")}
      >
        <CgProfile className="text-3xl group-hover:text-blue-500 transition duration-200" />
        <span className="text-xs opacity-0 group-hover:opacity-100 transition duration-200">Profile</span>
      </div>

      {/* Create Button */}
      <div 
        className="group flex flex-col items-center space-y-1 cursor-pointer" 
        onClick={() => navigate("/create")}
      >
        <MdCreateNewFolder className="text-3xl group-hover:text-blue-500 transition duration-200" />
        <span className="text-xs opacity-0 group-hover:opacity-100 transition duration-200">Create</span>
      </div>
    

      {/* Logout Icon */}
      <div 
        className="group flex flex-col items-center space-y-1 cursor-pointer" 
        onClick={() => navigate("/login")}
      >
        <BiLogOut className="text-3xl group-hover:text-blue-500 transition duration-200" />
        <span className="text-xs opacity-0 group-hover:opacity-100 transition duration-200">Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
