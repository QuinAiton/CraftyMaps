import React from 'react';

const Directions = ({ step }) => {
  return (
    <div>
      <h3>{step.maneuver.instruction}</h3>
    </div>
  );
};

export default Directions;
