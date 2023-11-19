import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import "./request.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import emailjs from 'emailjs-com';

function RequestCard({ request }) {
  const { auth } = useAuthContext();
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);

  const deleteReq = async (id) => {
    try {
      if (auth.user.role === "admin") {
        const response = await axios.delete(`http://localhost:5000/api/requests/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        console.log(response);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateStatus = async (id) => {
    try {
      if (auth.user.role === "admin") {
        const response = await axios.put(`http://localhost:5000/api/public/updatestatus/${id}`, {}, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        console.log("updated status");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const sendAcception = (req) => {
    setAccepted(true);
    emailjs.send("service_oh4sy9l", "template_061iovj", {
      name: req.user.name,
      surname: req.user.name,
      message: "Your adoption has been accepted. Your pet will be there in 3 days.",
      email: req.user.email,
    }, '5ddo6PQPTT7fIycvW')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    deleteReq(req._id);
    updateStatus(req.post._id);
  };

  const sendRejection = (req) => {
    setRejected(true);
    deleteReq(req._id);
  };

  return (
    <div className='post-details w-100'>
      <div className="user-info">
        <div className='user-info-wrapper'>
          <img src={request.user.img} alt="User" />
          <div className='user-info'>
            <p><span className='g-color'> {request.user.name} - {request.user.surname} </span>, a user from <span className='g-color'> {request.user.country}, {request.user.location} , {request.user.codePostal} </span></p>
            <p className='r-color'>Has requested to adopt this {formatDistanceToNow(new Date(request.createdAt), {
              addSuffix: true,
            })}</p>
          </div>
        </div>
        <span className='contact'>Contact: <span> {request.user.email}</span></span>
      </div>

      <h5>The Announcement</h5>
      <div className="post-content">
        <h4>{request.post.title}</h4>
        <p> {request.post.description}</p>
        <div className="post-image-holder">
          <img className="post-img" src={request.post.animalImg} alt="Animal" />
        </div>
      </div>

      {!accepted && !rejected && (
        <div className="df space-b">
          <div className="order-now-btn" onClick={() => sendAcception(request)}>
            Accept Request
          </div>
          <div className="reject" onClick={() => sendRejection(request)}>
            Reject Request
          </div>
        </div>
      )}

      {accepted && <div className='accepted'>Request accepted!</div>}
      {rejected && <div className='rejected'>Request rejected!</div>}
    </div>
  );
}

export default RequestCard;