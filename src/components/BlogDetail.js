import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BlogDetail = ({ blogs }) => {
  const { id } = useParams();
  const blog = blogs[id];
  const { user } = useAuth();

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment) {
      setComments([...comments, { text: comment, user: user.username }]);
      setComment('');
    }
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    }
  };

  if (!blog) {
    return <h2>Blog not found</h2>;
  }

  return (
    <div>
      <h1>{blog.name.common}</h1>
      <img src={blog.flags.png} alt={`${blog.name.common} flag`} />
      <p>Official Name: {blog.name.official}</p>
      <p>Native Name: {Object.values(blog.name.nativeName).map(name => name.common).join(', ')}</p>

      <button onClick={handleLike} disabled={hasLiked}>
        {hasLiked ? 'Liked' : `Like ${likes}`}
      </button>

      <h2>Comments</h2>
      <ul>
        {comments.map((c, index) => (
          <li key={index}>
            <strong>{c.user}:</strong> {c.text}
          </li>
        ))}
      </ul>

      {user ? ( 
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>Please log in to add a comment.</p>
      )}
    </div>
  );
};

export default BlogDetail;
