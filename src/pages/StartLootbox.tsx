import { useEffect, useState } from 'react';
import music from '../assets/music/spinmusic.mp3';
import CustomWheel from '../components/Wheel/Wheel';
import { get, getOrDefault } from '../localStorage/localStorage';
import { defaultModifiers } from '../raids/modifiers';
import { raids } from '../raids/raids';
import { Modifier, Raid, RaidEncounter, Raider } from '../types/Raid';
import './raidSetup.scss';
import EncounterGrid from '../components/EncounterGrid/EncounterGrid';
import { RandomizedUser } from '../randomizer/randomizer';
import { Box, Button, Modal, Typography } from '@mui/material';

const style = {
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
  const modifierCount = modifiers.length;

  const [currentRaider, setCurrentRaider] = useState(0);
  const [currentEncounter, setCurrentEncounter] = useState(0);
  // const [chosenModifiers, setChosenModifiers] = useState<number[]>([]);
  const [selectedItem, setSelectedItem] = useState<null | number>(null);
  const [assignedModifiers, setAssignedModifiers] = useState<Record<number, Record<number, string>>>({}); // encounterIndex -> raiderIndex -> modifierName

  const [audioMuted, setAudioMuted] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  console.log('in StartLootbox', { raiders });

  const audio = new Audio(music);
  audio.volume = 0.1;

  useEffect(() => {
    const newAssignedModifiers = {} as Record<number, Record<number, string>>;
    encounters.forEach((_, encounterIndex) => {
      newAssignedModifiers[encounterIndex] = {};
      raiders.forEach((raider, raiderIndex) => {
        newAssignedModifiers[encounterIndex][raiderIndex] = '';
      });
    });
    setAssignedModifiers({ ...newAssignedModifiers });
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
    newAssignedModifiers[currentEncounter][currentRaider] = chosenModifier.name;
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
    const newSelectedItem = Math.floor(Math.random() * modifierCount);
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

  return (
    <>
      <h2>{selectedRaid.name} Loot Box Raid</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {/* <div className="chosenModifiers">
          <div>Chosen Modifiers:</div>
          {chosenModifiers.map((x) => (
            <div key={modifiers[x].name}>{modifiers[x].name}</div>
            ))}
          </div> */}
        <EncounterGrid
          encounters={selectedRaid.encounters}
          raiders={raiders.map((r) => ({ name: r, assignedModifiers: [], modifiersByName: [], byEncounter: {} }))}
          assignedModifiers={assignedModifiers}
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
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      {selectedItem && (
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {raiders[currentRaider]} has been assigned {modifiers[selectedItem!].name} for{' '}
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
