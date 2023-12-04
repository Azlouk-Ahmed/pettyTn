import React from 'react'
import "./tny.css"
import { Link } from 'react-router-dom'

function TheyNeedYou() {
  return (
    <div className='they--need--you'>
        <img src="/img/theyneedyou.png"/>
        <div className="tny--pg">
            <h3>they need you</h3>
            <p>Whether it's a furry friend seeking a loving home or a cause that 
              relies on your support, the call to make a positive impact resonates. Embrace the opportunity to be the change—your kindness, dedication, and care can create a brighter and more compassionate tomorrow. At PETTYTN, we believe in the power of individuals to make a difference, one act of kindness at a time. Join us 
              on this journey where your presence matters, and together, let's make a meaningful impact.</p>
            <Link to="/timeline" className="primary--button fc">view animals</Link>
        </div>
        <svg className='wave' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fillOpacity="1" d="M0,320L30,298.7C60,277,120,235,180,208C240,181,300,171,360,154.7C420,139,480,117,540,96C600,75,660,53,720,69.3C780,85,840,139,900,144C960,149,1020,107,1080,96C1140,85,1200,107,1260,133.3C1320,160,1380,192,1410,208L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
    </div>
  )
}

export default TheyNeedYou