import React, { useState } from 'react'
import { usePostsContext } from '../../hooks/usePostsContext';
import Loading from '../loading/Loading';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';

function AcceptReject({post}) {
    const [AcceptLoading, setAcceptLoading] = useState(null);
    const {dispatch} = usePostsContext();
    const { auth } = useAuthContext();
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
          const status = "available";
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
    <>{AcceptLoading && (
        <Loading />
      )}
      {!AcceptLoading && (
        <td className="df">
          <div className="action" onClick={() => acceptPost(post)}>
            accept
          </div>
          <div className="logout" onClick={() => deletePost(post._id)}>
            reject
          </div>
        </td>
        
      )}
    </>
)
}

export default AcceptReject