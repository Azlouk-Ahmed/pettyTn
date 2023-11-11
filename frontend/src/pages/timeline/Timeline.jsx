import React, { useEffect, useState } from 'react'
import './timeline.css'
import axios from 'axios'
import Post from '../../components/post/Post';
import { usePostsContext } from '../../hooks/usePostsContext';

function Timeline() {
  const {posts, dispatch} = usePostsContext();
  useEffect(() => {
    axios.get("http://localhost:5000/api/public/posts")
    .then((Response) => {
        console.log(Response.data);
        dispatch({type : "SET__POSTS", payload : Response.data})
      })
      .catch(Error => {
        console.log(Error);
      })
    }, [])
    
  return (
    <div className='timeline'>
        {(!posts)? (
            <div >fetching posts ...</div>
        ): posts.map((post) => {
            return (
                <Post key={post._id} post={post}/>
            )
        }) }
    </div>
  )
}

export default Timeline