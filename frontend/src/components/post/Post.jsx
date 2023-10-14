import React, { useState } from 'react'
import "./post.css"
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import CommentModal from '../comments modal/CommentModal';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';



function Post(props) {
    const [comment, setComment] = useState("");
    const {auth} = useAuthContext();
    const {post} = props
    const handleComment = async () => {
        try {
          const response = await axios.put(`http://localhost:5000/api/public/comment/${post._id}`, {comment}, {
            headers: {
              'authorization': `Bearer ${auth.token}`
            }
          });
      
          if (response.status === 200) {
            setComment("");
          } else {
            console.error('Request failed with status code:', response.status);
            console.error('Response data:', response.data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  return (
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
        <span className='contact'>conact :  <span> {post.contactMail}</span></span>
      </div>
      <div className="post-content">
        <h4>{post.title}</h4>
        <p> {post.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium, eveniet eius? Molestiae eligendi, minus reiciendis magni quia voluptate error debitis cumque eius perferendis illo illum possimus consectetur quisquam eveniet quibusdam? </p>
        <div className="post-image-holder">
          <img className="post-img" src={post.animalImg} alt="" />
        </div>
      </div>
      <div className="nb">
        <span>important</span>  : Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, expedita.
      </div>
        <div className="order-now-btn">
            order now
        </div>
        <div className="input">
            <div className='user-info-wrapper'>
            <img src={(auth.user.img)?"/img/"+auth.user.img : '/img/default.png'}/>
            </div>
            <div>
            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} id="" /> <button onClick={handleComment} className="primary--button">add comment</button>
            </div>
        </div>

    </div>
  );
}

export default Post