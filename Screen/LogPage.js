import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Logo/Heart with Cross */}
      <View style={styles.logoContainer}>
      <Image
          style={styles.logo}
          source={require('../assests/Login.jpeg')}
        />
      </View>

      {/* App Name */}
      <Text style={styles.appName}>Heal In India</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Let’s get started!</Text>
      <Text style={styles.description}>Login to stay healthy and fit</Text>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Logind')}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate('SignUpScreen')}
      >
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
  },
  logoContainer: {
    marginBottom: 5,
  },
  logo: {
    height: 200,
    width: 200,
    borderRadius: 17,
  },
  appName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#00BFA6',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#4F4F4F',
    marginBottom: 5,
  },
  description: {
    fontSize: 13,
    color: '#A9A9A9',
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: '#00BFA6',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 80,
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    borderColor: '#00BFA6',
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 80,
  },
  signUpButtonText: {
    color: '#00BFA6',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
