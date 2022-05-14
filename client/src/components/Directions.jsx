import React from "react";

const Directions = ({ steps }) => {
  return (
    <div>
      <h3>{steps.maneuver.instruction}</h3>
    </div>
  );
};

export default Directions;
