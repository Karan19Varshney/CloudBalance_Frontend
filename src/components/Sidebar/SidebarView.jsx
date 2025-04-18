import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import useNavigateTo from '../../hooks/useNavigate';
import { useSelector } from 'react-redux';

const SidebarView = ({ items }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const role = useSelector((state) => state.user.Role);

  const filteredItems = items.filter(item => {
    if (role === 'ADMIN') return true;
    if(role === 'READ_ONLY') {
      return item.path === '/dashboard/AwsService' || item.path === '/dashboard/CostExplorer' || item.path === '/dashboard/UserManagement';
    }
    if (role === 'CUSTOMER') {
      return item.path === '/dashboard/AwsService' || item.path === '/dashboard/CostExplorer';
    }
    // return false;
  });

  return (
    <div className="w-64 h-screen bg-white text-black fixed">
      <ul className="mt-4 space-y-2">
        {filteredItems.map((item) => (
          <li key={item.path}>
            <button
              onClick={() => navigate(item.path)}
              className={`w-full text-left px-4 py-2 rounded transition-all hover:bg-blue-500 hover:text-white ${
                location.pathname === item.path ? 'bg-blue-500 text-white' : ''
              }`}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarView;
