import './encounterGrid.scss';
import { Modifier } from '../../types/Raid';
import ModifierTooltip from '../ModifierTooltip/ModifierTooltip';

interface Props {
  encounterIndex: number;
  raiderIndex: number;
  modifier?: Modifier;
  selected: boolean;
  onSelectCell: (a: number, b: number) => void;
  cellColor: string;
}

const EncounterGridCell = ({ encounterIndex, raiderIndex, modifier, selected, onSelectCell, cellColor }: Props) => {
  return (
    <ModifierTooltip modifierDescription={modifier?.description}>
      <div
        style={{ backgroundColor: cellColor }}
        className={`grid-cell modifier-cell ${selected ? 'selected' : ''}`}
        onClick={() => onSelectCell(encounterIndex, raiderIndex)}
      >
        {modifier?.name ?? ''}
      </div>
    </ModifierTooltip>
  );
};

export default EncounterGridCell;
