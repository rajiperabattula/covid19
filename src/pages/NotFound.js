import React from 'react';
import {Link} from 'react-router-dom';
import '../scss/notFound.scss';

function NotFound(){
    return(
        <>
        <div className='notFound' testid="notFound">
            <div className='notFound-elements' testid="notFoundElements">
                <img src='./images/notFound.svg' alt='not found'/>
                <p className='notFound-text' testid="notFoundText">PAGE NOT FOUND</p>
                <p>we’re sorry, the page you requested could not be foundPlease go back to the homepage.</p>
                <Link to={'/'}>
                    <button>Home</button>
                </Link>
            </div>
        </div>
        </>
    )
}

export default NotFound;