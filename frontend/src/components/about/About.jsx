import React from 'react'
import "./about.css"
import {BsEmojiSmile} from "react-icons/bs"
import {PiDog} from "react-icons/pi"
import {AiOutlineUser} from "react-icons/ai"

function About() {
  return (
    <div className='about'>
        <div className="about--container">
            <h3>who are we ?

            <p>the numbers speaks about us</p>
            </h3>
            <div className="acheivments">
                <div className="numbers--box">
                    <span>+125</span>
                    <span><BsEmojiSmile /></span>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur corporis sunt dolorem, delectus recusandae corrupti laborum quae voluptatem iure magnam?
                    </p>
                </div>
                <div className="numbers--box">
                    <span>+60</span>
                    <span><PiDog /></span>
                    <p>
                       Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus dolor perspiciatis fuga mollitia, eaque dolores nam voluptas quibusdam eos minus. 
                    </p>
                </div>
                <div className="numbers--box">
                    <span>+80</span>
                    <span><AiOutlineUser /></span>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus dolor perspiciatis fuga mollitia, eaque dolores nam voluptas quibusdam eos minus.
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About