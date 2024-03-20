import { useState } from 'react';
import ModifierInput from '../components/Input/ModifierInput';
import RaiderInput from '../components/Input/RaiderInput';
import RaidSelect from '../components/Input/RaidSelect';
import { getOrDefault, set } from '../localStorage/localStorage';
import { raids } from '../raids/raids';
import { defaultModifiers } from '../raids/modifiers';
import './raidSetup.scss';
import { Modifier, Raid } from '../types/Raid';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Modal, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { modalStyle } from './StartLootbox';
import DeleteIcon from '@mui/icons-material/Delete';

const RaidSetup = () => {
  const [selectedRaid, setSelectedRaid] = useState<Raid>(getOrDefault<Raid>('raid', raids[0]));
  const [raiders, setRaiders] = useState<string[]>(getOrDefault<string[]>('raiders', Array(6).fill('')));
  const [modifiers, setModifiers] = useState<Modifier[]>(getOrDefault<Modifier[]>('modifiers', [...defaultModifiers]));

  const [expandedAccordions, setExpandedAccordions] = useState<number[]>([]);

  const [modalOpen, setModalOpen] = useState(false);

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
    setModalOpen(false);
    set('modifiers', [...existingModifiers]);
  };
  const deleteModifier = (index: number) => {
    setExpandedAccordions([]);
    const newModifiers = [...modifiers];
    newModifiers.splice(index, 1);
    setModifiers([...newModifiers]);
    set('modifiers', [...newModifiers]);
  };

  const updateModifier = (index: number, modifier: Modifier) => {
    const newModifiers = [...modifiers];
    newModifiers[index] = { ...modifier };
    setModifiers([...newModifiers]);
    set('modifiers', [...newModifiers]);
  };

  const updateRaid = (raid: string) => {
    const newRaid = raids.find((r) => r.name === raid);
    setSelectedRaid(newRaid!);
    set('raid', newRaid!);
  };

  const expandCollapseAccordion = (index: number) => {
    const newExpandedAccordions = [...expandedAccordions];
    if (newExpandedAccordions.includes(index)) {
      newExpandedAccordions.splice(newExpandedAccordions.indexOf(index), 1);
    } else {
      newExpandedAccordions.push(index);
    }
    setExpandedAccordions([...newExpandedAccordions]);
  };

  return (
    <div className="fullRaidSetup">
      <div className="raidSetup">
        <Typography variant="h2">Raid Setup</Typography>
        <RaidSelect value={selectedRaid.name} updateRaid={updateRaid} />
      </div>
      <div className="raiderSetup">
        <Typography variant="h2">Raiders</Typography>
        {raiders.map((raider, index) => (
          <div key={index} className="raiderInput">
            <RaiderInput index={index} updateRaider={updateRaider} value={raider} />
          </div>
        ))}
      </div>

      <div className="modifierSetup">
        <Typography variant="h2">Modifiers</Typography>
        <Button onClick={() => setModalOpen(true)}>Add Modifier</Button>
        {modifiers
          .filter((m) => m.name !== '')
          .map((modifier, index) => (
            <div key={index} className="modifierInput">
              <Accordion onChange={() => expandCollapseAccordion(index)} expanded={expandedAccordions.includes(index)}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography sx={{ width: '33%' }}>{`${index} ${modifier.name}`}</Typography>
                  <Typography
                    sx={{
                      width: '66%',
                      color: 'text.secondary',
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 1,
                      lineClamp: 1,
                    }}
                  >
                    {modifier.description}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ModifierInput index={index} updateModifier={updateModifier} existingModifier={modifier} />
                  <DeleteIcon sx={{ color: 'red', cursor: 'pointer' }} onClick={() => deleteModifier(index)} />
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...modalStyle, width: '60%' }}>
            {modalOpen && (
              <ModifierInput
                index={modifiers.length - 1}
                updateModifier={updateModifier}
                existingModifier={modifiers.at(-1)!}
              />
            )}
            <Button onClick={addModifier}>Submit</Button>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default RaidSetup;
