import './app.scss';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import RaidSetup from './pages/RaidSetup';
import Nav from './components/Nav/Nav';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact={true} path="/raidSetup" component={RaidSetup} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
