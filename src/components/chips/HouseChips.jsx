import React from 'react';
import './HouseChips.css';

const Chip = (props) => {
  if (props.active) {
    return (
      <div className="chip d-inline-block" id={props.id}>10</div>
    );
  } else {
    return <div>{props.id}</div>;
  }
};

export default Chip;
