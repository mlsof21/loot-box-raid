import React from 'react';

import './wheel.scss';

interface WheelProps {
  items: string[];
  handleWheelClick: () => void;
  selectedItem: null | number;
  wheelColor: string;
  wheelNeutralColor: string;
  isSpinning: boolean;
}

const Wheel = ({ items, handleWheelClick, selectedItem, wheelColor, wheelNeutralColor, isSpinning }: WheelProps) => {
  const wheelVars = {
    '--nb-item': items.length,
    '--selected-item': selectedItem,
    '--wheel-color': wheelColor,
    '--wheel-neutral-color': wheelNeutralColor,
  } as React.CSSProperties;

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
