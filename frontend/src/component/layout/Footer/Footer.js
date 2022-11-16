import React from 'react'
import "./Footer.css"

export const Footer = () => {
  return (
    <footer id="footer">

        <div className="leftFooter">
             <h4>Download the App</h4>
             <p>Download App for Android and IOS</p>

        </div>

        <div className="midFooter">
            <h1>Ecommerce</h1>
            <p>Quality Products</p>
            <p>Copyrights 2022 &copy; Abhishek</p>
            
        </div>
             
        <div className="rightFooter">
            <h4>Follow Us</h4>
            <a href="http://www.youtube.com" target="_blank" rel="noreferrer">Youtube</a>
            <a href="http://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a href="http://www.twitter.com" target="_blank" rel="noreferrer">Twitter</a>
        </div>

    </footer>
  )
}
