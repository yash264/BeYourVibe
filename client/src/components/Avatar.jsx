import React from "react";

const Avatar = ({ imageUrl, firstName, lastName, isOnline }) => {
  // If no profile picture is available, generate the initials
  const getInitials = () => {
    const initials = `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`;
    return initials.toUpperCase();
  };

  return (
    <div className="text-center">
      {/* Profile Picture or Initials */}
      <div className="w-14 h-14 rounded-full mx-auto mb-2 overflow-hidden flex items-center justify-center text-white text-xl font-semibold bg-gray-500">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-2xl">{getInitials()}</span> // Display initials if image is not available
        )}
      </div>
      {/* User Name */}
      <h2 className="text-lg font-semibold">
        {imageUrl ? `${firstName} ${lastName}` : `${getInitials()} (${firstName} ${lastName})`}
      </h2>
      {/* User Online/Offline Status */}
      <div className="flex items-center justify-center space-x-1">
        <div
          className={`w-3 h-3 rounded-full ${
            isOnline ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span className="text-sm">{isOnline ? "Online" : "Offline"}</span>
      </div>
    </div>
  );
};

export default Avatar;
