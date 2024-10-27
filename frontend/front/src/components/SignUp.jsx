// src/components/SignUp.js
import React, { useState } from 'react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();

        // Assuming the backend sends the JWT token in the response
        const token = data.token;
        
        // Save JWT token to localStorage (or sessionStorage)
        localStorage.setItem('jwtToken', token);

        console.log('Signup successful:', data);

        if(!response.ok) {
            const errorText = await response.text()
            console.error('error details: ', errorText)
            throw new Error('signup failed.')
        }
      } else {
        throw new Error('Signup failed');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;