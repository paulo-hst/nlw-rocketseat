import React from 'react';

import { NavigationContainer } from '@react-navigation/native'; // engloba todas as rotas
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';

import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';

import Header from './components/Header';


export default function Routes(){
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ cardStyle: {backgroundColor: '#f2f3f5' }}}>
                <Screen 
                    name="OrphanagesMap" 
                    component={OrphanagesMap}
                    options={{
                        // headerTransparent: true,
                        // header: () => <Header title="caraca"/> // Permite adicionar Header personalizado
                    }}
                />   
                <Screen 
                    name="OrphanageDetails" 
                    component={OrphanageDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Orfanato"/> // Permite adicionar Header personalizado
                    }}
                />   
                <Screen 
                    name="SelectMapPosition" 
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Selecione no mapa"/> // Permite adicionar Header personalizado
                    }}
                />   
                <Screen 
                    name="OrphanageData" 
                    component={OrphanageData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Informe os dados"/> // Permite adicionar Header personalizado
                    }}
                />          
            </Navigator>
        </NavigationContainer>
    ); 
}
