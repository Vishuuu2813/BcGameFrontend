import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://bc-games-backend.vercel.app/api/admin/login', credentials);
      
      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminName', response.data.admin.name);
        
        // Redirect to dashboard
        navigate('/User-details-BcGame');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#f0f2f5',
      fontFamily: 'Arial, sans-serif',
      padding: '15px'
    }}>
      <div className="login-card" style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#ffffff',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '20px'
      }}>
        <div className="login-header" style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{
            margin: '0 0 10px',
            fontSize: '24px',
            color: '#333'
          }}>Admin Login</h2>
          <p style={{
            margin: '0',
            fontSize: '14px',
            color: '#666'
          }}>Enter your credentials to access the admin panel</p>
        </div>
        
        {error && <div className="error-message" style={{
          padding: '10px',
          background: '#fff0f0',
          color: '#e74c3c',
          margin: '0 0 15px',
          borderRadius: '3px',
          fontSize: '14px'
        }}>{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group" style={{
            marginBottom: '15px'
          }}>
            <label htmlFor="email" style={{
              display: 'block',
              marginBottom: '5px',
              fontSize: '14px',
              color: '#333'
            }}>Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              style={{
                width: '100%',
                padding: '8px 10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div className="form-group" style={{
            marginBottom: '20px'
          }}>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: '5px',
              fontSize: '14px',
              color: '#333'
            }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              style={{
                width: '100%',
                padding: '8px 10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <button
            type="submit"
            className="login-button"
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              background: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '15px',
              cursor: 'pointer',
              opacity: loading ? '0.7' : '1'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
       
      </div>
    </div>
  );
};

export default Login;