import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAppDispatch } from '../store/redux/hooks';
import { checkAuthThunk } from '../store/redux/authThunk';

const LOGO = require('../../assets/stylishlogo.png');

type SplashNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

const Splash = () => {
  const navigation = useNavigation<SplashNavigationProp>();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    let cancelled = false;
    (async ()=>{
      try{
        const loggedIn = await dispatch(checkAuthThunk()).unwrap();
        if(cancelled) return;
        navigation.replace(loggedIn?"Home":"Onboarding")
      }catch{
        if(!cancelled) navigation.replace("Onboarding")
      }
    })();
    return () =>{
      cancelled= true;
    }
},[dispatch,navigation]);
  
  return (

    <View style={styles.container}>
      <Image style={styles.imageSize} source={LOGO} />
    </View>
    
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSize: {
    width: moderateScale(275),
    height: moderateScale(100),
    resizeMode: 'contain',
  },
});

export default Splash;
