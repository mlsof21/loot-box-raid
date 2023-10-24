import './encounterGrid.scss';
import { RaidEncounter } from '../../types/Raid';
import { RandomizedUser } from '../../randomizer/randomizer';

interface Props {
  encounters: RaidEncounter[];
  raiders: RandomizedUser[];
}

const EncounterGrid = ({ encounters, raiders }: Props) => {
  // Create a data structure to hold the modifiers for each encounter and raider
  console.log('in EncounterGrid', { encounters, raiders });
  const encounterRows = encounters.map((encounter) => {
    return (
      <>
        <div className="encounter-name">{encounter.name}</div>
        {raiders.map((raider, raiderIndex) => (
          <div key={raiderIndex} className="modifier-cell">
            {/* {modifiers[encounter]?.[raider.name]} Display assigned modifier for this raider and encounter */}
          </div>
        ))}
      </>
    );
  });

  return (
    <div className="encounter-grid">
      <div className="empty-cell"></div>
      {raiders.map((raider, raiderIndex) => (
        <div key={raiderIndex} className="raider-header">
          {raider.name}
        </div>
      ))}
      {encounterRows}
    </div>
  );
};

export default EncounterGrid;
