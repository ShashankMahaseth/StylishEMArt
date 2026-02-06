import React from 'react';
import { View, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { onBoardingData } from '../constants/onboardingData';

interface DotIndicatorProps {
  currentIndex: number;
}

const DotIndicator: React.FC<DotIndicatorProps> = ({ currentIndex }) => {
  return (
    <View style={styles.container}>
      {onBoardingData.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === currentIndex && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  dot: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: '#D3D3D3',
    
  },
  activeDot: {
    backgroundColor: '#F83758',
    height:moderateScale(8),
    width: moderateScale(40),
  },
});

export default DotIndicator;