import React, { useState, useEffect } from 'react';
import axios from "axios";


const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  // Example Notifications Data

  useEffect(() => {
    const notifications = async () => {

      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get('http://localhost:4000/api/notifications',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        console.log(response.data);
        if (response.data.success === true) {
          setNotifications(response.data.message);
        }
      }
      catch (error) {
        console.log(error);
      }
    };
    notifications();
  }, [])

  // Function to mark a notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h2 className="text-3xl font-semibold mb-8">Notifications</h2>

      <div className="space-y-6">
        {notifications.map((notification) => (
          <div
            key={notification._id}
            className={`flex items-center space-x-4 p-4 rounded-lg transition-transform transform ${notification.name ? 'bg-gray-800' : 'bg-gray-700'
              } hover:scale-105 hover:shadow-lg`}
          >
            {/* User Avatar */}
            <img
              src={notification.avatar}
              alt="User Avatar"
              className="w-12 h-12 rounded-full"
            />

            {/* Notification Content */}
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold">{notification.name}</span>
              </p>
              <p className="text-xs text-gray-400">{notification.email}</p>
            </div>

            {/* Mark as Read Button */}
            {!notification.read && (
              <button
                onClick={() => markAsRead(notification.id)}
                className="text-sm text-blue-500 hover:text-blue-400"
              >
                Mark as Read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
