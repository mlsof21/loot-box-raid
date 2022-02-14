import React, { useState } from 'react';
import { KnownRaid, knownRaids } from '../../raids/known-raids';

interface RaidSelectProps {
  value: string;
  updateRaid: (raid: string) => void;
}

const RaidSelect = ({ value, updateRaid }: RaidSelectProps) => {
  const [selectedRaidName, setSelectedRaidName] = useState(value);
  const raid = knownRaids.filter((raid) => raid.name === selectedRaidName)[0];
  const [selectedRaid, setSelectedRaid] = useState<KnownRaid>(raid);
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRaid = knownRaids.filter((raid) => raid.name === e.currentTarget.value)[0];
    setSelectedRaidName(newRaid.name);
    setSelectedRaid(newRaid);
    updateRaid(newRaid.name);
  };

  return (
    <div>
      <label>
        Raid:
        <select name="raid" id="raid" value={selectedRaidName} onChange={handleSelectChange}>
          {knownRaids.map((raid, index) => (
            <option key={index} value={raid.name}>
              {raid.name}
            </option>
          ))}
        </select>
      </label>
      <p>Encounters: {selectedRaid.encounters.map((enc) => enc.name).join(', ')}</p>
    </div>
  );
};

export default RaidSelect;
