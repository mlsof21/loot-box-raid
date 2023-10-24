import React, { useState } from 'react';
import './input.scss';
import { Modifier } from '../../types/Raid';

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
    <div>
      {editing ? (
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
          </label>
        </div>
      ) : (
        <div className="rowContainer">
          <div className="nameContainer">
            <span className="spanLabel">Name: {modifier.name} </span>
          </div>
          <div className="descriptionContainer">
            <span className="spanLabel">Description: {modifier.description}</span>
          </div>
          <div className="teamModContainer">
            <span className="spanLabel">
              Team mod: <input type="checkbox" checked={modifier.isTeamMod} disabled={true} />
            </span>
          </div>
        </div>
      )}
      {isLastIndex && <button onClick={addModifier}>+</button>}
    </div>
  );
};

export default ModifierInput;
