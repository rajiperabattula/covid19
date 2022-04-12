import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import {statesList} from '../json/stateName.js';
import {FcGenericSortingAsc,FcGenericSortingDesc} from 'react-icons/fc';
import MySelect from '../components/Select';


function Home(){
    const [data,setData]=useState([]);
    const[sortButtons,setSortButtons]=useState(0);
    const[selected,setSelected]=useState(null);
    
    useEffect(()=>
    loadData(),[]);

    const loadData = async() =>{
        const response = await axios.get('https://apis.ccbp.in/covid19-state-wise-data');
        if(response.status===200){
            setData(response.data);
        }
        else{
            toast.error('Something went wrong!');
        }
    }

    function convertObjectsDataIntoListItemsUsingForInMethod() {
        const resultList = [];
        //getting keys of an object object
        const keyNames = Object.keys(data);
      
        keyNames.forEach((keyName) => {
          if (data[keyName]) {
            const { total } = data[keyName];
            //if the state's covid data is available we will store it or we will store 0
            const confirmed = total.confirmed ? total.confirmed : 0;
            const deceased = total.deceased ? total.deceased : 0;
            const recovered = total.recovered ? total.recovered : 0;
            const tested = total.tested ? total.tested : 0;
            const population = data[keyName].meta.population
              ? data[keyName].meta.population
              : 0;
            resultList.push({
              stateCode: keyName,
              name: statesList.find((state)=> state.state_code === keyName).state_name,
              confirmed,
              deceased,
              recovered,
              tested,
              population,
              active: confirmed - (deceased + recovered)
            });
          }
        });
        return resultList;
      }

    let convertedDataArray = convertObjectsDataIntoListItemsUsingForInMethod();
    console.log("convertedDataArray",data);

    let totalConfirmed=0;
    let totalActive=0;
    let totalRecovered=0;
    let totalDeceased=0;
    for(let i=0;i<convertedDataArray.length;i++){
        totalConfirmed+=convertedDataArray[i].confirmed;
        totalActive+=convertedDataArray[i].active;
        totalRecovered+=convertedDataArray[i].recovered;
        totalDeceased+=convertedDataArray[i].deceased;
    }
    const ascTheOrder= () =>{
        setSortButtons(1);
    }
    const descTheOrder= () => {
        setSortButtons(2);
    }

    const tdData =() =>{
        if(sortButtons===2){
            convertedDataArray.reverse();
        }
        return convertedDataArray.map((ele)=>{
          return(
              <tr className='tableData'>
                   <td className='stateNames' key={ele.id}>{ele.name}</td>
                   <td className='confirmed-state' key={ele.id}>{ele.confirmed}</td>
                   <td className='active-state' key={ele.id}>{ele.active}</td>
                   <td className='recovered-state' key={ele.id}>{ele.recovered}</td>
                   <td className='deceased-state' key={ele.id}>{ele.deceased}</td>
                   <td className='population-state' key={ele.id}>{ele.population}</td>
              </tr>
          )
        })
   }

   let history = useNavigate();
   const handleSelected = (value) => {
       setSelected(value);
       history(`/state/${value}`);
   }

    return(
        <>
        <Header/>
        {data.length === 0 ? 
        <div className="loading">
            <img src="../images/load.gif" alt='loader'/>
        </div>
         :
        <section>
        <MySelect selected={selected} onChange={handleSelected}/>
            <div className='cards-container'>
                <div className='confirmed-block'>
                    <p className='confirmed-state'>Confirmed</p>
                    <img src='../images/confirmed.svg' alt='confirmed-icon'/>
                    <span className='confirmed-state'>{totalConfirmed}</span>
                </div>
                <div className='active-block'>
                    <p className='active-state'>Active</p>
                    <img src='../images/active.svg' alt='active-icon'/>
                    <span className='active-state'>{totalActive}</span>
                </div>
                <div className='recovered-block'>
                    <p className='recovered-state'>Recovered</p>
                    <img src='../images/recovered.svg' alt='recovered-icon'/>
                    <span className='recovered-state'>{totalRecovered}</span>
                </div>
                <div className='deceased-block'>
                    <p className='deceased-state'>Deceased</p>
                    <img src='../images/diceased.svg' alt='deceased-icon'/>
                    <span className='deceased-state'>{totalDeceased}</span>
                </div>
            </div>
            <div className='home-table'>
                <table className="table">
                    <thead>
                        <tr>
                            <th>States/UT <FcGenericSortingAsc className='icon' onClick={()=>ascTheOrder()}/> <FcGenericSortingDesc className='icon' onClick={()=>descTheOrder()}/></th>
                            <th>Confirmed</th>
                            <th>Active</th>
                            <th>Recovered</th>
                            <th>Deceased</th>
                            <th>Population</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tdData()}
                    </tbody>
                </table>
            </div>
        <Footer/>
        </section>
        }
        </>
    )
}

export default Home;