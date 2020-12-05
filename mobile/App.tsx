import React from 'react';

import { useFonts } from 'expo-font';
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';

import Routes from './src/routes';

export default function App() {

  // joga as fontes dentro do objeto fontsLoaded atraves do método useFonts
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold, 
    Nunito_700Bold, // alterar nome
    Nunito_800ExtraBold
  })

  // verifica se as fontes estão carregadas
  if (!fontsLoaded){
    return null;
  }

  return (
    <Routes />
  );
}

