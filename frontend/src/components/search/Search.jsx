import React, { useState, useEffect } from 'react';
import './search.css';
import { usePostsContext } from '../../hooks/usePostsContext';
import axios from 'axios';

function Search() {
  const [commentOption, setCommentOption] = useState('1');
  const [filteredArray, setFilteredArray] = useState(null);
  const [postsArr, setPostsArr] = useState(null);
  const [statusOption, setStatusOption] = useState('1');
  const [userName, setUserName] = useState('');
  const { dispatch } = usePostsContext();

  useEffect(() => {
    axios.get("http://localhost:5000/api/public/posts")
      .then((response) => setPostsArr(response.data))
      .catch(error => console.log(error.message));
  }, []);

  useEffect(() => {
    if (postsArr != null && postsArr.length > 0) {
      let filteredPosts = [...postsArr];

      if (commentOption === '1') {
        filteredPosts.sort((a, b) => b.comments.length - a.comments.length);
      } else if (commentOption === '2') {
        filteredPosts.sort((a, b) => a.comments.length - b.comments.length);
      }

      if (statusOption === '1') {
        filteredPosts = filteredPosts.filter(post => post.status === 'available');
      } else if (statusOption === '2') {
        filteredPosts = filteredPosts.filter(post => post.status === 'not--available');
      }

      if (userName) {
        const searchTerm = userName.toLowerCase();
        filteredPosts = filteredPosts.filter(post =>
          post.user.name.toLowerCase().includes(searchTerm)
        );
      }

      setFilteredArray(filteredPosts);
    }
  }, [commentOption, userName, statusOption, postsArr]);

  useEffect(() => {
    if (filteredArray) {
      console.log("dispatched ");
      dispatch({ type: "SET__POSTS", payload: filteredArray });
    }
  }, [filteredArray, dispatch]);

  return (
    <div action="#" className='search-post-form'>
      <div className="text" style={{ color: "var(--primary-color)" }}>
        filter
      </div>
      <div className="form-row">
        <label htmlFor="commentOptions">Comment </label>
        <select
          id="commentOptions"
          className="input-data"
          value={commentOption}
          onChange={(e) => setCommentOption(e.target.value)}
        >
          <option value="1">most commented</option>
          <option value="2">less commented</option>
        </select>

        <label htmlFor="statusOptions">Status </label>
        <select
          id="statusOptions"
          className="input-data"
          value={statusOption}
          onChange={(e) => setStatusOption(e.target.value)}
        >
          <option value="1">available</option>
          <option value="2">not available</option>
        </select>
      </div>

      <input
        type="text"
        name="userName"
        placeholder='user name'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      /><br />
    </div>
  );
}

export default Search;