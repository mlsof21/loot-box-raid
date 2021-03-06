import { useState } from 'react';
import Wheel from '../components/Wheel/Wheel';
import { get, set } from '../localStorage/localStorage';
import { knownRaids } from '../raids/known-raids';
import { defaultModifiers } from '../raids/modifiers';
import music from '../assets/music/spinmusic.mp3';
import volumeOn from '../assets/images/volumeOn.png';
import volumeOff from '../assets/images/volumeOff.png';

import './raidSetup.scss';

const StartLootbox = () => {
  const storageRaid = get('raid');
  const storageRaiders = get('raiders');
  const storageModifiers = get('modifiers');

  const initialRaid = storageRaid ? JSON.parse(storageRaid) : knownRaids[0].name;
  const initialRaiders = storageRaiders ? JSON.parse(storageRaiders) : ['', '', '', '', '', ''];
  const initialModifiers = storageModifiers ? JSON.parse(storageModifiers) : [...defaultModifiers];
  const audio = new Audio(music);
  audio.volume = 0.1;

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
  const [audioMuted, setAudioMuted] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | number>(null);

  const selectItem = () => {
    console.log('in selectItem', selectedItem);
    if (selectedItem === null) {
      console.log('in if');
      const newSelectedItem = Math.floor(Math.random() * modifiers.length);
      audio.play();
      setSelectedItem(newSelectedItem);
    } else {
      setSelectedItem(null);
      console.log('in else', selectedItem);
      //   const timer = setTimeout(selectItem, 500);
      //   return () => clearTimeout(timer);
    }
  };

  const handleVolumeClick = () => {
    const newAudioMuted = !audioMuted;
    audio.volume = newAudioMuted ? 0 : 0.1;
    console.log('audio: ', audio.volume);
    setAudioMuted(newAudioMuted);
  };

  return (
    <>
      <div className="soundButton" onClick={handleVolumeClick}>
        {audioMuted ? <img src={volumeOn} /> : <img src={volumeOff} />}
      </div>
      <Wheel items={modifiers.map((x) => x.name)} handleWheelClick={selectItem} selectedItem={selectedItem} />
    </>
  );
};

export default StartLootbox;
