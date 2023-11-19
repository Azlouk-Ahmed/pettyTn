import React from 'react'
import './addpost.css'
function Addpost() {
  return (
    
    <form action="#" className='add-post-form'>
     <div className="text" style={{color:"var(--primary-color)"}}>
         add post
      </div>
    <div className="form-row">
      <div className="input-data" style={{marginBottom:"4%"}}>
        <input type="text" required />
        <div className="underline"></div>
        <label htmlFor="">First Name</label>
      </div>
      <div className="input-data" style={{marginBottom:"4%"}}>
        <input type="text" required />
        <div className="underline"></div>
        <label htmlFor="">Email Address</label>
      </div>
    
    <div className="form-row">
      <div className="input-data" style={{marginBottom:"4%"}}>
        <input type="text" required />
        <div className="underline"></div>
        <label htmlFor="">Title</label>
      </div>
      <div className="input-data" style={{marginBottom:"4%"}}>
        <input type="text" required />
        <div className="underline"></div>
        <label htmlFor="">Image de l'animal</label>
      </div>
    </div>
    
      <div className="input-data textarea" style={{marginBottom:"4%"}}>
        <textarea rows="8" cols="80" required></textarea>
        <br />
        <div className="underline"></div>
        <label htmlFor="">Description</label>
      </div>
      <div className="input-data" style={{marginBottom:"4%"}}>
        <input type="text" required />
        <div className="underline"></div>
        <label htmlFor="">Contact Email</label>
      </div>
      <div className="input-data" style={{marginBottom:"4%"}}>
        <input type="number" required />
        <div className="underline"></div>
        <label htmlFor="">Number</label>
      </div>
      <div className="input-data" style={{marginBottom:"4%"}}>
        <input type="text" required />
        <div className="underline"></div>
        <label htmlFor="">Status</label>
      </div>
      <br />
      <div className="form-row submit-btn">
        <div className="input-data">
          <div className="inner"></div>
          <input type="submit" value="Submit" />
        </div>
      </div>
    </div>
  </form>
  )
}

export default Addpost
