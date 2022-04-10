import React from "react";
import Select from "react-select";

function MySelect(props) {
    return (
    <div className="select-container">
      <Select
        value={props.selected}
        onChange={props.onChange}
        options={props.options}
        placeholder={'Select the state...'}
        className="select"
      />
    </div>
    );
}

export default MySelect;