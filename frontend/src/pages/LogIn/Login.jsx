 import React, { useState, useEffect } from 'react';
 import './Login.css'; // Assurez-vous que le chemin est correct
import { useLogin } from '../../hooks/useLogin';
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
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const {login, loading, error} = useLogin();
   const handleemailChange = (e) => {
     setEmail(e.target.value);
   };

   const handlePasswordChange = (e) => {
     setPassword(e.target.value);
   };

  const handleSubmit =async (e) => {
    e.preventDefault();
    await login(email, password);
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
               placeholder="email"
               value={email}
               onChange={handleemailChange}
             />
             <input
               type="password"
               placeholder="PASSWORD"
               value={password}
               onChange={handlePasswordChange}
             />
             <button className={`opacity ${(loading)? 'disabled' : ''}`} disabled={loading} type="submit" >
               {
                `${(loading)? 'loading ...' : 'login'}`
               }
             </button>
             {error && (
                <div className="error">
                  {error}
                </div>
             )}
           </form>
          <div className="register-forget opacity">
             <Link to="/signup">REGISTER</Link>
           </div>
         </div>
         <div className="circle circle-two"></div>
       </div>
       <div className="theme-btn-container"></div>
     </section>
    
   );
 }

 export default Login;
