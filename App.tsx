/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

<<<<<<< HEAD
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from './src/res/themes/hook/useTheme';
import Splash from './src/presentation/screens/Splash';

import OnBoardingScreen from './src/presentation/screens/OnBoardingScreen';
import React from 'react';
=======

>>>>>>> 32614bb04edd9e548c5615d492d1ce1e5307fae1

const App =()=> {
  const colors =  useTheme()
  return (
<<<<<<< HEAD
    <SafeAreaProvider  style={[ { backgroundColor: colors.background }]}>
      <OnBoardingScreen fontColor={colors.text}/>
=======
>>>>>>> 32614bb04edd9e548c5615d492d1ce1e5307fae1
    </SafeAreaProvider>
  );
}

export default App;
