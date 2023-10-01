import React from 'react';
import './Header.css'

function Header() {
  return (
    <div className="container">
      <div className='logocontainer'>
      <img src="\img\logo1.png" alt="" className='logo'/>
      </div>
        <div className="links">
        <ul >
          <li><a href="#">Home</a></li>
          <li><a href="#">Pets</a></li>
          <li><a href="#">About us</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div className='login'>
      <a href="#">Log in</a>
      <a href="#">Sign up</a>
      </div>
      
      <div className="profil">
      <div className="profilname">
        <p className='nom'>anis allagui</p>
       
      </div>
      <div className="rouge" ><img src="\img\avatar.avif" alt="" className='profilpic' /></div>
      </div>
      
    </div>
  )
}

export default Header;
