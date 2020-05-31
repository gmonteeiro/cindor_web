import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'; 
// para instalar rodar o comando npm install react-router-dom

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';
import ProgCientifica from './pages/ProgramacaoCientifica';

export default function Routes(){
    
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ ProgCientifica } />
                <Route path="/register" component={ Register } />

                <Route path="/profile" component={ Profile } />
                <Route path="/incidents/new" component={ NewIncident } />
                <Route path="/progcientifica" component={ ProgCientifica } />
            </Switch>
        </BrowserRouter>
    )
}
