import React, { useState } from 'react';
import './input.scss';
import { Modifier } from '../../types/Raid';
import { Box, Checkbox, Container, FormControl, FormControlLabel, InputLabel, OutlinedInput } from '@mui/material';

interface Props {
  existingModifier: Modifier;
  updateModifier: (index: number, modifier: Modifier) => void;
  index: number;
}
const ModifierInput = ({ existingModifier, updateModifier, index }: Props) => {
  const [modifier, setModifier] = useState<Modifier>(existingModifier);

  console.log({ index, modifier, existingModifier });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log({ e });
    const value = e.currentTarget.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value;
    const name = e.currentTarget.name;
    const changedMod = { ...modifier, [name]: value };
    setModifier({ ...changedMod });
    updateModifier(index, changedMod);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log({ e });
    const value = e.currentTarget.checked;
    const changedMod = { ...modifier, isTeamMod: value };
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

  const boxStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  return (
    <>
      <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '10px' }}>
        <Box sx={boxStyle}>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Name</InputLabel>
            <OutlinedInput
              type="text"
              label="Name"
              name="name"
              value={modifier.name}
              onChange={handleInputChange}
              color="primary"
              id="component-outlined"
            />
          </FormControl>
        </Box>
        <Box sx={{ ...boxStyle, flex: 2 }}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel htmlFor="component-outlined">Description</InputLabel>
            <OutlinedInput
              multiline={true}
              name="description"
              label="Description"
              placeholder="Enter description here"
              minRows={3}
              value={modifier.description}
              onChange={handleTextareaChange}
              id="component-outlined"
              fullWidth={true}
            />
          </FormControl>
        </Box>
        <Box sx={boxStyle}>
          <FormControlLabel
            control={<Checkbox checked={modifier.isTeamMod} onChange={handleCheckboxChange} />}
            label="Team Mod"
          />
        </Box>
      </Container>
    </>
  );
};

export default ModifierInput;
