import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../scss/stateSpecific.scss';
import MyBarChart from '../components/BarChart';
import MyLineChart from '../components/LineChart';
import { statesList } from '../json/stateName';


function StateSpecific(){
    const [stateData,setStateData] = useState([]);
    const [timelineStateData,setTimelineStateData] = useState([]);
    const [fillColor,setFillColor]=useState('#9A0E31')
    const [currentSelectedType,setCurrentSelectedType] = useState('confirmed');
    let params=useParams().stateCode;

    useEffect(()=>{
        loadStateData();
    },[])

    const loadStateData = async() => {
        const response = await axios.get('https://apis.ccbp.in/covid19-state-wise-data');
        if(response.status===200){
            setStateData(response.data[params]);
        }
        else{
            toast.error('Something went wrong!');
        }

        const timelineResponse = await axios.get(`https://apis.ccbp.in/covid19-timelines-data/${params}`);
        if(timelineResponse.status===200){
            setTimelineStateData(timelineResponse.data[params].dates);
        }
        else{
            toast.error('Something went wrong!');
        }
    }

let timelineStateDataArray=[];
if(Object.keys(timelineStateData).length){
Object.keys(timelineStateData).forEach((key)=>{
    timelineStateDataArray.push({
        date:key,
        casesData: timelineStateData[key].total
    })
})
// timelineStateDataArray.splice(10,timelineStateDataArray.length);
}
console.log("dates",timelineStateDataArray);



const stateDataArray = stateData && Object.keys(stateData).length ? [stateData.total,stateData.districts,stateData.meta.last_updated]: [];

const d=new Date(stateDataArray[2]);
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const month = months[d.getMonth()];
const day= d.getDate();
const year= d.getFullYear();

const districtArray=[];
if(stateDataArray.length){
Object.keys(stateDataArray[1]).forEach((key)=>{
    districtArray.push({
        districtName:key,
        districtData: stateDataArray[1][key].total
    })
})
}

const changeData = (selectedTab) =>{
    if(selectedTab==='confirmed'){
        setCurrentSelectedType('confirmed');
        setFillColor('#9A0E31');
        if(document.getElementById('deceased-block')){
            document.getElementById("confirmed-block").style.background='#331427';
            document.getElementById('active-block').style.background='none';
            document.getElementById('recovered-block').style.background='none';
            document.getElementById('deceased-block').style.background='none';
        }
    }
    if(selectedTab==='active'){
        setCurrentSelectedType('tested');
        setFillColor('#0A4FA0');
        if(document.getElementById('deceased-block')){
            document.getElementById('active-block').style.background='#132240';
            document.getElementById('confirmed-block').style.background='none';
            document.getElementById('recovered-block').style.background='none';
            document.getElementById('deceased-block').style.background='none';
        }
    }
    if(selectedTab==='recovered'){
        setCurrentSelectedType('recovered');
        setFillColor('#216837');
        if(document.getElementById('deceased-block')){
            document.getElementById('recovered-block').style.background='#182829';
            document.getElementById('active-block').style.background='none';
            document.getElementById('confirmed-block').style.background='none';
            document.getElementById('deceased-block').style.background='none';
        }
    }
    if(selectedTab==='deceased'){
        setCurrentSelectedType('deceased');
        setFillColor('#474C57');
        if(document.getElementById('deceased-block')){
            document.getElementById('deceased-block').style='background:#212230';
            document.getElementById('active-block').style='background:none';
            document.getElementById('recovered-block').style='background:none';
            document.getElementById('confirmed-block').style='background:none';
        }
    }
}
    return(
        <>
        <Header/>
        {stateData.length === 0 ? 
        <div className="loading" testid="stateSpecificLoader">
            <img src="../images/load.gif" alt='loader'/>
        </div>
         :
        <section className='stateSpecific-page' testid="stateSpecificSection">
            <div className='top-section' testid="stateSpecificTopSection">
                <div className='state-name-date'>
                    <span className='state-heading'>{statesList.find((state)=> state.state_code === params).state_name}</span>
                    <span className='state-date'>{`last updated on ${month} ${day}, ${year}`}</span>
                </div>
                <div className='state-tested-count'>
                    <span>Tested</span>
                    <span>{stateDataArray[0].tested}</span>
                </div>
            </div>

            <div className='cards-container' testid="stateSpecificCardsContainer">
                <div className='confirmed-block' id='confirmed-block' onClick={()=>changeData('confirmed')}>
                    <p className='confirmed-state'>Confirmed</p>
                    <img src='../images/confirmed.svg' alt='confirmed-icon'/>
                    <p className='confirmed-state'>{stateDataArray[0] && stateDataArray[0].confirmed}</p>
                </div>
                <div className='active-block' id='active-block' onClick={()=>changeData('active')}>
                    <p className='active-state'>Active</p>
                    <img src='../images/active.svg' alt='active-icon'/>
                    <p className='active-state'>{stateDataArray[0] && stateDataArray[0].tested}</p>
                </div>
                <div className='recovered-block' id='recovered-block' onClick={()=>changeData('recovered')}>
                    <p className='recovered-state'>Recovered</p>
                    <img src='../images/recovered.svg' alt='recovered-icon'/>
                    <p className='recovered-state'>{stateDataArray[0] && stateDataArray[0].recovered}</p>
                </div>
                <div className='deceased-block' id='deceased-block' onClick={()=>changeData('deceased')}>
                    <p className='deceased-state'>Deceased</p>
                    <img src='../images/diceased.svg' alt='deceased-icon'/>
                    <p className='deceased-state'>{stateDataArray[0] && stateDataArray[0].deceased}</p>
                </div>
            </div>

            <div className='top-districts' testid="stateSpecificTopDistricts">
                <p className='top-districts-title confirmed-state'>Top Districts</p>
                <div className='top-districts-content-section'>
                    {
                        districtArray.map((ele)=>{
                            return(
                                <div className='district-text-block'>
                                    <span className='district-value'>{ele.districtData[currentSelectedType]}</span>
                                    <span className='district-name'>{ele.districtName}</span>
                                </div>
                                )

                        })
                    }
                </div>
            </div>
            
            <div className='barCharts-block' testid="stateSpecificBarChartsBlock">
            <MyBarChart dates={timelineStateDataArray} selectedTab={currentSelectedType} fillColor={fillColor}/>
            </div>
            <div className='line-charts-block' testid="stateSpecificLineChartsBlock">
                <div className='line-chart-heading'>Daily Spread Trends</div>
                <div className='confirmed-lineChart' testid="confirmedLineChart">
                    <MyLineChart dates={timelineStateDataArray} selectedTab='confirmed' strokeColor='#9A0E31'/>
                </div>
                <div className='active-lineChart' testid="activeLineChart">
                    <MyLineChart dates={timelineStateDataArray} selectedTab='tested' strokeColor='#0A4FA0'/>
                </div>
                <div className='recovered-lineChart' testid="recoveredLineChart">
                    <MyLineChart dates={timelineStateDataArray} selectedTab='recovered' strokeColor='#216837'/>
                </div>
                <div className='deceased-lineChart' testid="deceasedLineChart">
                    <MyLineChart dates={timelineStateDataArray} selectedTab='deceased' strokeColor='#474C57'/>
                </div>
            </div>


        <Footer/>
        </section>



        }
        </>
    )
}

export default StateSpecific;