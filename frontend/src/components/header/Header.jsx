import React from 'react';
import './Header.css'
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout';

function Header() {
  const { logout } = useLogout()
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

  const handleClick = () => {
    logout();
  }
  return (
    <div className="nav-bar-container">
      <div className='logocontainer'>
      <Link to="/">
        <img src="\img\logo1.png" alt="" className='logo'/>
      </Link>
      </div>
        {/* <div className="nav-bar-links">
        <ul >
          <li><a href="#">Home</a></li>
          <li><a href="#">Pets</a></li>
          <li><a href="#">About us</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div> */}
      {auth && <Link className="secondary--button" to="/timeline">
        view posts
      </Link>}
      {!auth && (
        <div className='login'>
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      )}

      
      
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
      {auth && (
        <div>
          <button onClick={handleClick} className='logout'>logout</button>
        </div>
      )}
    </div>
  )
}

export default Header;