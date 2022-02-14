import { useState } from 'react';
import ModifierInput from '../components/Input/ModifierInput';
import RaiderInput from '../components/Input/RaiderInput';
import RaidSelect from '../components/Input/RaidSelect';
import { get, set } from '../localStorage/localStorage';
import { knownRaids } from '../raids/known-raids';
import { defaultModifiers } from '../raids/modifiers';
import { Modifier } from '../randomizer/randomizer';
import './raidSetup.scss';

const RaidSetup = () => {
  const storageRaid = get('raid');
  const storageRaiders = get('raiders');
  const storageModifiers = get('modifiers');

  const initialRaid = storageRaid ? JSON.parse(storageRaid) : knownRaids[0].name;
  const initialRaiders = storageRaiders ? JSON.parse(storageRaiders) : ['', '', '', '', '', ''];
  const initialModifiers = storageModifiers ? JSON.parse(storageModifiers) : [...defaultModifiers];

  if (!storageRaid) {
    set('raid', knownRaids[0].name);
  }

  if (!storageRaiders) {
    set('raiders', [...initialRaiders]);
  }

  if (!storageModifiers) {
    set('modifiers', [...defaultModifiers]);
  }
  const [selectedRaid, setSelectedRaid] = useState(initialRaid);

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
    setSelectedRaid(raid);
    set('raid', raid);
  };

  return (
    <div className="fullRaidSetup">
      <div className="raidSetup">
        <h2>Raid</h2>
        <RaidSelect value={selectedRaid} updateRaid={updateRaid} />
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
