import { useState } from 'react';
import ModifierInput from '../components/Input/ModifierInput';
import RaiderInput from '../components/Input/RaiderInput';
import RaidSelect from '../components/Input/RaidSelect';
import { get, set } from '../localStorage/localStorage';
import { raids } from '../raids/raids';
import { defaultModifiers } from '../raids/modifiers';
import './raidSetup.scss';
import { Modifier, Raid } from '../types/Raid';

const RaidSetup = () => {
  const storageRaid = get('raid');
  const storageRaiders = get('raiders');
  const storageModifiers = get('modifiers');

  const initialRaid = storageRaid ? JSON.parse(storageRaid) : raids[0];
  const initialRaiders = storageRaiders ? JSON.parse(storageRaiders) : ['', '', '', '', '', ''];
  const initialModifiers = storageModifiers ? JSON.parse(storageModifiers) : [...defaultModifiers];

  if (!storageRaid) {
    set('raid', raids[0]);
  }

  if (!storageRaiders) {
    set('raiders', [...initialRaiders]);
  }

  if (!storageModifiers) {
    set('modifiers', [...defaultModifiers]);
  }
  const [selectedRaid, setSelectedRaid] = useState<Raid>(initialRaid);

  const [raiders, setRaiders] = useState<string[]>([...initialRaiders]);
  const [modifiers, setModifiers] = useState([...initialModifiers]);

  const [editingModifierIndex, setEditingModifierIndex] = useState(-1);

  const updateRaider = (raider: string, index: number) => {
    const newRaiders = [...raiders];
    newRaiders[index] = raider;
    setRaiders([...newRaiders]);
    set('raiders', [...newRaiders]);
  };

  const addModifier = () => {
    const existingModifiers = [...modifiers];
    existingModifiers.push({ name: '', description: '', isTeamMod: false });
    setModifiers(existingModifiers);
    set('modifiers', [...existingModifiers]);
  };

  const updateModifier = (index: number, modifier: Modifier) => {
    const newModifiers = [...modifiers];
    newModifiers[index] = { ...modifier };
    setModifiers([...newModifiers]);
    set('modifiers', [...newModifiers]);
  };

  const handleModifierClick = (index: number) => {
    console.log('Editing index', index);
    setEditingModifierIndex(index);
  };

  const updateRaid = (raid: string) => {
    const newRaid = raids.find((r) => r.name === raid);
    setSelectedRaid(newRaid!);
    set('raid', newRaid!);
  };

  return (
    <div className="fullRaidSetup">
      <div className="raidSetup">
        <h2>Raid</h2>
        <RaidSelect value={selectedRaid.name} updateRaid={updateRaid} />
      </div>
      <div className="raiderSetup">
        <h2>Raiders</h2>
        {raiders.map((raider, index) => (
          <div key={index} className="raiderInput">
            <RaiderInput index={index} updateRaider={updateRaider} value={raider} />
          </div>
        ))}
      </div>

      <div className="modifierSetup">
        <h2>Modifiers</h2>
        {modifiers.map((modifier, index) => (
          <div key={index} className="modifierInput" onClick={() => handleModifierClick(index)}>
            <ModifierInput
              index={index}
              numModifiers={modifiers.length}
              updateModifier={updateModifier}
              existingModifier={modifier}
              addModifier={addModifier}
              editing={index === editingModifierIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RaidSetup;
