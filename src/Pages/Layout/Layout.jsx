import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/HeaderAndFooter/Header';
import Footer from '../../components/HeaderAndFooter/Footer';
import Sidebar from '../../components/Sidebar';

const Layout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
    
      <header className="z-10 shrink-0">
        <Navbar />
      </header>

   
      <div className="flex flex-1 overflow-hidden">
    
        <aside className="w-64 shrink-0 bg-gray-800 text-white">
          <Sidebar />
        </aside>

     
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 pb-24">
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
