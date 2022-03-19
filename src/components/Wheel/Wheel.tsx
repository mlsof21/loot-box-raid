import React, { useState } from 'react';

import './wheel.scss';

interface WheelProps {
  items: string[];
  handleWheelClick: () => void;
  selectedItem: null | number;
}

const Wheel = ({ items, handleWheelClick, selectedItem }: WheelProps) => {
  const wheelVars = {
    '--nb-item': items.length,
    '--selected-item': selectedItem,
  } as React.CSSProperties;
  const spinning = selectedItem !== null ? 'spinning' : '';

  return (
    <div className="wheel-container">
      <div className={`wheel ${spinning}`} style={wheelVars} onClick={handleWheelClick}>
        {items.map((item: string, index: number) => (
          <div className="wheel-item" key={index} style={{ '--item-nb': index } as React.CSSProperties}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wheel;
