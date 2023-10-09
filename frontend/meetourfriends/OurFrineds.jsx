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
                            <div>
                                <div className="userimg">
                                    <img src={animal.user.img}/>
                                </div>
                                <div className="name">
                                    <span> {animal.user.name} {animal.user.surname} </span>
                                    <span>member since {(animal.user.createdAt).substring(0,10)}</span>

                                </div>
                            </div>
                            <img src={animal.animalImg}/>
                            <p>
                                descripion : 
                                {animal.description}
                            </p>
                            <span>
                                {animal.nb}
                            </span>
                        </div>
                    )
                }) 
            }
        </div>
    </div>
  )
}

export default OurFrineds