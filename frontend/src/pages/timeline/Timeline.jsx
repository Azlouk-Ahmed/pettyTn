import React, { useEffect, useState } from 'react'
import './timeline.css'
import axios from 'axios'
import Post from '../../components/post/Post';
import Header from "../../components/header/Header"
import { usePostsContext } from '../../hooks/usePostsContext';
import Loading from '../../components/loading/Loading';

function Timeline() {
  const {posts, dispatch} = usePostsContext();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5000/api/public/posts")
    .then((Response) => {
      console.log(Response.data);
      dispatch({type : "SET__POSTS", payload : Response.data})
      setLoading(false);
    })
    .catch(Error => {
      setLoading(true);
      console.log(Error);
      })
    }, [])
    
  return (
    <div className='timeline'>
    
      <Header />
      {loading == true ? (
        <Loading />
      ) : (
        (posts.length === 0) ? (
          <div>No posts yet</div>
        ) : (
          posts.map((post) => (
            <Post key={post._id} post={post} />
          ))
        )
      )}
    </div>
  )
}

export default Timeline