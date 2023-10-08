 import React, { useState, useEffect } from 'react';
 import './Login.css'; // Assurez-vous que le chemin est correct

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
    primaryColor: "var(--primary-color)"
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
 function Login() {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const handleUsernameChange = (e) => {
     setUsername(e.target.value);
   };

   const handlePasswordChange = (e) => {
     setPassword(e.target.value);
   };

  const handleSubmit = (e) => {
    e.preventDefault();
     // Ajoutez ici la logique pour traiter les données du formulaire, par exemple, envoyer une requête API de connexion.
   };

   useEffect(() => {
     displayThemeButtons();
   }, []);
   return (
     <section className="signupLogin-container">
       <div className="login-container">
         <div className="circle circle-one"></div>
         <div className="formone-container">
           <img
             src="\img\jumpdog-removebg.png"
             alt="illustration"
             className="illustration"
           />
           <h1 className="opacity">LOGIN</h1>
           <form onSubmit={handleSubmit}>
             <input
               type="text"
               placeholder="USERNAME"
               value={username}
               onChange={handleUsernameChange}
             />
             <input
               type="password"
               placeholder="PASSWORD"
               value={password}
               onChange={handlePasswordChange}
             />
             <button className="opacity" type="submit">
               LOGIN
             </button>
           </form>
          <div className="register-forget opacity">
             <a href="">REGISTER</a>
             <a href="">FORGOT PASSWORD</a>
           </div>
         </div>
         <div className="circle circle-two"></div>
       </div>
       <div className="theme-btn-container"></div>
     </section>
    
   );
 }

 export default Login;
