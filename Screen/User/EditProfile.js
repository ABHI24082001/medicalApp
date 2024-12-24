import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CountryPicker from '../component/CountryPicker';
import {Dropdown} from 'react-native-element-dropdown';
import InputField from '../component/InputField';

const ProfileEdit = ({navigation}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Daniel Martinez',
    age: '32',
    number: '123 856479683',
    email: 'sonuk2oo3@gmail.com',
    gender: null,
  });

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isCountryPickerVisible, setIsCountryPickerVisible] = useState(false);

  const [gender, setGender] = useState(null);
  const genderOptions = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Other', value: 'other'},
  ];

  const [isActivated, setIsActivated] = useState(false);

  const handleCountrySelect = country => {
    setSelectedCountry(country);
    setIsCountryPickerVisible(false);
    Alert.alert('Country Selected', `You selected ${country.name}`);
  };

  const handleSave = () => {
    setIsEditable(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const toggleSwitch = () => setIsActivated(previousState => !previousState); // Toggle function for switch

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerLeft}>
          <AntDesign name="arrowleft" size={25} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleEditToggle} style={styles.headerRight}>
          <Text style={styles.editButtonText}>
            {isEditable ? 'Save' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            {/* Input Fields */}
            {/* <View style={styles.inputContainer}>
              <Text style={styles.label}>Enter Your Name</Text>
              <View
                style={[
                  styles.inputWrapper,
                  {backgroundColor: isEditable ? '#FAFAFA' : '#F9F9F9'},
                ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor="#000"
                  editable={isEditable}
                  value={profile.name}
                  onChangeText={text => setProfile({...profile, name: text})}
                />
              
              </View>
            </View> */}
            <InputField
              label="Enter your name"
              iconName="user"
              placeholder="Enter your name"
              value={profile.name}
              onChangeText={text => setProfile({...profile, name: text})}
              editable={isEditable}
            />

            <InputField
              label="Enter Your Age"
              iconName="find"
              placeholder="Enter your age"
              value={profile.age}
              editable={isEditable}
              onChangeText={text => setProfile({...profile, age: text})}
            />

            {/* <View style={styles.inputContainer}>
              <Text style={styles.label}>Enter Your Age</Text>
              <View
                style={[
                  styles.inputWrapper,
                  {backgroundColor: isEditable ? '#FAFAFA' : '#F9F9F9'},
                ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your age"
                  placeholderTextColor="#000"
                  keyboardType="number-pad"
                  editable={isEditable}
                  value={profile.age}
                  onChangeText={text => setProfile({...profile, age: text})}
                />
              </View>
            </View> */}

            {/* Gender Dropdown */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Select Gender</Text>
              <Dropdown
                style={styles.dropdown}
                data={genderOptions}
                placeholderStyle={{color: '#000', fontSize: 16}}
                selectedTextStyle={{color: '#000', fontSize: 16}}
                itemTextStyle={{color: '#000', fontSize: 16}}
                labelField="label"
                valueField="value"
                placeholder="Select Gender"
                value={gender}
                onChange={item => {
                  setGender(item.value);
                  setProfile({...profile, gender: item.value});
                }}
                disabled={!isEditable}
              />
            </View>
            {/* 7077749905 */}
            <Text style={styles.label}>Select Country and Code</Text>
            <TouchableOpacity
              style={styles.countrySelectButton}
              onPress={() => setIsCountryPickerVisible(true)}>
              <View style={styles.countryDisplay}>
                {selectedCountry && (
                  <Image
                    source={{
                      uri: `https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`,
                    }}
                    style={styles.flagIcon}
                  />
                )}
                <Text style={styles.countryText}>
                  {selectedCountry
                    ? `${selectedCountry.name} (+${selectedCountry.phone})`
                    : 'Select Your Country'}
                </Text>
              </View>
            </TouchableOpacity>

            <CountryPicker
              visible={isCountryPickerVisible}
              onClose={() => setIsCountryPickerVisible(false)}
              onSelect={handleCountrySelect}
            />

            <InputField
              label="Phone Number"
              iconName="phone"
              placeholder="Enter your number"
              value={profile.number}
              onChangeText={text => setProfile({...profile, number: text})}
            />

            {/* <View style={styles.inputContainer}>
              <Text style={styles.label}>Enter Your Number</Text>
              <View
                style={[
                  styles.inputWrapper,
                  {backgroundColor: isEditable ? '#FAFAFA' : '#F9F9F9'},
                ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your number"
                  placeholderTextColor="#000"
                  keyboardType="phone-pad"
                  editable={isEditable}
                  value={profile.number}
                  onChangeText={text => setProfile({...profile, number: text})}
                />
              </View>
            </View> */}

            <InputField
              label="Enter your Email"
              iconName="mail"
              placeholder="Enter your email"
              value={profile.email}
              onChangeText={text => setProfile({...profile, email: text})}
            />

            {/* Account Activation Switch */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Account Status</Text>
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>
                  {isActivated ? 'Activate' : 'Deactivate'}
                </Text>
                <Switch
                  value={isActivated}
                  onValueChange={toggleSwitch}
                  trackColor={{false: '#e04826', true: '#34D399'}}
                  thumbColor={isActivated ? '#10B981' : '#e04826'}
                />
              </View>
            </View>

            {isEditable && (
              <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F6',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    width: 40,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    flex: 1,
  },
  headerRight: {
    width: 60,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    color: '#34D399',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#4A4A4A',
  },
  saveButton: {
    backgroundColor: '#34D399',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: {
    fontSize: 16,
    color: '#000',
  },
  countrySelectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 20,
  },
  countryDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  countryText: {
    fontSize: 16,
    color: '#374151',
  },
  dropdown: {
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F9FAFB',
  },
});

export default ProfileEdit;
