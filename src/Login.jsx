import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      
      const res = await axios.post('https://password-reset-backend-bjic.onrender.com/api/auth/login', { email, password });
      
      
      localStorage.setItem('token', res.data.token);
      alert("Login successful!");
      navigate('/dashboard');
    } catch (err) {
     
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (

    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow w-100" style={{ maxWidth: '400px', borderRadius: '15px' }}>
        <div className="card-body p-4">
          <h3 className="text-center mb-4 fw-bold">Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="Enter Your Email"
                required 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Enter Password"
                required 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <button className="btn btn-primary w-100 mb-3 py-2">Login</button>
            <div className="text-center">
              <Link to="/forgot-password" style={{ fontSize: '0.9rem' }} className="text-decoration-none">
                Forgot Password?
              </Link>
            </div>
          </form>
          <hr />
          <p className="text-center mb-0">
            New user? <Link to="/signup" className="text-decoration-none fw-bold">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  
  );
};

export default Login;
