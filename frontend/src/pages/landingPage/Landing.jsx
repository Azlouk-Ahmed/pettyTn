import React from 'react'
import Header from '../../components/header/Header'
import './landing.css'
import { useState, useEffect } from 'react';
import Footer from '../../components/footer/Footer';
import News from '../../components/new/News';
import TheyNeedYou from '../../components/theyNeedYou/TheyNeedYou';
import About from '../../components/about/About';
import OurFrineds from '../../components/meetourfriends/OurFrineds';
import Slider from "../../components/slider/Slider"


function Landing() {
    const [text, setText] = useState('Welcome to Petty Tn!');
    const fullText = "Welcome to Petty Tn!";
  
    // useEffect(() => {
    //   let currentIndex = 0;
  
    //   const intervalId = setInterval(() => {
    //     if (currentIndex === fullText.length) {
    //       clearInterval(intervalId);
    //     } else {
    //       setText(fullText.slice(0, currentIndex + 1));
    //       currentIndex++;
    //     }
    //   }, 100); // Vous pouvez ajuster la vitesse de frappe en modifiant cet intervalle
  
    //   return () => {
    //     clearInterval(intervalId);
    //   };
    // }, []);
  return (
    <>
      
    <div className='landing'>
      <section className="landpagecontent">
   <div className='paragraphe'>
   <img src="\img\pate.png" alt="" />
   <h3>{text}</h3>
        <p className='landing-parag'>
          Find your furry friend and give them a forever home. Our mission is to connect loving pet owners with adorable animals in need of a loving family. 
          <span>
            <button className="primary--button" style={{margin:"1%"}}>
              login
            </button>
            <button className="secondary--button" style={{margin:"1%"}}>
              view animals posts
            </button>

          </span>
        </p>
   </div>     

        <div className="picture">
          <img src="\img\image_processing20220523-1623-1mqcn9i.png" alt="" />
        </div>
      </section>
      <About />
      <News />
      <TheyNeedYou />
      <Slider />
      <OurFrineds />
      <Footer />
    </div>

    </>
  )
}

export default Landing
