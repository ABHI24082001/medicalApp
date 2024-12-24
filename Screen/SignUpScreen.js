import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import User from '../Screen/LottiView/user.json';
import doctor from '../Screen/LottiView/doctor.json';

const SignUpScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [scale, setScale] = useState(new Animated.Value(1));

  // Validation function
  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter your name.');
      return false;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return false;
    }
    if (!password.trim() || password.length < 6) {
      Alert.alert(
        'Validation Error',
        'Password must be at least 6 characters long.',
      );
      return false;
    }
    if (!role) {
      Alert.alert('Validation Error', 'Please select a role.');
      return false;
    }
    return true;
  };

  // Handle submit
  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Name:', name);
      console.log('Role:', role);
      console.log('Email:', email);
      console.log('Password:', password);
      Alert.alert('Success', 'You have successfully signed up!');
      // Perform sign-up actions (e.g., API call)
    }
  };

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={26} color="#4F4F4F" />
        </TouchableOpacity>
        <Text style={styles.title}>Sign Up</Text>
      </View>

      {/* Role Selection */}
      <Text style={styles.HeaderTitle}>Choose Account Role</Text>

      <View style={styles.roleButtonsContainer}>
        {/* User Button with Animation */}
        <Animated.View
          style={[
            styles.roleButton,
            role === 'User' && styles.selectedRole,
            {transform: [{scale}]},
          ]}>
          <TouchableOpacity
            style={styles.buttonInner}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => setRole('User')}>
            <LottieView
              source={doctor}
              autoPlay
              loop
              style={styles.lottieIcon}
            />
            <Text style={styles.roleButtonText}>User</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Doctor Button with Animation */}
        <Animated.View
          style={[
            styles.roleButton,
            role === 'Doctor' && styles.selectedRole,
            {transform: [{scale}]},
          ]}>
          <TouchableOpacity
            style={styles.buttonInner}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => setRole('Doctor')}>
            <LottieView source={User} autoPlay loop style={styles.lottieIcon} />
            <Text style={styles.roleButtonText}>Doctor</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Icon name="person" size={20} color="#A9A9A9" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#A9A9A9"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="email" size={20} color="#A9A9A9" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          placeholderTextColor="#A9A9A9"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#A9A9A9" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={!passwordVisible}
          value={password}
          placeholderTextColor="#A9A9A9"
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon
            name={passwordVisible ? 'visibility' : 'visibility-off'}
            size={20}
            color="#A9A9A9"
            style={styles.iconRight}
          />
        </TouchableOpacity>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4F4F4F',
    marginLeft: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  HeaderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Helvetica',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginBottom: 16,
  },
  icon: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 'auto',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#4F4F4F',
  },
  roleButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  roleButton: {
    width: '45%',
    borderRadius: 8,
    backgroundColor: '#00BFA6',
    marginBottom: 15,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  selectedRole: {
    backgroundColor: '#00796B',
  },
  roleButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonInner: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieIcon: {
    width: 60,
    height: 60,
  },
  signUpButton: {
    backgroundColor: '#00BFA6',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    fontSize: 14,
    color: '#4F4F4F',
    textAlign: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#00BFA6',
  },
});

export default SignUpScreen;
