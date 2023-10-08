import React,  { useState, useEffect } from 'react'
import './Signup.css'

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
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState(null);
  const [country, setCountry] = useState('');
  const [location, setLocation] = useState('');
  const [postalCode, setPostalCode] = useState('');
  useEffect(() => {
    displayThemeButtons();
  }, []);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Ajoutez ici la logique de validation pour vérifier que le fichier est une image valide.
    setImage(file);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez ici la logique pour traiter les données du formulaire, par exemple, envoyer une requête API d'inscription.
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
          required
        />

        <label>Mot de passe:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />

        <label>Nom:</label>
        <input
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
          required
        />

        <label>Prénom:</label>
        <input
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
          required
        />

        
           </div>
       <div className="second" style={{width: '45%'}}>
       <label>Image de profil:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
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
          value={postalCode}
          onChange={handlePostalCodeChange}
        />
       </div>
           </div>
           <button className="opacity" type="submit">
               Sign Up
             </button>
          <div className="register-forget opacity">
             <a href="">S'INSCRIRE</a>
             <a href="">LOG IN</a>
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
