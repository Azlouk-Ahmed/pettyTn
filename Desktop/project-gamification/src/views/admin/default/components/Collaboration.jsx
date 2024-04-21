import React from "react";
import ShowTasks, { ShowCompletedTasks } from "./ShowTasks";

function Collaboration() {
  return (
    <div style={{display: 'flex', justifyContent: "space-between"}}>
      <div style={{width: '50%'}}><ShowTasks /></div>
      <div style={{width: '50%'}}><ShowCompletedTasks /></div> 
    </div>
);
}

export default Collaboration;
