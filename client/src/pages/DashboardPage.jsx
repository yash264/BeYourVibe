import React from 'react';
import MessagePage from '../components/MessagePage';
import Sidebar from '../components/Sidebar';

const DashboardPage = () => {
  const basePath = false; // This should be dynamically passed if necessary.
  const logo = '/path/to/logo.png'; // Replace with your actual logo path.

  return (
    <div className="h-screen max-h-screen flex flex-col lg:grid lg:grid-cols-[350px,1fr]">
      {/* Sidebar Section */}
      <section
        className={`bg-white border-r ${
          basePath ? 'hidden' : 'block'
        } lg:block`}
      >
        <Sidebar />
      </section>

      {/* Message Components */}
      <section className={`flex-1 ${basePath ? 'block' : 'hidden'} lg:block`}>
        <MessagePage />
      </section>

      {/* Placeholder when no user is selected */}
      <div
        className={`justify-center items-center flex-col gap-2 flex ${
          basePath ? 'hidden' : 'flex'
        } lg:hidden`}
      >
        <div>
          <img
            src={logo}
            width={200} // Adjusted for better scaling on smaller screens
            alt="logo"
          />
        </div>
        <p className="text-lg mt-2 text-slate-500">
          Select a user to send a message
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;

