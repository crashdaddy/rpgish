import React from 'react'
import { Switch, Route } from 'react-router';
import App from './App';
import Compendium from './Components/Compendium/Compendium';
import Login from './Components/Login/Login'
import Profile from './Components/Profile/Profile'


const Router = () => {
    return (
        <Switch>
            <Route exact path ="/"  render={(props) => <App {...props}  key={Date.now()} />}/>
            <Route exact path ="/Compendium"  render={(props) => <Compendium {...props}  key={Date.now()} />}/>
            <Route exact path ="/login"  render={(props) => <Login {...props}  key={Date.now()} />}/>
            <Route exact path ="/profile" render={(props) => <Profile {...props} key={Date.now()} />}/>
        </Switch>
    )
}

// Start Router function here //
export default Router