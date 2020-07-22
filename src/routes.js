import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'; 
// para instalar rodar o comando npm install react-router-dom

// "homepage": "https://3sis.com.br/CINDOR2020/",

import ProgCientifica from './pages/ProgramacaoCientifica';

export default function Routes(){
    
    return (
        <BrowserRouter>
            <Switch>
                <Route path={process.env.PUBLIC_URL + '/'} exact component={ ProgCientifica } />
                <Route path={process.env.PUBLIC_URL + '/progcientifica'} component={ ProgCientifica } />
            </Switch>
        </BrowserRouter>
    )
}
