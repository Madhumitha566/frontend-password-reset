import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://password-reset-backend-bjic.onrender.com/api/auth/forgot-password', { email });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong"); 
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      
      
      <div className="card shadow w-100" style={{ maxWidth: '400px', borderRadius: '15px' }}>
        <div className="card-body p-4">
          <h3 className="text-center mb-3 fw-bold">Forgot Password</h3>
          <p className="text-muted text-center mb-4 small">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-control py-2" 
                placeholder="name@example.com" 
                required 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            
            <button 
              className="btn btn-primary w-100 py-2 mb-3 shadow-sm" 
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="text-center">
            <Link to="/login" className="text-decoration-none small fw-bold">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;