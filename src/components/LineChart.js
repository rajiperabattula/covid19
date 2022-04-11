import React from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  Bar
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
          width={1046}
          height={350}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke={props.strokeColor} />
        </LineChart>
        </>
    )
}

export default MyLineChart;