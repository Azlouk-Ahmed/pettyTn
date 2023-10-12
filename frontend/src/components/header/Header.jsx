import React from 'react';
import './Header.css'
import { useAuthContext } from '../../hooks/useAuthContext';

function Header() {
  const {auth} = useAuthContext();
  let name = "";
  let surname = "";
  if (auth && auth.user) {
    name = auth.user.name || "";
    surname = auth.user.surname || "";
    console.log(name, surname);
  } else {
    console.log("no user");
  }
  return (
    <div className="nav-bar-container">
      <div className='logocontainer'>
      <img src="\img\logo1.png" alt="" className='logo'/>
      </div>
        <div className="nav-bar-links">
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
        {auth && (
          <p className='nom'>
            {name} {surname}
          </p>

        )}
      </div>
      <div className="rouge" >
      {auth && (
          
          <img src={"/img/"+auth.user.img} alt="" className='profilpic' />

        )}
      </div>
      </div>
      
    </div>
  )
}

export default Header;
