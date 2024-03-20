import { useState } from 'react';
import './input.scss';
import { Input, InputLabel } from '@mui/material';

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
      <InputLabel>
        Raider {index + 1}:
        <Input sx={{ marginLeft: '10px' }} type="text" value={raider} onChange={handleInputChange} />
      </InputLabel>
    </div>
  );
};

export default RaiderInput;
