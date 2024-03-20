import './app.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import RaidSetup from './pages/RaidSetup';
import Nav from './components/Nav/Nav';
import StartLootbox from './pages/StartLootbox';
import { Box, Container } from '@mui/material';

function App() {
  return (
    <>
      <Nav />
      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1, mt: 2, margin: 'auto' }}>
          <Switch>
            <Route exact={true} path="/" component={RaidSetup} />
            <Route exact={true} path="/raidSetup" component={RaidSetup} />
            <Route exact={true} path="/startLootbox" component={StartLootbox} />
            <Redirect to="/" />
          </Switch>
        </Box>
      </Container>
    </>
  );
}

export default App;
