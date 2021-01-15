import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'fontsource-roboto'; //does not seem to be in use
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import SiteBar from './Layout/SiteBar';
import CreatePoem from './Components/Poem/CreatePoem';
import './App.css';
import ViewPoem from './Components/Poem/ViewPoem';

function App() {
  return (
    <div className="App">
      <SiteBar />
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/poetry/create" component={CreatePoem} />
        <Route path="/poetry/:poetryId" component={ViewPoem} />
      </Switch>
    </div>
  );
}

export default App;
