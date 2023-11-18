import React, { useEffect, useState } from 'react';
import "./pending.css";
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Loading from "../../components/loading/Loading"
import { usePostsContext } from '../../hooks/usePostsContext';
import AcceptReject from "../../components/AcceptReject/AcceptReject"

function Pending() {
  const { auth } = useAuthContext();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(null);
  const [AcceptLoading, setAcceptLoading] = useState(null);
  const token = auth ? auth.token : '';
  const {pending, dispatch} = usePostsContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth) {
          setLoading(true);
          const response = await axios.get('http://localhost:5000/api/admin/submittedPosts', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPosts(response.data);
          dispatch({type: "SET__PEDNING__POSTS",payload : response.data})
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, [auth, token]);

  const deletePost = async (id) => {
    try {
      if (auth.user.role === "admin") {
        const response = await axios.delete(`http://localhost:5000/api/admin/delete/post/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        dispatch({type: "DEL__PEDNING__POSTS",payload : response.data})

      }
    } catch (error) {
      console.error(error);
    }
  }

  const acceptPost = async (postObject) => {
    try {
      setAcceptLoading(true);
      const user_id = postObject.user._id;
      const status = "active";
      const { title, description, animalImg, contactMail, nb } = postObject;
      const response = await axios.post('http://localhost:5000/api/public/posts', {
        user_id,
        title,
        description,
        animalImg,
        contactMail,
        nb,
        status
      }, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log(response.data._id);
      deletePost(postObject._id);
      setAcceptLoading(false);
    } catch (error) {
      setAcceptLoading(false);
      console.error(error);
    }
  }
  
  return (
    <div className='pending'>
      <h2>pending posts from users :</h2>
      {loading ? (
        <Loading />
      ) : (
        pending && pending.length !== 0 ? (
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
              {pending.map((post, index) => (
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
                   <AcceptReject post={post} />
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No pending posts found.</p>
        )
      )}
    </div>
  );
}

export default Pending;