import React from 'react';
import {Link} from 'react-router-dom';
import '../scss/notFound.scss';

function NotFound(){
    return(
        <>
        <div className='notFound'>
            <div className='notFound-elements'>
                <img src='./images/notFound.svg' alt='not found'/>
                <p className='notFound-text'>PAGE NOT FOUND</p>
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