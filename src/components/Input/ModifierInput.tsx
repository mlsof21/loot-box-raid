import React, { useState } from 'react';
import { Modifier } from '../../randomizer/randomizer';
import './input.scss';

interface ModifierInputProps {
  existingModifier: Modifier | null;
  updateModifier: (index: number, modifier: Modifier) => void;
  addModifier: () => void;
  index: number;
  numModifiers: number;
  editing: boolean;
}

const ModifierInput = ({
  existingModifier,
  updateModifier,
  addModifier,
  index,
  numModifiers,
  editing,
}: ModifierInputProps) => {
  const [modifier, setModifier] = useState<Modifier>(
    existingModifier ? { ...existingModifier } : { name: '', description: '', isTeamMod: false },
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value;
    const name = e.currentTarget.name;
    const changedMod = { ...modifier, [name]: value };
    setModifier({ ...changedMod });
    updateModifier(index, changedMod);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    const changedMod = { ...modifier, [name]: value };
    setModifier({ ...changedMod });
    updateModifier(index, changedMod);
  };

  const isLastIndex = index + 1 === numModifiers;

  return (
    <div className="modifierInput">
      {editing || isLastIndex ? (
        <div className="editingModifierInput">
          <label>
            Name:
            <input type="text" name="name" value={modifier.name} onChange={handleInputChange} />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              placeholder="Enter description here"
              rows={2}
              cols={50}
              value={modifier.description}
              onChange={handleTextareaChange}
            />
          </label>
          <label>
            Team mod:
            <input type="checkbox" name="isTeamMod" checked={modifier.isTeamMod} onChange={handleInputChange} />
          </label>{' '}
        </div>
      ) : (
        <div>
          <span className="spanLabel">Name:</span> <span> {modifier.name} </span>{' '}
          <span className="spanLabel">Description:</span>
          <span>{modifier.description}</span>
          <span className="spanLabel">Team mod:</span>
          <input type="checkbox" checked={modifier.isTeamMod} disabled={true} />
        </div>
      )}
      {isLastIndex && <button onClick={addModifier}>+</button>}
    </div>
  );
};

export default ModifierInput;
