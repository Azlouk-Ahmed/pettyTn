import React, { useEffect, useState } from 'react'
import './timeline.css'
import axios from 'axios'
import Post from '../../components/post/Post';

function Timeline() {

    const [posts, setPosts] = useState(null);
    useEffect(() => {
      axios.get("http://localhost:5000/api/public/posts")
      .then((Response) => {
        setPosts(Response.data);
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