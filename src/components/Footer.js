import React from "react";
import { Link } from "react-router-dom";

function Footer(){
    return(
        <>
        <footer className="footer" testid="footer">
                <div className="logo" testid="footerLogo">
                <Link to={'/'}><img src="../images/logo.svg" alt="logo"/></Link>
                </div>
                <p className="footer_text" testid="footerText">we stand with everyone fighting on the front lines</p> 
                <div className="footer_icons-list" testid="footerIconsList">
                <Link to={'/'}><img src="../images/github.svg" alt="github"/></Link>
                <Link to={'/'} className="footer_icons2"><img src="../images/instagram.svg" alt="instagram"/></Link>
                <Link to={'/'}><img src="../images/twitter.svg" alt="twitter"/></Link>
                </div>
        </footer>
        </>
    )
}

export default Footer;