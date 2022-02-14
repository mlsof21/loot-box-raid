import { useState } from 'react';
import './input.scss';

interface RaiderInputProps {
  updateRaider: (raider: string, index: number) => void;
  index: number;
  value: string;
}

const RaiderInput = ({ updateRaider, index, value }: RaiderInputProps) => {
  const [raider, setRaider] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRaider(e.target.value);
    updateRaider(e.target.value, index);
  };

  return (
    <div className="raiderInput">
      <label>
        Raider {index + 1}:
        <input type="text" value={raider} onChange={handleInputChange} />
      </label>
    </div>
  );
};

export default RaiderInput;
