import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link, useParams } from 'react-router-dom';

function Contact() {
  const {auth} = useAuthContext();
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const { email , name } = useParams();
  const handleSubmit = (e) => {
      e.preventDefault();
      setSent(true);
      if(auth){
          emailjs.send("service_fgo0vcr", "template_rczs0n4", {
            sender_name: auth.user.name+" "+auth.user.surname,
            receiver_name: name,
            message: message,
            receiver_mail: email,
            sender_email: auth.user.email,
          }, '5ddo6PQPTT7fIycvW')
            .then((result) => {
              console.log(result);
            }, (error) => {
              console.log(error.text);
            });
      }
    setMessage('');
  };

  return (
    <div>
      <form action="" className='postform p-none' onSubmit={handleSubmit}>
        <div className="message ">
          <label htmlFor="description">message:</label>
          <textarea
            id="message"
            cols="30"
            rows="10"
            className="description-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        {!sent && <button className='submit--btn' type="submit">submit message</button>}
        {sent && <span className='accepted' type="submit">message sent ! <Link to="../timeline">go back to timeline</Link> </span>}
      </form>
    </div>
  );
}

export default Contact;