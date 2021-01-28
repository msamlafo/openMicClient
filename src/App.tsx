import React from 'react';
import { Route,Redirect, Switch } from 'react-router-dom';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import CreatePoem from './Components/Poem/CreatePoem';
import ViewPoem from './Components/Poem/ViewPoem';
import ViewAllPoems from './Components/Poem/ViewAllPoems';
import ViewProfile from './Components/Profile/ViewProfile';
import NotFound from './Auth/NotFound';
import Welcome from './Common/Welcome';
import SignOut from './Auth/SignOut';
import ViewIssue from './Components/Issue/ViewIssue';
import AppRoute from './Layout/AppRoute';
import GuestLayout from './Layout/GuestLayout';
import MainLayout from './Layout/MainLayout';
import 'fontsource-roboto'; //does not seem to be in use
import './App.css';

function App() {
  return (
    <main className="App">
      <Switch>
        <AppRoute path="/signup" component={SignUp} layout={GuestLayout}/>
        <AppRoute path="/login" component={Login} layout={GuestLayout}/>
        <AppRoute path="/signout" component={SignOut} layout={MainLayout}/>
        <Route path="/poetry/create" component={CreatePoem} layout={MainLayout}/>
        <AppRoute path="/poetry/mine" exact component={ViewAllPoems} layout={MainLayout}/>
        <AppRoute path="/poetry/:poetryId" exact component={ViewPoem} layout={MainLayout}/>
        <AppRoute path="/poetry" exact component={ViewAllPoems} layout={MainLayout}/>
        <AppRoute path="/profile/mine" component={ViewProfile} layout={MainLayout}/>
        <AppRoute path="/issue" component={ViewIssue} layout={MainLayout}/>
        <AppRoute path="/welcome" component={Welcome} layout={MainLayout}/>
        <AppRoute path="/notFound" component={NotFound} layout={MainLayout}/>
        <Redirect from="/" exact to="/poetry"/>
        <Redirect to="/notFound" />
      </Switch>
    </main>
  );
}

export default App;
