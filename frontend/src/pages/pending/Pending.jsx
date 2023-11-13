import React, { useEffect, useState } from 'react';
import "./pending.css";
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function Pending() {
    const {auth} = useAuthContext();
    const [posts, setPosts] = useState([]);
    const token = auth ? auth.token : '';

    useEffect(() => {
        const fetchData = async () => {
          try {
            if (auth) {
              const response = await axios.get('http://localhost:5000/api/admin/submittedPosts', {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              setPosts(response.data);
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, [auth, token]);
  console.log(posts);  
  return (
    <div className='pending'>
      <h2>pending posts from users :</h2>
      {posts ? (
        <table>
          <thead>
            <tr>
              <th>User <span className="icon-arrow">↑</span></th>
              <th>Loc <span className="icon-arrow">↑</span></th>
              <th>Title <span className="icon-arrow">↑</span></th>
              <th>Desc <span className="icon-arrow">↑</span></th>
              <th>image <span className="icon-arrow">↑</span></th>
              <th>email <span className="icon-arrow">↑</span></th>
              <th>Alert <span className="icon-arrow">↑</span></th>
              <th>Posted <span className="icon-arrow">↑</span></th>
              <th>action <span className="icon-arrow">↑</span></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={index}>
                <td><img src={`/img/${post.user.img}`} alt="" /> {post.user.name} {post.user.surname}</td>
                <td>{post.user.location}</td>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td><img src={post.animalImg} alt="" /></td>
                <td>{post.contactMail}</td>
                <td>{post.nb}</td>
                <td>
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </td>
                <td className='df'>
                  <div className="action">accept</div>
                  <div className="logout">reject</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Fetching data...</p>
      )}
    </div>
  );
}

export default Pending;