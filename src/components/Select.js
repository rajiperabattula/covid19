import React from "react";
import { statesList } from "../json/stateName";

function MySelect(props) {
    return (
    <div className="select-container" testid="selectContainer">
      <select placeholder='Select the state...' className="select" onChange={(e) => {
        props.onChange(e.target.value)
        }} testid="select">
        {
          statesList.map((ele)=>{
            return(
              <option value={ele.state_code}>{ele.state_name}</option>
            )
          })
        }
      </select>
    </div>
    );
}

export default MySelect;