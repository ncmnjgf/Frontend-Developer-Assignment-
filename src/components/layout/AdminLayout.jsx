import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="admin-content page-enter" id="main-content" role="main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
