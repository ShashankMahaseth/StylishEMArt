import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { OnBoardingScreenProps } from '../types/fontColor';
import { onBoardingData } from '../constants/onboardingData';
import DotIndicator from '../components/DotIndicator';

const { width: SCREEN_WIDTH } = Dimensions.get('window');



const OnBoardingScreen = ({ fontColor = '#111111' }: OnBoardingScreenProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const flatListRef = React.useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width,
    );
    setCurrentIndex(index);
  };

  const goToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      goToIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    const lastIndex = onBoardingData.length - 1;
    if (currentIndex < lastIndex) {
      goToIndex(currentIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
{/***************************************************************************************************/}
      <View style={styles.topTextContainer}>
        <Text style={styles.title1}>
          <Text style={{ color: fontColor }}>{currentIndex + 1}</Text>
          <Text style={{ color: 'gray' }}>/{onBoardingData.length}</Text>
        </Text>

        <Text style={[styles.title1, { color: fontColor }]}>Skip</Text>
      </View>
{/***************************************************************************************************/}

      <FlatList
        ref={flatListRef}
        data={onBoardingData}
        keyExtractor={(item) => item.id}
        style={styles.list}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={[styles.title2, { color: fontColor }]}>{item.title}</Text>
            <Text style={[styles.description, { color: '#A8A8A9' }]}>{item.description}</Text>
          </View>
        )}
      />
{/***************************************************************************************************/}
      <View style={styles.bottomItem}>
        {currentIndex > 0 ? (
          <Pressable onPress={handlePrev} hitSlop={8} style={styles.bottomButton}>
            <Text style={[styles.title1, { color: fontColor }]}>Prev</Text>
          </Pressable>
        ) : (
          <View style={styles.bottomButton} />
        )}

        <DotIndicator currentIndex={currentIndex}/>

        <Pressable onPress={handleNext} hitSlop={8} style={styles.bottomButton}>
          <Text style={[styles.title1, { color: '#F83758' }]}>
            {currentIndex + 1 === 3 ? 'GetStarted' : 'Next'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: moderateScale(24),
    
  },
  topTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: moderateScale(17),
  },
  title1: {
    fontSize: 18,
    paddingVertical: moderateScale(1),
   
    fontFamily: 'Montserrat-Regular',
  },
  slide: {
    width: SCREEN_WIDTH,
     alignItems: 'center',
    paddingHorizontal: moderateScale(24),
  },
  list: {
    width: '100%',
    flexGrow: 0,// let it hug content so space-between can show

  },
  image: {
    width: moderateScale(300),
    height: moderateScale(300),
    resizeMode: 'contain',
    marginTop: moderateScale(12),
    marginBottom: moderateScale(15),
  },
  title2: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: moderateScale(10),
    fontFamily: 'Montserrat-Regular',
  },
  bottomItem:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    paddingHorizontal: moderateScale(17),
 },
  bottomButton: {
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(8),
    minWidth: moderateScale(48),
    alignItems: 'center',
  },

});

export default OnBoardingScreen;
