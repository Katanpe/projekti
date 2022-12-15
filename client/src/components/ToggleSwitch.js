import React from "react";

const ToggleSwitch = ({
    id, 
    checked, 
    onChange,
}) => {

  return (
    <div className={"toggle-switch"}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
}
  
export default ToggleSwitch;

