import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
const LOGO = require('../../assets/stylishlogo.png');

const Splash =()=> {
  
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
