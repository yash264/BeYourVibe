
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';
import React from 'react';

const DashboardPage = () => {
  return (
    <div>

      <div>
        <Sidebar/>
      </div>
      <div>
        <Profile />
      </div>
    </div>
  );
}

export default DashboardPage;

