import React from 'react';
import '../components/Footer.css'; // Import CSS file

function Footer() {
  return (
    <div className="footer">
      
      <div className="footer-content">
        <div>
          <p>Featured Blogs</p>
          <p>Most Viewed</p>
          <p>Readers Choice</p>
        </div>
        <div>
          <p>Forum</p>
          <p>Support</p>
          <p>Recent Posts</p>
        </div>
        <div>
          <p>Privacy Policy</p>
          <p>About Us</p>
          <p>Terms & Conditions</p>
        </div>
      </div>
      {/* <p className="footer-copyright">All rights reserved © Intellipaat 2025</p> */}
    </div>
  );
}

export default Footer;
