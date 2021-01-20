import React from 'react';
import { Route,Redirect, Switch } from 'react-router-dom';
import 'fontsource-roboto'; //does not seem to be in use
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import SiteBar from './Layout/SiteBar';
import CreatePoem from './Components/Poem/CreatePoem';
import './App.css';
import ViewPoem from './Components/Poem/ViewPoem';
import ViewAllPoems from './Components/Poem/ViewAllPoems';
import ViewProfile from './Components/Profile/ViewProfile';
import NotFound from './Auth/NotFound';
import Welcome from './Common/Welcome';
import SignOut from './Auth/SignOut';

function App() {
  return (
    <div className="App">
      <SiteBar />
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/signout" component={SignOut} />
        <Route path="/poetry/create" component={CreatePoem} />
        <Route path="/poetry/mine" exact component={ViewAllPoems} />
        <Route path="/poetry/:poetryId" exact component={ViewPoem} />
        <Route path="/poetry" exact component={ViewAllPoems} />
        <Route path="/profile/mine" component={ViewProfile} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/notFound" component={NotFound} />
        <Redirect from="/" exact to="/poetry"/>
        <Redirect to="/notFound" />
      </Switch>
    </div>
  );
}

export default App;
