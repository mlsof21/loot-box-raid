import { ReactNode } from 'react';
import './ModifierTooltip.scss';

interface Props {
  modifierDescription?: string;
  children: ReactNode;
}

const ModifierTooltip = ({ modifierDescription, children }: Props) => {
  return (
    <div className="tooltip-container">
      {children}
      {modifierDescription && <span className="tooltip">{modifierDescription}</span>}
    </div>
  );
};

export default ModifierTooltip;
