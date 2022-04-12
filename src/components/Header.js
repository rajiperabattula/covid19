import React from "react";
import { Link,useLocation } from "react-router-dom";
function Header(){
    const location = useLocation();
    const currentPage=location.pathname;
    return(
        <>
        <header testid="header">
            <nav testid="headerNav">
                <div className="logo" testid="headerLogo">
                <Link to={'/'}><img src="../images/logo.svg" alt="logo"/></Link>
                </div>
                <div className="links" teastid="headerLinks">
                    <span className="nav-links-span" testid="headerNavLinksSpan1"><Link 
                        to={'/'}
                        className={`nav-links ${currentPage.includes('about') ? "":"active"}`}>
                            Home
                        </Link>
                    </span>
                    <span className="nav-links-span" testid="headerNavLinksSpan2"><Link 
                        to={'/about'}
                        className={`nav-links ${currentPage.includes('about') ? "active":""}`}>
                            About
                        </Link>
                    </span>
                </div>
            </nav>
        </header>
        </>
    )
}

export default Header;