import React from 'react'
import "./ourfriends.css"
import {animals} from "./test"

function OurFrineds() {
  return (
    <div className='our--friends'>
        <h3>our friends are looking for houses</h3>
        <div className="our--friends-container">
            {
                animals.map(animal => {
                    return (
                        <div className="animal" key={animal._id+Math.random()}>
                            <div className="img--animal--container">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" width="400" height="400" preserveAspectRatio="none" viewBox="0 0 400 400">
                                <g mask="url(&quot;#SvgjsMask1047&quot;)" fill="none">
                                    <path d="M200 285.86C222.5 284.68 242.82 274.65 259.4 259.4 276.85 243.35 294.24 223.69 293.34 200 292.45 176.79 271.53 161.32 255.03 144.97 238.64 128.73 222.97 109.69 200 107.51 175.35 105.17 150.44 115.44 133.4 133.4 116.74 150.96 112.16 175.79 112.27 200 112.38 224.07 116.82 249.14 134.02 265.98 151.09 282.68 176.15 287.11 200 285.86" fill="rgba(129, 232, 207, 1)"></path>
                                </g>
                                <defs>
                                    <mask id="SvgjsMask1047">
                                        <rect width="400" height="400" fill="#ffffff"></rect>
                                    </mask>
                                </defs>
                            </svg>
                            <img src={animal.animalImg}/>

                            </div>
                            <p className='pg-la'> 
                                {animal.description}
                            </p>
                        </div>
                    )
                }) 
            }
        </div>
    </div>
  )
}

export default OurFrineds