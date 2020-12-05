import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing'; // importa página principal
import OrphanagesMap from './pages/OrphanagesMap'; // importa página que exibe o mapa
import Orphanages from './pages/Orphanage'; // importa página de orfanatos
import CreateOrphanages from './pages/CreateOrphanage'; // importa página de criação de orfanatos


function Routes(){
    // path: nome da página. 
    // component: qual componente deve ser carregado. 
    // exact: carrega exatamente o que está no path
    // Switch permite que apenas uma rota seja exibida
    return(
        <BrowserRouter>
            <Switch> 
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrphanagesMap} />
                <Route path="/orphanages/create" component = { CreateOrphanages } /> {/* cria rota para criação de orfanatos */}
                <Route path="/orphanages/:id" component = { Orphanages } /> {/* cria rota. :ID é dinâmico */}
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;