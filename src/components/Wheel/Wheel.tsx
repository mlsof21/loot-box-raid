import React, { useState } from 'react';

import './wheel.scss';

interface WheelProps {
  items: string[];
  handleWheelClick: () => void;
  selectedItem: null | number;
  wheelColor: string;
  wheelNeutralColor: string;
  spinDegrees: number;
  isSpinning: boolean;
}

const Wheel = ({
  items,
  handleWheelClick,
  selectedItem,
  wheelColor,
  wheelNeutralColor,
  spinDegrees,
  isSpinning,
}: WheelProps) => {
  const calculatedSpinDegrees = selectedItem !== null ? 5 * 360 + (-360 * selectedItem) / items.length : 0;

  console.log({ calculatedSpinDegrees, spinDegrees });
  const wheelVars = {
    '--nb-item': items.length,
    '--selected-item': selectedItem,
    '--wheel-color': wheelColor,
    '--wheel-neutral-color': wheelNeutralColor,
    '--spin-degrees': `${spinDegrees}deg`,
  } as React.CSSProperties;

  console.log({ selectedItem, spinDegrees });
  return (
    <div className="wheel-container">
      <div className={`wheel ${isSpinning ? 'spinning' : ''}`} style={wheelVars} onClick={handleWheelClick}>
        {items.map((item: string, index: number) => (
          <div
            className="wheel-item"
            key={index}
            style={
              {
                '--item-nb': index,
              } as React.CSSProperties
            }
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wheel;
