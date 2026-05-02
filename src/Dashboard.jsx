import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      
     
      <div className="card shadow w-100" style={{ maxWidth: '400px', borderRadius: '15px' }}>
        <div className="card-body p-4 text-center">
          <h2 className="fw-bold mb-3">User Dashboard</h2>
          
          <div className="alert alert-success py-2">
            <p className="lead mb-0" style={{ fontSize: '1rem' }}>
              Successfully logged in!
            </p>
          </div>

          <p className="text-muted small mb-4">
            Welcome back to your secure session.
          </p>

          <button 
            className="btn btn-danger w-100 py-2 shadow-sm" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;