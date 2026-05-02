import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();


    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    setLoading(true);
    try {
    
      const response = await axios.post(`https://password-reset-backend-bjic.onrender.com/api/auth/reset-password/${token}`, { 
        password 
      });

  
      alert(response.data.message || "Password updated successfully!");
      navigate('/login');
    } catch (err) {
     
      alert(err.response?.data?.message || "Link expired or invalid. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow" style={{ maxWidth: '450px' }}>
        <div className="card-body p-4">
          <h3 className="text-center mb-4">Set New Password</h3>
          <p className="text-muted text-center mb-4">
            Enter your new password below to update your account.
          </p>

          <form onSubmit={handleReset}>
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="********"
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

           
            <div className="mb-4">
              <label className="form-label">Confirm New Password</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="********"
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} 
              />
            </div>

            
            <button 
              type="submit" 
              className="btn btn-success w-100" 
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;