import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags');
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog =>
    blog.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredBlogs.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <nav>
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              <button className="page-link" onClick={() => handlePageChange(number)}>
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  if (loading) {
    return <p>Loading...</p>; // Display loading message
  }

  if (error) {
    return <p className="text-danger">{error}</p>; // Display error message
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center">Blog List</h1>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="row">
        {currentItems.map((blog, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <Link to={`/blogs/${index}`}>
                <img src={blog.flags.png} className="card-img-top" alt={`${blog.name.common} flag`} />
                <div className="card-body">
                  <h5 className="card-title">{blog.name.common}</h5>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {renderPagination()}
    </div>
  );
};

export default BlogList;