import React, { useState } from 'react';
import { raids } from '../../raids/raids';
import { Raid } from '../../types/Raid';
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface RaidSelectProps {
  value: string;
  updateRaid: (raid: string) => void;
}

const RaidSelect = ({ value, updateRaid }: RaidSelectProps) => {
  const [selectedRaidName, setSelectedRaidName] = useState(value);
  const raid = raids.filter((raid) => raid.name === selectedRaidName)[0];
  const [selectedRaid, setSelectedRaid] = useState<Raid>(raid);
  const handleSelectChange = (e: SelectChangeEvent) => {
    const newRaid = raids.filter((raid) => raid.name === e.target.value)[0];
    setSelectedRaidName(newRaid.name);
    setSelectedRaid(newRaid);
    updateRaid(newRaid.name);
  };

  return (
    <div>
      <InputLabel>Raid:</InputLabel>

      <Select name="raid" id="raid" value={selectedRaidName} onChange={handleSelectChange}>
        {raids.map((raid, index) => (
          <MenuItem key={index} value={raid.name}>
            {raid.name}
          </MenuItem>
        ))}
      </Select>
      <p>Encounters: {selectedRaid.encounters.map((enc) => enc.name).join(', ')}</p>
    </div>
  );
};

export default RaidSelect;
