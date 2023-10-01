import React from "react"

function Signup()  {
    <>
     <div className="container">
        <div>
          <img src="" className="imgg" alt="Man" />
        </div>
        <div className="card">
          <div className="card_title">
            <h1>Create Account</h1>
            <span>Already have an account? <a href="login">Sign In</a></span>
          </div>
          <div className="form">
            <form action="/register" method="post">
              <input type="text" name="username" id="username" placeholder="UserName" />
              <input type="email" name="email" placeholder="Email" id="email" />
              <input type="password" name="password" placeholder="Password" id="password" />
              <button>Sign Up</button>
            </form>
          </div>
          <div className="card_terms">
            <input type="checkbox" name="" id="terms" /> <span>I have read and agree to the <a href="">Terms of Service</a></span>
          </div>
        </div>
        <div>
          <img src="" className="imgg" alt="Dog" />
        </div>
      </div>
    </>
}

export default Signup