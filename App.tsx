/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from './src/res/themes/hook/useTheme';

import React from 'react';
import AppNavigator from './src/presentation/navigation/AppNavigator';
import { Provider } from "react-redux";
import { store } from './src/presentation/store/store';


const App =()=> {

  const colors =  useTheme()

  return (
    <Provider store={store}>
    <SafeAreaProvider  style={[ { backgroundColor: colors.background }]}>
      
      <AppNavigator/>

    </SafeAreaProvider>
    </Provider>
  );
  
}

export default App;
