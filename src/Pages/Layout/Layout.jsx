import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/HeaderAndFooter/Header';
import Footer from '../../components/HeaderAndFooter/Footer';
import SidebarView from '../../components/Sidebar/SidebarView'; 


import sidebarItems from '../../components/Sidebar/SidebarConfig';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="z-10 shrink-0">
        <Navbar />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`transition-all duration-300 shrink-0 ${
            collapsed ? 'w-20' : 'w-64'
          }`}
        >
          <SidebarView
            items={sidebarItems}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        </aside>
        <main
          className={`
            flex-1 overflow-y-auto transition-all duration-300
            bg-gray-50 px-6 pb-24
          `}
        >
          <Outlet />
        </main>
      </div>
      <footer className="shrink-0">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
