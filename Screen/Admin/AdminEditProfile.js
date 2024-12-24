import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import { launchImageLibrary } from 'react-native-image-picker';

const AdminEditProfile = ({ navigation }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    number: '',
  });



  const handleSave = () => {
    // Validation
    if (!profile.name || !profile.age || !profile.number) {
      Alert.alert('Error', 'Please fill all personal details.');
      return;
    }
    if (!profile.specialist) {
      Alert.alert('Error', 'Please select a specialist.');
      return;
    }
    if (!profile.experience) {
      Alert.alert('Error', 'Please select years of experience.');
      return;
    }
    if (!profile.photo) {
      Alert.alert('Error', 'Please upload a profile photo.');
      return;
    }

    setIsEditable(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  // const handlePhotoUpload = () => {
  //   launchImageLibrary({ mediaType: 'photo' }, (response) => {
  //     if (response.didCancel) {
  //       return;
  //     }
  //     if (response.errorMessage) {
  //       Alert.alert('Error', response.errorMessage);
  //       return;
  //     }
  //     if (response.assets && response.assets.length > 0) {
  //       const photoUri = response.assets[0].uri;
  //       setProfile({ ...profile, photo: photoUri });
  //       Alert.alert('Success', 'Photo uploaded successfully!');
  //     }
  //   });
  // };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerLeft}>
          <AntDesign name="arrowleft" size={25} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin  Profile</Text>
        <TouchableOpacity onPress={handleEditToggle} style={styles.headerRight}>
          <Text style={styles.editButtonText}>{isEditable ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter Your Name</Text>
          <View
            style={[styles.inputWrapper, { backgroundColor: isEditable ? '#FAFAFA' : '#F9F9F9' }]}>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#000"
              editable={isEditable}
              value={profile.name}
              onChangeText={(text) => setProfile({ ...profile, name: text })}
            />
            {/* <Icon name="pencil" size={16} color="#4A4A4A" /> */}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter Your Age</Text>
          <View
            style={[styles.inputWrapper, { backgroundColor: isEditable ? '#FAFAFA' : '#F9F9F9' }]}>
            <TextInput
              style={styles.input}
              placeholder="Enter your age"
              placeholderTextColor="#000"
              keyboardType="number-pad"
              editable={isEditable}
              value={profile.age}
              onChangeText={(text) => setProfile({ ...profile, age: text })}
            />
            {/* <Icon name="pencil" size={16} color="#4A4A4A" /> */}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter Your Number</Text>
          <View
            style={[styles.inputWrapper, { backgroundColor: isEditable ? '#FAFAFA' : '#F9F9F9' }]}>
            <TextInput
              style={styles.input}
              placeholder="Enter your number"
              placeholderTextColor="#000"
              keyboardType="phone-pad"
              editable={isEditable}
              value={profile.number}
              onChangeText={(text) => setProfile({ ...profile, number: text })}
            />
            {/* <Icon name="pencil" size={16} color="#4A4A4A" /> */}
          </View>
        </View>

        {/* Dropdown: specialist */}
        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Your specialist</Text>
          <Dropdown
            style={[
              styles.dropdown,
              { backgroundColor: isEditable ? '#FAFAFA' : '#F9F9F9', opacity: isEditable ? 1 : 0.6 },
            ]}
            data={specialists.map((item) => ({ label: item, value: item }))}
            disable={!isEditable}         
            labelField="label"
            valueField="value"
            placeholder="Select specialist"
            placeholderStyle={{ color: '#000', fontSize: 16 }}
            selectedTextStyle={{ color: '#000', fontSize: 16 }}
            itemTextStyle={{ color: '#000', fontSize: 16 }}
            value={profile.specialist}
            onChange={(item) => setProfile({ ...profile, specialist: item.value })}
          />
        </View> */}

        {/* Dropdown: Experience */}
        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Years of Experience</Text>
          <Dropdown
            style={[
              styles.dropdown,
              { backgroundColor: isEditable ? '#FAFAFA' : '#F9F9F9', opacity: isEditable ? 1 : 0.6 },
            ]}
            data={experienceYears.map((item) => ({ label: item, value: item }))}
            disable={!isEditable}
            labelField="label"
            valueField="value"
            placeholder="Select experience"
            placeholderStyle={{ color: '#000', fontSize: 16 }}
            selectedTextStyle={{ color: '#000', fontSize: 16 }} 
            itemTextStyle={{ color: '#000', fontSize: 16 }}
            value={profile.experience}
            onChange={(item) => setProfile({ ...profile, experience: item.value })}
          />
        </View> */}

        {/* Photo Upload */}
        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>Upload Medical Catificated </Text>
          <TouchableOpacity
            style={[styles.uploadButton, { backgroundColor: isEditable ? '#34D399' : '#D1D5DB' }]}
            onPress={isEditable ? handlePhotoUpload : null}>
            <Text style={styles.uploadButtonText}>
              {profile.photo ? 'Photo Uploaded' : 'Upload Photo'}
            </Text>
          </TouchableOpacity>
          {profile.photo && (
            <Image source={{ uri: profile.photo }} style={styles.uploadedPhoto} />
          )}
        </View> */}

        {isEditable && (
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
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
    padding: 3
    
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
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
  dropdown: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10
  },
  uploadButton: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadedPhoto: {
    marginTop: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default  AdminEditProfile;




