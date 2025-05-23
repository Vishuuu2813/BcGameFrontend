import React, { useState, useEffect } from 'react';

const Support = () => {
  const [time, setTime] = useState({
    hours: 2,
    minutes: 58,
    seconds: 32
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => {
        let hours = prevTime.hours;
        let minutes = prevTime.minutes;
        let seconds = prevTime.seconds - 1;

        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
        }

        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
        }

        if (hours < 0) {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '700px',
        padding: '0 20px'
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: '20px 0 30px'
        }}>
          <img 
            src="https://bc.game/assets/logo/logo.png" 
            alt="BC.GAME Logo"
            style={{
              height: '40px',
              width: 'auto'
            }}
          />
        </div>
        
        {/* Blue Notification */}
        <div style={{
          background: 'linear-gradient(90deg, #00d4aa, #00ff88)',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '25px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 4px 15px rgba(0, 212, 170, 0.3)'
        }}>
          <span>महत्वपूर्ण सूचना | BC.GAME</span>
        </div>
        
        {/* Timer Container */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            borderTop: '4px solid #00d4aa',
            animation: 'spin 1s linear infinite',
            marginBottom: '10px'
          }}></div>
          <div style={{
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '5px',
            fontSize: '14px'
          }}>
            शेष समय:
          </div>
          <div style={{
            color: '#00ff88',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            <span style={{ color: '#00ff88' }}>{String(time.hours).padStart(2, '0')}</span>
            <span style={{ color: '#00ff88' }}> घंटे </span>
            <span style={{ color: '#00ff88' }}>{String(time.minutes).padStart(2, '0')}</span>
            <span style={{ color: '#00ff88' }}> मिनट </span>
            <span style={{ color: '#00ff88' }}>{String(time.seconds).padStart(2, '0')}</span>
            <span style={{ color: '#00ff88' }}> सेकंड</span>
          </div>
        </div>
        
        {/* Warning Boxes */}
        <div style={{
          width: '90%',
          padding: '15px',
          borderRadius: '12px',
          marginBottom: '15px',
          fontSize: '14px',
          lineHeight: '1.5',
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255, 77, 87, 0.1)',
          border: '1px solid rgba(255, 77, 87, 0.3)',
          borderLeft: '4px solid #ff4d57',
          color: '#ff6b75'
        }}>
          <span style={{ marginRight: '10px', fontSize: '16px' }}>⚠️</span>
          <span>बार-बार लॉगिन करने की कोशिश ना करें, अन्यथा आपकी आईडी ब्लॉक हो देन की जा सकती है।</span>
        </div>
        
        <div style={{
          width: '90%',
          padding: '15px',
          borderRadius: '12px',
          marginBottom: '15px',
          fontSize: '14px',
          lineHeight: '1.5',
          background: 'rgba(0, 212, 170, 0.1)',
          border: '1px solid rgba(0, 212, 170, 0.3)',
          borderLeft: '4px solid #00d4aa',
          color: '#00ff88'
        }}>
          <span>आपका डिवाइस या इंटरनेट कनेक्शन कोई भी समस्या हमारी टीम द्वारा 3 घंटे के अंदर सुलझा दी जाएगी।</span>
        </div>
        
        <div style={{
          width: '90%',
          padding: '15px',
          borderRadius: '12px',
          marginBottom: '15px',
          fontSize: '14px',
          lineHeight: '1.5',
          background: 'rgba(255, 159, 67, 0.1)',
          border: '1px solid rgba(255, 159, 67, 0.3)',
          borderLeft: '4px solid #ff9f43',
          color: '#ffb366'
        }}>
          <span>जिस लिंक से आपने लॉगिन किया है, वह हमारी ऑफिशियल टीम का हिस्सा है। कृपया किसी अन्य व्यक्ति से संपर्क ना करें — धोखाधड़ी के मामले बढ़ रहे हैं।</span>
        </div>
        
        <div style={{
          width: '90%',
          padding: '15px',
          borderRadius: '12px',
          marginBottom: '20px',
          fontSize: '14px',
          lineHeight: '1.5',
          background: 'rgba(116, 185, 255, 0.1)',
          border: '1px solid rgba(116, 185, 255, 0.3)',
          borderLeft: '4px solid #74b9ff',
          color: '#74b9ff',
          textAlign: 'center',
          justifyContent: 'center',
          display: 'flex'
        }}>
          <span>"आपकी सुरक्षा, हमारी जिम्मेदारी - BC.GAME टीम"</span>
        </div>
        
        {/* Contact Box */}
        <div style={{
          background: 'rgba(37, 211, 102, 0.1)',
          border: '1px solid rgba(37, 211, 102, 0.3)',
          padding: '15px',
          borderRadius: '12px',
          width: '90%',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            color: '#25d366'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              marginRight: '10px',
              background: '#25d366',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              color: 'white'
            }}>
              W
            </div>
            <span>व्हाट्सएप्प सपोर्ट: 1234567890</span>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div style={{
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.6)',
        textAlign: 'center',
        marginTop: '20px',
        padding: '0 20px'
      }}>
        <span>© 2025 BC.GAME. सभी अधिकार सुरक्षित।</span>
        <div style={{
          marginTop: '5px',
          maxWidth: '300px',
          margin: '5px auto 0'
        }}>
          टीम से सम्पर्क करने के लिए मैसेजेस एवं चैट की आपकी सहमति करें।
        </div>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Support;