import React from 'react'
import { Switch, Route } from 'react-router';
import App from './App';
import Compendium from './Components/Compendium/Compendium';


const Router = () => {
    return (
        <Switch>
            <Route exact path ="/"  render={(props) => <App {...props}  key={Date.now()} />}/>
            <Route exact path ="/Compendium"  render={(props) => <Compendium {...props}  key={Date.now()} />}/>
        </Switch>
    )
}

// Start Router function here //
export default Router