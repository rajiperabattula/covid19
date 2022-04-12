import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar
} from "recharts";

function MyBarChart(props){
    let data=[];
    console.log('MyBarChart dates',props)
    if(props.dates.length){
        props.dates.forEach(element => {
            data.push({
                date: element.date,
                count: element.casesData[props.selectedTab]
        })
    });
    }
    data.splice(10,data.length);
    return(
        <>
        <div testid="barChart">
        <BarChart width={window.innerWidth>900 ? 1146 : (window.innerWidth>450? 360:330)} height={330} data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            fill={props.fillColor}
          />
        </BarChart>
      </div>
        </>
    )
}

export default MyBarChart;