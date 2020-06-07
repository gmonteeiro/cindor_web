import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'; 
// para instalar rodar o comando npm install react-router-dom


import ProgCientifica from './pages/ProgramacaoCientifica';

export default function Routes(){
    
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ ProgCientifica } />
                <Route path="/progcientifica" component={ ProgCientifica } />
            </Switch>
        </BrowserRouter>
    )
}
