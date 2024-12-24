import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import Refresh from '../LottiView/reFresh.json'


const LoadingModal = () => {
  return (
    <View style={styles.centerContainer}>
      <LottieView
        source={Refresh} 
        autoPlay
        loop={true}
        style={styles.lottieView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {  
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieView: {
    width: 100, 
    height: 100,
  },
});

export default LoadingModal;
