import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Search } from "lucide-react";

const SearchUser = () => {
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const totalUsers = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get('http://localhost:4000/api/totalUsers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data.message);

        if (response.data.success === true) {
          setUsers(response.data.message);
        }
        else {
          alert("Some Error Occured");
        }
      }
      catch (error) {
        console.log(error);
      }
    };
    totalUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) => 
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const navigate = useNavigate()

  const redirect = (name, email) => {
    navigate( "../messages",
      {
        state:
        {
          name: name,
          email: email,
        }
      }
    );
  }

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
          filteredUsers.map((value, index) => (
            <div
              key={index}
              className="flex items-center p-3 border-b border-gray-700 hover:bg-gray-800 transition duration-200"
            >
              {
                value.personDetails.map((item, i) => (
                  <img
                    src={item.profilePic}
                    key={i}
                    alt={value.name}
                    className="w-12 h-12 rounded-full border-2 border-gray-600"
                  />
                ))}
              <div className="ml-3">
                <p key={index} className="text-lg font-semibold">{value.name}</p>
                <p key={index} className="text-gray-400 text-sm">{value.email}</p>
              </div>
              <button className="ml-auto px-4 py-1 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-200" onClick={() => redirect(value.name, value.email)} >
                Message
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
