import { useEffect, useState } from 'react';
import music from '../assets/music/spinmusic.mp3';
import CustomWheel from '../components/Wheel/Wheel';
import { getOrDefault } from '../localStorage/localStorage';
import { defaultModifiers } from '../raids/modifiers';
import { raids } from '../raids/raids';
import { Modifier, Raid, RaidEncounter } from '../types/Raid';
import './raidSetup.scss';
import EncounterGrid from '../components/EncounterGrid/EncounterGrid';
import { Box, Button, Modal, Typography } from '@mui/material';

export const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const StartLootbox = () => {
  const selectedRaid = getOrDefault<Raid>('raid', raids[0]);
  const encounters: RaidEncounter[] = selectedRaid.encounters;
  const raiders = getOrDefault<string[]>('raiders', Array(6).fill(''));
  const modifiers = getOrDefault<Modifier[]>('modifiers', [...defaultModifiers]);

  const [currentRaider, setCurrentRaider] = useState(0);
  const [currentEncounter, setCurrentEncounter] = useState(0);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [assignedModifiers, setAssignedModifiers] = useState<Record<number, Record<number, Modifier | undefined>>>({}); // encounterIndex -> raiderIndex -> modifierName

  const [audioMuted, setAudioMuted] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const audio = new Audio(music);
  audio.volume = 0.1;

  useEffect(() => {
    const newAssignedModifiers = {} as Record<number, Record<number, Modifier | undefined>>;
    encounters.forEach((_, encounterIndex) => {
      newAssignedModifiers[encounterIndex] = {};
      raiders.forEach((_, raiderIndex) => {
        newAssignedModifiers[encounterIndex][raiderIndex] = undefined;
      });
    });
    setAssignedModifiers({ ...newAssignedModifiers });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const acceptAssignment = () => {
    assignNewModifier();
    if (currentRaider === raiders.length - 1) {
      nextEncounter();
    }
    nextRaider();
    setModalOpen(false);
  };

  const assignNewModifier = () => {
    const chosenModifier = modifiers[selectedItem!];
    const newAssignedModifiers = { ...assignedModifiers };
    newAssignedModifiers[currentEncounter][currentRaider] = chosenModifier;
    setAssignedModifiers(newAssignedModifiers);
  };
  const nextRaider = () => {
    const newRaider = (currentRaider + 1) % raiders.length;
    setCurrentRaider(newRaider);
  };
  const nextEncounter = () => {
    const newEncounter = (currentEncounter + 1) % encounters.length;
    setCurrentEncounter(newEncounter);
  };

  useEffect(() => {
    if (mustSpin) {
      setTimeout(() => {
        setMustSpin(false);
        setModalOpen(true);
      }, 4400);
    }
  }, [mustSpin]);

  const selectItem = () => {
    const newSelectedItem = Math.floor(Math.random() * modifiers.length);
    setMustSpin(true);
    playAudio();
    setSelectedItem(newSelectedItem);
  };

  const playAudio = async () => {
    console.log('in playAudio');
    if (!audioPlaying) {
      await audio.play();
      setAudioPlaying(true);
    }
  };

  audio.onended = () => setAudioPlaying(false);

  const handleVolumeClick = () => {
    const newAudioMuted = !audioMuted;
    audio.volume = newAudioMuted ? 0 : 0.1;
    console.log('audio: ', audio.volume);
    setAudioMuted(newAudioMuted);
  };

  const onSelectCell = (encounterIndex: number, raiderIndex: number) => {
    setCurrentEncounter(encounterIndex);
    setCurrentRaider(raiderIndex);
  };
  return (
    <>
      <h2>{selectedRaid.name} Loot Box Raid</h2>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <EncounterGrid
          encounters={selectedRaid.encounters}
          raiders={raiders.map((r) => ({ name: r, assignedModifiers: [], modifiersByName: [], byEncounter: {} }))}
          assignedModifiers={assignedModifiers}
          selectedCell={[currentEncounter, currentRaider]}
          onSelectCell={onSelectCell}
        />
        <CustomWheel
          items={modifiers.map((x) => x.name)}
          wheelColor={selectedRaid.wheelColor}
          wheelNeutralColor={selectedRaid.wheelNeutralColor}
          handleWheelClick={selectItem}
          selectedItem={selectedItem}
          isSpinning={mustSpin}
        />
      </div>
      {selectedItem && (
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {raiders[currentRaider]} has been assigned
              <Typography sx={{ fontWeight: 'bold' }}>{modifiers[selectedItem].name}</Typography> for{' '}
              {encounters[currentEncounter].name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Would you like to accept this assignment?
            </Typography>
            <Button onClick={acceptAssignment}>Yes</Button>
            <Button onClick={() => setModalOpen(false)}>No</Button>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default StartLootbox;
