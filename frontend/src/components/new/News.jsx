import React from 'react'
import "./news.css"

function News() {
  return (
    <div className='news'>
        <div className="paragraph">
            <h3>news</h3>
            <p>Experience the convenience of PETTYTN delivering your new pet directly to your doorstep!</p>
        </div>
        <div className="box-container">
            <div className="box">               
                <div>
                    <h3>available for all regions</h3>
                    We deliver your new furry friend straight to your door, making the joy of pet companionship accessible to all regions. With PETTYTN, finding and bringing home your perfect companion is easier than ever, no matter where you are in Tunisia.
                </div>
                <div className="bg-wave">
                    <img src="/img/news1.png" alt="" />

                </div>
            </div>
            <div className="box">
                <div>
                    <h3>fast delivery</h3>
                    Swift delivery guaranteed! Receive your delightful new pet through PETTYTN's express service in just 3 days or less.
                </div>
                <div className="bg-wave">
                    <img src="/img/dog2.png" alt="" />

                </div>
            </div>
        </div>
        <img src="/img/pate.png"/>
    </div>
  )
}

export default News