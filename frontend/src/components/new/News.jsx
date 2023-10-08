import React from 'react'
import "./news.css"

function News() {
  return (
    <div className='news'>
        <div className="paragraph">
            <h3>news</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta totam maiores vel perferendis in earum fugit illum ab labore illo.</p>
        </div>
        <div className="box-container">
            <div className="box">               
                <div>
                    <h3>Lorem, ipsum dolor.</h3>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, atque dolore iste consectetur pariatur odio 
                    quas rerum voluptatibus dicta! Quasi expedita temporibus commodi nulla dignissimos
                </div>
                <div className="bg-wave">
                    <img src="/img/news1.png" alt="" />

                </div>
            </div>
            <div className="box">
                <div>
                    <h3>Lorem, ipsum dolor.</h3>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, atque dolore iste consectetur pariatur odio 
                    quas rerum voluptatibus dicta! Quasi expedita temporibus commodi nulla dignissimos
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