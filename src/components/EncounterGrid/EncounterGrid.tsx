import './encounterGrid.scss';
import { Modifier, RaidEncounter } from '../../types/Raid';
import { RandomizedUser } from '../../randomizer/randomizer';
import EncounterGridCell from './EncounterGridCell';

interface Props {
  encounters: RaidEncounter[];
  raiders: RandomizedUser[];
  assignedModifiers: Record<number, Record<number, Modifier | undefined>>;
  selectedCell: [number, number];
  onSelectCell: (encounterIndex: number, raiderIndex: number) => void;
  cellColor: string;
}

const EncounterGrid = ({ encounters, raiders, assignedModifiers, selectedCell, onSelectCell, cellColor }: Props) => {
  return (
    <div className="encounter-grid">
      <div className="empty-cell"></div>
      {raiders.map((raider, raiderIndex) => (
        <div key={raiderIndex} className="grid-cell raider-header">
          {raider.name}
        </div>
      ))}
      {encounters.map((encounter, encounterIndex) => {
        return (
          <>
            <div className="encounter-name">{encounter.name}</div>
            {raiders.map((_, raiderIndex) => (
              <EncounterGridCell
                encounterIndex={encounterIndex}
                raiderIndex={raiderIndex}
                modifier={assignedModifiers[encounterIndex]?.[raiderIndex]}
                selected={encounterIndex === selectedCell[0] && raiderIndex === selectedCell[1]}
                onSelectCell={() => onSelectCell(encounterIndex, raiderIndex)}
                cellColor={cellColor}
              />
            ))}
          </>
        );
      })}
    </div>
  );
};

export default EncounterGrid;
