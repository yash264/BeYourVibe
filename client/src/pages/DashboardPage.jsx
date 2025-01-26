import React from 'react';
import MessagePage from '../components/MessagePage';
import Sidebar from '../components/Sidebar';

const DashboardPage = () => {
  return (
    <div className='grid lg:grid-cols-[350px,1fr] h-screen max-h-screen'>
      {/* Sidebar Section */}
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar />
      </section>

      {/* Message Components */}
      <section className={`${basePath && "hidden"}`}>
        <MessagePage />
      </section>

      {/* Placeholder when no user is selected */}
      <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex"}`}>
        <div>
          <img
            src={logo}
            width={250}  // Increased the width of the logo
            alt='logo'
          />
        </div>
        <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
      </div>
    </div>
  );
}

export default DashboardPage;

