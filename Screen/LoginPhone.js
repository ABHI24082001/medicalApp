import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const PhoneLoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleGetOTP = () => {
    // Handle OTP logic here
    console.log('Get OTP for:', phoneNumber);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Please enter your Phone number</Text>

      {/* Phone Number Input */}
      <View style={styles.phoneInputContainer}>
        <TouchableOpacity style={styles.countryCodeContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <FontAwesomeIcon name="angle-down" size={16} color="#333" />
        </TouchableOpacity>
        <TextInput
          style={styles.phoneInput}
          placeholder="Phone number"
          keyboardType="phone-pad"
          value={phoneNumber}
          placeholderTextColor="#A9A9A9"
          onChangeText={setPhoneNumber}
        />
      </View>

      {/* Keep me Signed in */}
      

      {/* Get OTP Button */}
      <TouchableOpacity style={styles.otpButton}onPress={() => navigation.navigate('Loginotp')}>
        <Text style={styles.otpButtonText}>Get OTP</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or sign in with</Text>
        <View style={styles.divider} />
      </View>

      {/* Login with Email Button */}
      <TouchableOpacity style={styles.emailLoginButton} onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.emailLoginButtonText}>Login with email</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B6B6B',
    marginBottom: 24,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  countryCode: {
    fontSize: 16,
    marginRight: 4,
    color: '#333',
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  otpButton: {
    backgroundColor: '#00BFA6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  otpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#A9A9A9',
    fontSize: 14,
  },
  emailLoginButton: {
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  emailLoginButtonText: {
    color: '#333',
    fontSize: 16,
  },
});

export default PhoneLoginScreen;
