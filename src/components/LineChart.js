import React from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  Label
} from "recharts";

function MyLineChart(props){
    let data=[];
    console.log('MyLineChart dates',props)
    if(props.dates.length){
        props.dates.forEach(element => {
            data.push({
                date: element.date,
                count: element.casesData[props.selectedTab]
        })
    });
    }
    console.log("sssssssss",data);
    return(
        <>
        <LineChart
          width={window.innerWidth>900 ? 1146 : (window.innerWidth>450? 360:330)}
          height={328}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="date"><Label className="x-axis-label" value={props.selectedTab==='tested'? 'active' : props.selectedTab} angle={0} position="right" dy="50" /></XAxis>
          <YAxis/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke={props.strokeColor} activeDot={{ r: 6 }}/>
        </LineChart>
        </>
    )
}

export default MyLineChart;