//Not Using This AnyMore 



import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Unauthorized = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.user.Role);
  const normalizedRole = role?.trim().toUpperCase();

  useEffect(() => {
    if (normalizedRole === 'ADMIN' || normalizedRole === 'READ_ONLY') {
      navigate('/dashboard', { replace: true });
    }
  }, [normalizedRole, navigate]);
  return (
    <div className="text-center p-10 text-red-600 text-2xl space-y-6">
      <div>You are not authorized to view this page.</div>
      <button
        onClick={() => navigate('/dashboard')}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Unauthorized;
