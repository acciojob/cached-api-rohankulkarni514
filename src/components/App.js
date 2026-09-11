import React, { useState, useEffect, useMemo } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postId, setPostId] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const memoizedData = useMemo(() => {
    if (!postId) return data;
    return data.filter((item) => item.id.toString() === postId.toString());
  }, [data, postId]);

  return (
    <div>
      <h1>Cached API Post Listing</h1>

      <div>
        <label htmlFor="postIdInput">Filter by Post ID: </label>
        <input
          id="postIdInput"
          type="number"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          placeholder="Enter Post ID"
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {memoizedData.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
