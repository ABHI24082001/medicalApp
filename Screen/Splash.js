import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {screenWidth, screenHeight} from './utils';

const SplashScreen = ({navigation}) => {
  const logoOpacity = new Animated.Value(0);
  const textOpacity = new Animated.Value(0);

  useEffect(() => {
    // Animate logo and text on mount
    Animated.sequence([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after 3 seconds
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [navigation, logoOpacity, textOpacity]);

  return (
    <LinearGradient
      colors={['#00BFA6', '#005F56']}
      style={styles.container}>
      <View style={styles.logoContainer}>
        <Animated.Image
          source={require('../assests/Login.jpeg')}
          style={[
            styles.logo,
            {opacity: logoOpacity, transform: [{scale: logoOpacity}]},
          ]}
        />
        <Animated.Text style={[styles.appName, {opacity: textOpacity}]}>
          Heal In India
        </Animated.Text>
      </View>
    </LinearGradient>
  );
};

export default SplashScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: screenWidth * 0.5,
    height: screenHeight * 0.3,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  appName: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 2, // Modern spacing
    textTransform: 'uppercase', // Gives a premium look
    textAlign: 'center',
  },
});

