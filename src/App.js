import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import Login from './components/Login'; 
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import Navbar from './components/Navbar';
import './index.css';
import Home from './components/Home';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags');
      setBlogs(response.data);
    };
    fetchBlogs();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<BlogList blogs={blogs} />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/blogs/:id" 
              element={
                <ProtectedRoute>
                  <BlogDetail blogs={blogs} />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
