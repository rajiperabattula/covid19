import React from "react";
import { Link,useLocation } from "react-router-dom";
function Header(){
    const location = useLocation();
    const currentPage=location.pathname;
    return(
        <>
        <header>
            <nav>
                <div className="logo" testid="logo">
                <Link to={'/'}><img src="./images/logo.svg" alt="logo"/></Link>
                </div>
                <div className="links">
                    <span className="nav-links-span"><Link 
                        to={'/'}
                        className={`nav-links ${currentPage.includes('about') ? "":"active"}`}>
                            Home
                        </Link>
                    </span>
                    <span className="nav-links-span"><Link 
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