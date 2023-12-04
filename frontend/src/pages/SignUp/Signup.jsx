import React,  { useState, useEffect } from 'react'
import './Signup.css'
import { CiImageOn } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { useSign } from '../../hooks/useSignUp';
import { Link } from 'react-router-dom';

const themes = [
  {
   background: "var(--bg-color)",
    color: "var(--text-color)",
    primaryColor: "var(--third-color)"
  },
  {
   background: "var(--bg-color)",
   color: "var(--text-color)",
   primaryColor: "var(--secondary-color)"
  },
  {
   background: "var(--bg-color)",
   color: "var(--text-color)",
   primaryColor: "var(--prim-color)"
  }
];

const setTheme = (theme) => {
  const root = document.querySelector(":root");
  root.style.setProperty("--background", theme.background);
  root.style.setProperty("--color", theme.color);
  root.style.setProperty("--primary-color", theme.primaryColor);
};
const displayThemeButtons = () => {
  const btnContainer = document.querySelector(".theme-btn-container");
 themes.forEach((theme) => {
    const div = document.createElement("div");
    div.className = "theme-btn";
    div.style.cssText = `background: ${theme.primaryColor}; width: 25px; height: 25px`;
    btnContainer.appendChild(div);
    div.addEventListener("click", () => setTheme(theme));
  });
};

function Signup() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('');
  const [surname, setsurname] = useState('');
  const [imagePath, setImagePath] = useState("");
  const [country, setCountry] = useState('');
  const [location, setLocation] = useState('');
  const [codePostal, setcodePostal] = useState('');
  const {signup, loading, error} = useSign();
  useEffect(() => {
    displayThemeButtons();
  }, []);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlenameChange = (e) => {
    setname(e.target.value);
  };

  const handlesurnameChange = (e) => {
    setsurname(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handlecodePostalChange = (e) => {
    setcodePostal(e.target.value);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    await signup(email, password, codePostal, location, country, imagePath, name, surname, role );
  };

  return (
    

    <section className="signup-container">
       <div className="Signupcont-container">
         <div className="circle circle-one"></div>
         
         <div className="form-container">
           <h1 className="opacity">Sign UP</h1>
           <form onSubmit={handleSubmit}>
           <div className="paralelle">
           <div className="first" style={{width: '45%'}}>
           <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          
        />

        <label>Mot de passe:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          
        />

        <label>Nom:</label>
        <input
          type="text"
          value={surname}
          onChange={handlesurnameChange}
          
        />

        <label>Prénom:</label>
        <input
          type="text"
          value={name}
          onChange={handlenameChange}
          
        />

        
           </div>
       <div className="second" style={{width: '45%'}}>
       <label className="input--image" htmlFor="inputTag">
            <IoMdAdd className="plus--icon icon" />
            <span>
              <CiImageOn className="icon" />
            </span>
            <input
              type="file"
              id="inputTag"
              accept="image/png, image/jpg, image/gif, image/jpeg"
              onChange={(e) => {const file = e.target.files[0];setImagePath(file.name); console.log(imagePath);}}
            />
            <p>{imagePath}</p>
      </label>
       <label>Pays:</label>
        <input
          type="text"
          value={country}
          onChange={handleCountryChange}
        />

        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
        />

        <label>Code Postal:</label>
        <input
          type="text"
          value={codePostal}
          onChange={handlecodePostalChange}
        />
       </div>
           </div>
           <button className={`opacity ${(loading)? 'disabled' : ''}`} disabled={loading} type="submit" >
               {
                `${(loading)? 'loading ...' : 'signup'}`
               }
             </button>
             {error && (
                <div className="error">
                  {error}
                </div>
             )}
          <div className="register-forget opacity">
             <Link to="/login">LOGIN</Link>
           </div>
      </form>
         
         </div>
         <div className="circle circle-two"></div>
       </div>
       <div className="theme-btn-container"></div>
     </section>
  );
}

export default Signup
