import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SuccessMessage from './component/sucess';
import LottieView from 'lottie-react-native';
import Login from '../Screen/LottiView/Login.json'

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // New state for success message
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const defaultEmail = 'user@example.com';
  const defaultPassword = 'password123';



  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setEmailError('');
      return true;
    } else {
      setEmailError('Please enter a valid email address');
      return false;
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const validatePassword = password => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (passwordRegex.test(password)) {
      setPasswordError('');
      return true;
    } else {
      setPasswordError(
        'Password must be at least 8 characters and include both letters and numbers',
      );
      return false;
    }
  };

 const handleLogin = () => {
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  if (isEmailValid && isPasswordValid) {
    if (password === defaultPassword) {
      // Centralized role handling
      switch (email) {
        case 'admin@example.com':
          Alert.alert('Login Successful', 'Welcome, Admin!');
          navigation.navigate('AdminTabs'); // Navigate to Admin Dashboard
          break;
        case 'doctor@example.com':
          Alert.alert('Login Successful', 'Welcome, Doctor!');
          navigation.navigate('DoctorTabs'); // Navigate to Doctor Dashboard
          break;
        case 'user@example.com':
          Alert.alert('Login Successful', 'Welcome, User!');
          navigation.navigate('usertabs'); // Navigate to User Dashboard
          break;
        default:
          Alert.alert('Login Failed', 'Invalid email or password');
      }
    } else {
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  } else {
    Alert.alert('Invalid Input', 'Please fix the errors and try again.');
  }
};

  const handleSubmitSuccess = () => {
    setShowSuccessMessage(false);
    navigation.navigate('usertabs');
  };

  return (
    <View style={styles.container}>
      {showSuccessMessage ? (
        <SuccessMessage
          icon="check-decagram"
          title="Successful"
          subtitle="Your account has been created"
          buttonText="Submit"
          onPress={handleSubmitSuccess}
        />
      ) : (
        <>
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <Icon name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Login</Text>
          </View>

          <View style={styles.centerContainer}>
            <LottieView
              source={Login}
              autoPlay
              loop={true}
              style={styles.lottieView}
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Icon
              name="email-outline"
              size={20}
              color="#6B6B6B"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#A9A9A9"
              value={email}
              onChangeText={text => setEmail(text)}
              onBlur={() => validateEmail(email)}
            />
          </View>
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Icon
              name="lock-outline"
              size={20}
              color="#6B6B6B"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#A9A9A9"
              secureTextEntry={!isPasswordVisible} // Toggle visibility
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Icon
                name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'} // Change icon based on state
                size={20}
                color="#6B6B6B"
                style={styles.iconRight}
              />
            </TouchableOpacity>
          </View>

          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgetPassword')}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.signUpText}>
              Don’t have an account?{' '}
              <Text style={styles.signUpLink}>Sign up</Text>
            </Text>
          </TouchableOpacity>

          {/* Divider and Social Buttons */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity
              style={styles.roundedIcon}
              onPress={() => navigation.navigate('Dashboard')}>
              <FontAwesomeIcon name="google" size={30} color="#4285F4" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundedIcon}>
              <FontAwesomeIcon name="facebook" size={30} color="#3b5998" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roundedIcon}
              onPress={() => navigation.navigate('LoginPhone')}>
              <Icon name="phone" size={30} color="#34c759" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF',
  },

  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieView: {
    width: 300,
    height: 300,
  },
  roundedIcon: {
    width: 70,
    height: 70,
    borderRadius: 25,
   
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginLeft: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  iconRight: {
    marginLeft: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#1E90FF',
    fontSize: 14,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#00BFA6',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 14,
    marginBottom: 20,
  },
  signUpLink: {
    color: '#1E90FF',
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
  roundedIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default LoginScreen;
