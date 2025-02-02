import React, { useState } from "react";
import { Search } from "lucide-react";

const users = [
  { id: 1, name: "John Doe", username: "johndoe", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Jane Smith", username: "janesmith", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Alex Johnson", username: "alexjohnson", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Emily Davis", username: "emilydavis", avatar: "https://i.pravatar.cc/150?img=4" },
];

const SearchUser = () => {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-full h-screen bg-gray-900 text-white p-4">
      {/* Search Bar */}
      <div className="relative w-full max-w-md mb-4">
        <Search className="absolute left-3 top-2 text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 pl-10 bg-gray-800 text-white border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Search Results */}
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-md overflow-hidden">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center p-3 border-b border-gray-700 hover:bg-gray-800 transition duration-200"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full border-2 border-gray-600"
              />
              <div className="ml-3">
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-gray-400 text-sm">@{user.username}</p>
              </div>
              <button className="ml-auto px-4 py-1 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-200">
                Follow
              </button>
            </div>
          ))
        ) : (
          <p className="p-4 text-center text-gray-400">No users found</p>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
