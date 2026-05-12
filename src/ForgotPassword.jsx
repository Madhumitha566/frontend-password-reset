import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  const token = localStorage.getItem('token');
  
  try {
    // 1. Send the forgot-password request to Render backend
    const res = await axios.post(
      'https://password-reset-backend-bjic.onrender.com/api/auth/forgot-password', 
      { email }, 
      { 
        timeout: 10000,
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      }
    );

    alert(res.data.message);

    // 2. Trigger the notification email using your deployed Render backend router
    try {
      await axios.post(
        'https://password-reset-backend-bjic.onrender.com/api/send-login-email', 
        {
          to: email,                                           
          subject: "Password Reset Notification",              
          html: "<html><body><p>Hello, a password reset was successfully requested for this account.</p></body></html>" 
        }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        }
      );
      console.log('Notification email triggered successfully');
    } catch (mailErr) {
      // Silently log email errors so it doesn't break the user experience if Brevo acts up
      console.error('Failed to trigger notification email:', mailErr.response?.data?.error || mailErr.message);
    }

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