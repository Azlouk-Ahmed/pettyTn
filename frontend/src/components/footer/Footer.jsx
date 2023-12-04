import React from 'react';
import './Footer.css'; // Importez votre fichier CSS

function Footer() {
  return (
    <>
    
    <footer className="site-footer">
    <div className="paragraphe1">
    <img src="\img\pate.png" alt="" />
    </div>
      <div className="container">
        <div className="row" style={{display:'flex'}}>
          <div className="col-sm-12 col-md-6">
            <p className="text-justify">At PETTY TN, we're passionate about connecting hearts and paws. With a commitment to responsible pet adoption, we strive to create lifelong bonds between pets and their loving families. Join us in making a difference, one furry friend at a time.</p>
          </div>

    
        </div>
        <hr />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Copyright &copy; 2017 All Rights Reserved by 
              <a href="#">PETTY TN</a>.
            </p>
          </div>

        </div>
      </div>
    </footer>
    </>
  );
}

export default Footer;
