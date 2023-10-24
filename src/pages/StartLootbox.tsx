import { useEffect, useState } from 'react';
import music from '../assets/music/spinmusic.mp3';
import CustomWheel from '../components/Wheel/Wheel';
import { get, getOrDefault } from '../localStorage/localStorage';
import { defaultModifiers } from '../raids/modifiers';
import { raids } from '../raids/raids';
import { Modifier, Raid, Raider } from '../types/Raid';
import './raidSetup.scss';
import EncounterGrid from '../components/EncounterGrid/EncounterGrid';
import { RandomizedUser } from '../randomizer/randomizer';

const StartLootbox = () => {
  const [selectedRaid, setSelectedRaid] = useState<Raid>(getOrDefault<Raid>('raid', raids[0]));
  const [raiders, setRaiders] = useState<string[]>(getOrDefault<string[]>('raiders', Array(6).fill('')));
  const [modifiers, setModifiers] = useState<Modifier[]>(getOrDefault<Modifier[]>('modifiers', [...defaultModifiers]));
  const [chosenModifiers, setChosenModifiers] = useState<number[]>([]);
  const [audioMuted, setAudioMuted] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | number>(null);
  const [modifierCount, _] = useState(modifiers.length);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  console.log('in StartLootbox', { raiders });

  const audio = new Audio(music);
  audio.volume = 0.1;

  useEffect(() => {
    console.log('in useEffect', { selectedItem: modifiers.length });
    if (selectedItem) {
      const newChosenModifiers = [...chosenModifiers, selectedItem];
      setChosenModifiers(newChosenModifiers);
    }
  }, [selectedItem]);

  useEffect(() => {
    if (mustSpin) {
      setTimeout(() => {
        setMustSpin(false);
      }, 4400);
    }
  }, [mustSpin]);

  const selectItem = () => {
    console.log('in selectItem', selectedItem);

    console.log('in if');
    setMustSpin(true);
    let newSelectedItem = Math.floor(Math.random() * modifierCount);
    while (chosenModifiers.includes(newSelectedItem)) {
      console.log('in while', { newSelectedItem, chosenModifiers });
      newSelectedItem = Math.floor(Math.random() * modifierCount);
    }
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
    </>
  );
};

export default StartLootbox;
