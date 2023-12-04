import React, { useState } from 'react'
import "./postform.css"
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';

function PostForm() {
    const [posted, setPosted] = useState(false);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [animalImg, setAnimalImg] = useState('');
    const [nb, setNb] = useState('');
    const {auth} = useAuthContext();
    const contactMail = "dsf";
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setPosted(true);
      //console.log('Form submitted:', { description, title, animalImg,contactMail, nb });
      axios.post(`http://localhost:5000/api/admin/submit`, { description, title, animalImg,contactMail, nb }, {
          headers: {
            'authorization': `Bearer ${auth.token}`
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      setDescription('');
      setTitle("");
      setAnimalImg("");
      setNb("");
    };
  return (
    <form onSubmit={handleSubmit} className='postform'>
        <h3>submit an annoucement</h3>
      <div className="title-container">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />
      </div>
      <div className="animalImg-container">
        <label htmlFor="animalImg">Animal Image:</label>
        <input
          type="text"
          id="animalImg"
          value={animalImg}
          onChange={(e) => setAnimalImg(e.target.value)}
          className="animalImg-input"
        />
      </div>
      <div className="description-container">
        <label htmlFor="description">Description:</label>
        <textarea name="" id="" cols="30" rows="10"
        value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="description-input">

        </textarea>
      </div>

    

      

      <div className="nb-container">
        <label htmlFor="nb">important:</label>
        <input
          type="text"
          id="nb"
          value={nb}
          onChange={(e) => setNb(e.target.value)}
          className="nb-input"
        />
      </div>
      {!posted && <button type="submit" className='primary--button'>Submit</button>}
      {posted && <div className='accepted'>this post has been submited to admins</div>}
    </form>
  )
}

export default PostForm