import React from 'react';
import logo from '../../assets/Cloudbalance.png';
import { useNavigate, Link } from 'react-router-dom';
import { postApi } from '../../Service/CommonService';
import { URLS } from '../../Service/URLS';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData } from '../../Redux/action';
import { Info } from 'lucide-react'; 

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userName, Role } = useSelector((state) => state.user || {});

  const handleLogout = async () => {
    try {
      await postApi(URLS.Logout);
    } catch (error) {
      console.error('Error logging out:', error);
    }
    localStorage.removeItem('token');
    dispatch(clearUserData());
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link to="/dashboard/CostExplorer">
        <img src={logo} alt="CloudBalance Logo" className="h-10 w-auto" />
      </Link>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full shadow-sm">
          <div className="w-8 h-8 bg-white text-blue-600 flex items-center justify-center rounded-full shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A9.955 9.955 0 0112 15c2.21 0 4.247.714 5.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div className="text-sm text-blue-600">
            <div className="text-xs text-gray-500">Welcome,</div>
            <div className="font-bold">{userName || 'User Name'}</div>
            <div className="text-xs font-medium text-blue-500">{Role || 'ROLE_USER'}</div>
          </div>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <button
  onClick={handleLogout}
  className="text-white px-4 py-2 rounded-md font-semibold"
  style={{
    backgroundColor: 'rgb(59, 130, 246)',
    transition: 'background-color 0.3s',
  }}
  onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgb(37, 99, 235)')}
  onMouseLeave={(e) => (e.target.style.backgroundColor = 'rgb(59, 130, 246)')}
>
  Logout
</button>

      </div>
    </header>
  );
};

export default Navbar;
