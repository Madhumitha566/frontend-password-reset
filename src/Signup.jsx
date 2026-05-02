import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return alert("Passwords don't match");

    try {
      const res = await axios.post('https://password-reset-backend-bjic.onrender.com/api/auth/signup', {
        email: formData.email,
        password: formData.password
      });

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        alert("Account created and logged in!");
        navigate('/dashboard'); 
      }
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
  
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      

      <div className="card shadow w-100" style={{ maxWidth: '400px', borderRadius: '15px' }}>
        <div className="card-body p-4">
          <h3 className="text-center mb-4 fw-bold">Create Account</h3>
          
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="Enter Your Email"
                required 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="********"
                required 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="********"
                required 
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
              />
            </div>

            <button className="btn btn-success w-100 py-2 mb-3 shadow-sm">
              Sign Up
            </button>
          </form>

          <hr />
          
          <p className="mt-3 text-center mb-0">
            Already have an account? <Link to="/login" className="text-decoration-none fw-bold">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
