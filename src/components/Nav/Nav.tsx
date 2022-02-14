import { Link } from 'react-router-dom';
import './nav.scss';

const Nav = () => {
  return <div className="navbar">{<Link to="/raidSetup">Raid Setup</Link>}</div>;
};

export default Nav;
