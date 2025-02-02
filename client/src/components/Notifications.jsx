import React, { useState } from 'react';

// Example Notifications Data
const notificationsData = [
  {
    id: 1,
    avatar: 'https://i.pravatar.cc/150?img=1',
    text: 'Liked your post',
    timestamp: '2 hours ago',
    type: 'like',
  },
  {
    id: 2,
    avatar: 'https://i.pravatar.cc/150?img=2',
    text: 'Commented on your post',
    timestamp: '4 hours ago',
    type: 'comment',
  },
  {
    id: 3,
    avatar: 'https://i.pravatar.cc/150?img=3',
    text: 'Started following you',
    timestamp: '1 day ago',
    type: 'follow',
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationsData);

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
            key={notification.id}
            className={`flex items-center space-x-4 p-4 rounded-lg transition-transform transform ${
              notification.read ? 'bg-gray-800' : 'bg-gray-700'
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
                <span className="font-semibold">{notification.text}</span>
              </p>
              <p className="text-xs text-gray-400">{notification.timestamp}</p>
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
