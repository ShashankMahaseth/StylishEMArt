/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from './src/res/themes/hook/useTheme';
import Splash from './src/presentation/screens/Splash';

import OnBoardingScreen from './src/presentation/screens/OnBoardingScreen';
import React from 'react';


const App =()=> {
  const colors =  useTheme()
  return (
    <SafeAreaProvider  style={[ { backgroundColor: colors.background }]}>
      <OnBoardingScreen fontColor={colors.text}/>

    </SafeAreaProvider>
  );
}

export default App;
