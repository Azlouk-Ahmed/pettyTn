import React from 'react'
import "./about.css"
import {BsEmojiSmile} from "react-icons/bs"
import {PiDog} from "react-icons/pi"
import {AiOutlineUser} from "react-icons/ai"
import CountUp from 'react-countup';

function About() {
  return (
    <div className='about'>
        <div className="about--container">
            <h3>who are we ?

            <p>the numbers speaks about us</p>
            </h3>
            <div className="acheivments">
                <div className="numbers--box">
                    <span>+<CountUp end={125} duration={1.75} enableScrollSpy={true}  /></span>
                    <span><BsEmojiSmile /></span>
                    <p>
                    happy adopters and counting! Join the growing community of joyous pet lovers who found their perfect companions through PETTYTN.
                    </p>
                </div>
                <div className="numbers--box">
                    <span>+ <CountUp end={60} duration={1.75} enableScrollSpy={true}  /></span>
                    <span><PiDog /></span>
                    <p>
                    animals eagerly awaiting adoption! These adorable companions are ready to bring joy, love, and endless smiles into your life 
                    </p>
                </div>
                <div className="numbers--box">
                    <span>+<CountUp end={5} duration={1.75} enableScrollSpy={true}  /></span>
                    <span><AiOutlineUser /></span>
                    <p>
                    successful society collaborations! PETTYTN is proud to have partnered with five incredible societies dedicated to animal welfare and well-being
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About