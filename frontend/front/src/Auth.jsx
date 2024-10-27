// src/Auth.js
import React, { useState } from 'react';

const Auth = ({ onLogin, onLogout, isAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to authenticate
    if (username && password) {
      onLogin(username); // Simulate login
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Welcome, {username}!</h2>
          <button onClick={onLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Auth;
