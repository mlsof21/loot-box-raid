import './app.scss';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import RaidSetup from './pages/RaidSetup';
import Nav from './components/Nav/Nav';
import StartLootbox from './pages/StartLootbox';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact={true} path="/raidSetup" component={RaidSetup} />
          <Route exact={true} path="/startLootbox" component={StartLootbox} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
