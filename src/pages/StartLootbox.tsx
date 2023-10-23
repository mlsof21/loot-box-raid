import { useEffect, useState } from 'react';
import CustomWheel from '../components/Wheel/Wheel';
import { get, set } from '../localStorage/localStorage';
import { raids } from '../raids/raids';
import { defaultModifiers } from '../raids/modifiers';
import music from '../assets/music/spinmusic.mp3';
import volumeOn from '../assets/images/volumeOn.png';
import volumeOff from '../assets/images/volumeOff.png';

import './raidSetup.scss';

const StartLootbox = () => {
  const storageRaid = get('raid');
  const storageRaiders = get('raiders');
  const storageModifiers = get('modifiers');

  const initialRaid = storageRaid ? JSON.parse(storageRaid) : raids[0];
  const initialRaiders = storageRaiders ? JSON.parse(storageRaiders) : ['', '', '', '', '', ''];
  const initialModifiers = storageModifiers ? JSON.parse(storageModifiers) : [...defaultModifiers];
  const audio = new Audio(music);
  audio.volume = 0.1;

  if (!storageRaid) {
    set('raid', raids[0]);
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
  const [chosenModifiers, setChosenModifiers] = useState<number[]>([]);
  const [audioMuted, setAudioMuted] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | number>(null);
  const [modifierCount, _] = useState(modifiers.length);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);

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
    setSpinDegrees(getSpinDegrees());
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
      {/* <div className="soundButton" onClick={handleVolumeClick}>
        {audioMuted ? <img alt="volume on" src={volumeOn} /> : <img alt="volumne off" src={volumeOff} />}
      </div> */}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className="chosenModifiers">
          <div>Chosen Modifiers:</div>
          {chosenModifiers.map((x) => (
            <div key={modifiers[x].name}>{modifiers[x].name}</div>
          ))}
        </div>
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
