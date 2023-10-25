import './encounterGrid.scss';
import { RaidEncounter } from '../../types/Raid';
import { RandomizedUser } from '../../randomizer/randomizer';

interface Props {
  encounters: RaidEncounter[];
  raiders: RandomizedUser[];
  assignedModifiers: Record<number, Record<number, string>>;
}

const EncounterGrid = ({ encounters, raiders, assignedModifiers }: Props) => {
  // Create a data structure to hold the modifiers for each encounter and raider

  return (
    <div className="encounter-grid">
      <div className="empty-cell"></div>
      {raiders.map((raider, raiderIndex) => (
        <div key={raiderIndex} className="raider-header">
          {raider.name}
        </div>
      ))}
      {encounters.map((encounter, encounterIndex) => {
        return (
          <>
            <div className="encounter-name">{encounter.name}</div>
            {raiders.map((_, raiderIndex) => (
              <div key={raiderIndex} className="modifier-cell">
                {assignedModifiers[encounterIndex]?.[raiderIndex] ?? ''}
              </div>
            ))}
          </>
        );
      })}
    </div>
  );
};

export default EncounterGrid;
