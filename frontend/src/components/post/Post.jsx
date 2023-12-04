import React, { useState } from 'react'
import "./post.css"
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import CommentModal from '../comments modal/CommentModal';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import { usePostsContext } from '../../hooks/usePostsContext';
import { Link } from 'react-router-dom';



function Post(props) {
  const {dispatch} = usePostsContext();
    const [comment, setComment] = useState("");
    const [accepted, setAccepted] = useState(false);
    const {auth} = useAuthContext();
    const {post} = props;
    const handleComment = async () => {
      axios
      .put(`http://localhost:5000/api/public/comment/${post._id}`, { comment }, {
        headers: {
          'authorization': `Bearer ${auth.token}`
        }
      })
      .then(response => {
        setComment("");
        dispatch({type : "UPDATE__POST",payload : response.data})
      })
      .catch(error => {
        console.error('Error:', error);
      });
      };
      const sendReq = async (id) => {
        setAccepted(true)
        try {
          if(auth.token){
            const response = await axios.post(`http://localhost:5000/api/requests/${id}`, {
            }, {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            });
            console.log(response);

          }
        } catch (error) {
          console.error(error);
        }
      }
  return (
<>
    <div className="post-details">
          <CommentModal comments={post.comments} />
        <span className={post.status}> {post.status}</span>
      <div className="user-info">
        <div className='user-info-wrapper'>
          <img src={(post.user.img)?"/img/"+post.user.img : '/img/default.png'}/>
          <div className='user-info'>
            <p>{post.user.name} - {post.user.surname}</p>
            <p>posted {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}</p>
          </div>
        </div>
        <span className='contact'>direct message : <Link to={`/timeline/contact/${post.user.email}/${post.user.name}`}> <span> {post.user.email}</span> </Link></span>
      </div>
      <div className="post-content">
        <h4>{post.title}</h4>
        <p> {post.description}  </p>
        <div className="post-image-holder">
          <img className="post-img" src={post.animalImg} alt="" />
        </div>
      </div>
      <div className="nb">
        <span>important</span>  : {post.nb}
      </div>
        {post.status == "available" && !accepted && auth && <div className="order-now-btn" onClick={() =>sendReq(post._id)}>
            order now
        </div>}
        {accepted && <div className='accepted'>request has been submitted to admins</div>}
        <div className="input">
            <div className='user-info-wrapper'>
              {
                auth &&
                  <img src={(auth.user.img)?"/img/"+auth.user.img : '/img/default.png'}/>
              }
            </div>
            {auth &&<div>
            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} id="" /> <button onClick={handleComment} className="primary--button">add comment</button>
            </div>}
        </div>
    </div> 
  
</>
  );
}

export default Post