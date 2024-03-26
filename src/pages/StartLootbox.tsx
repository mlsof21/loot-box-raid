import { useEffect, useState } from 'react';
import music from '../assets/music/spinmusic.mp3';
import CustomWheel from '../components/Wheel/Wheel';
import { get, getOrDefault, set } from '../localStorage/localStorage';
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
  borderRadius: '5px',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type EncounterRaiderModifiers = Record<number, Record<number, Modifier | undefined>>;

const StartLootbox = () => {
  const selectedRaid = getOrDefault<Raid>('raid', raids[0]);
  const encounters: RaidEncounter[] = selectedRaid.encounters;
  const raiders = getOrDefault<string[]>('raiders', Array(6).fill(''));
  const modifiers = getOrDefault<Modifier[]>('modifiers', [...defaultModifiers]);

  const [currentRaider, setCurrentRaider] = useState(0);
  const [currentEncounter, setCurrentEncounter] = useState(0);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const [assignedModifiers, setAssignedModifiers] = useState<EncounterRaiderModifiers>({}); // encounterIndex -> raiderIndex -> modifier
  const [isAlreadyAssigned, setIsAlreadyAssigned] = useState(false);
  const [chosenModifiers, setChosenModifiers] = useState<number[]>([]);

  const [audioMuted, setAudioMuted] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const audio = new Audio(music);
  audio.volume = 0.1;

  useEffect(() => {
    const storedAssignedModifiers = loadAssignedModifiers();

    if (!storedAssignedModifiers) {
      setAssignedModifiers(initializeAssignedModifiers());
      return;
    }

    setAssignedModifiers({ ...storedAssignedModifiers });
    const selectedCell = loadCurrentSelectedCell(storedAssignedModifiers);
    setCurrentEncounter(selectedCell[0]);
    setCurrentRaider(selectedCell[1]);
  }, []);

  const initializeAssignedModifiers = () => {
    const newAssignedModifiers = {} as EncounterRaiderModifiers;
    encounters.forEach((_, encounterIndex) => {
      newAssignedModifiers[encounterIndex] = {};
      raiders.forEach((_, raiderIndex) => {
        newAssignedModifiers[encounterIndex][raiderIndex] = undefined;
      });
    });
    return newAssignedModifiers;
  };

  const loadAssignedModifiers = () => {
    const savedModifiers = get('assignedModifiers');

    if (!savedModifiers) {
      return null;
    }

    const parsedModifiers = JSON.parse(savedModifiers);
    return parsedModifiers;
  };

  const loadCurrentSelectedCell = (modifiers: EncounterRaiderModifiers) => {
    let selectedCell = [0, 0];
    let foundCell = false;

    for (let encounterIndex = 0; encounterIndex < encounters.length; encounterIndex++) {
      if (foundCell) break;
      for (let raiderIndex = 0; raiderIndex < raiders.length; raiderIndex++) {
        foundCell = modifiers[encounterIndex][raiderIndex] === undefined;
        if (foundCell) {
          selectedCell = [encounterIndex, raiderIndex];
          break;
        }
      }
    }

    // encounters.forEach((_, encounterIndex) => {
    //   raiders.forEach((__, raiderIndex) => {
    //     if (!foundCell) {
    //       foundCell = modifiers[encounterIndex][raiderIndex] === undefined;
    //       if (foundCell) {
    //         selectedCell = [encounterIndex, raiderIndex];
    //         return;
    //       }
    //     }
    //   });
    //   if (foundCell) return;
    // });
    return selectedCell;
  };

  const acceptAssignment = () => {
    assignNewModifier();
    if (currentRaider === raiders.length - 1) {
      nextEncounter();
    }
    nextRaider();
    setModalOpen(false);
  };

  const assignNewModifier = () => {
    if (selectedItem) {
      const chosenModifier = modifiers[selectedItem];
      const newAssignedModifiers = { ...assignedModifiers };
      newAssignedModifiers[currentEncounter][currentRaider] = chosenModifier;
      setAssignedModifiers(newAssignedModifiers);
      set('assignedModifiers', newAssignedModifiers);
    }
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
    setIsAlreadyAssigned(chosenModifiers.includes(newSelectedItem));
    setChosenModifiers([...chosenModifiers, newSelectedItem]);
    setMustSpin(true);
    playAudio();
    setSelectedItem(newSelectedItem);
  };

  const playAudio = async () => {
    if (!audioPlaying) {
      await audio.play();
      setAudioPlaying(true);
    }
  };

  audio.onended = () => setAudioPlaying(false);

  const handleVolumeClick = () => {
    const newAudioMuted = !audioMuted;
    audio.volume = newAudioMuted ? 0 : 0.1;
    setAudioMuted(newAudioMuted);
  };

  const getAlreadyAssignedText = () => {
    return '';
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
          cellColor={selectedRaid.wheelColor}
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
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-title" variant="h6" component="h2">
              {raiders[currentRaider]} has been assigned
              <Typography sx={{ fontWeight: 'bold' }}>{modifiers[selectedItem].name}</Typography> for{' '}
              {encounters[currentEncounter].name}
            </Typography>
            {isAlreadyAssigned && (
              <Typography id="modal-already-assigned" sx={{ mt: 2 }}>
                {getAlreadyAssignedText()}
              </Typography>
            )}
            <Typography id="modal-description" sx={{ mt: 2 }}>
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
