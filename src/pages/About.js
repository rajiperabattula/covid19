import React, { useEffect,useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../scss/about.scss';


function About(){
    const [faqData,setFaqData]=useState([]);
    useEffect(()=>{
        loadFaqData();
    },[]);

    const loadFaqData = async() => {
        const response = await axios.get('https://apis.ccbp.in/covid19-faqs');
        if(response.status===200){
            setFaqData(response.data && response.data.faq ? response.data.faq : '');
        }
        else{
            toast.error('Something went wrong!');
        }
    }
    console.log("faq data",faqData);
    return(
        <>
        <Header/>
        {faqData.length === 0 ? 
        <div className="loading">
            <img src="../images/load.gif" alt='loader'/>
        </div>
         :
        <section>
            <div className='about-container'>
                <div className='about-heading'>About</div>
                <span>Last update on march 28th 2021.</span>
                <p className='sub-text'>COVID-19 vaccines be ready for distribution</p>
                <div className='faq-container'>
                    {
                        faqData.map((ele)=>{
                            return(
                                <div className='faq-each'>
                                    <p className='question'>{ele.question}</p>
                                    <p className='answer'>{ele.answer}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        <Footer/>
        </section>
        }
        </>
    )
}

export default About;