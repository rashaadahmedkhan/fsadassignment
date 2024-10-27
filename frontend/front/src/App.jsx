// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Books from './components/Books';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/books">Books</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books" element={<Books />} />
          <Route path="/" element={<h2>Welcome to the Book App!</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
