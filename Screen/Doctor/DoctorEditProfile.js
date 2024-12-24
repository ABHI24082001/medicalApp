import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dropdown} from 'react-native-element-dropdown';
import {launchImageLibrary} from 'react-native-image-picker';
import InputField from '../component/InputField';

const DoctorProfile = ({navigation}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    number: '',
    specialist: null,
    experience: null,
    photo: null,
    degree: '',
    fellowship: '',
    about: '',
  });

  const specialists = [
    'Cardiology',
    'CTVS',
    'Neurology',
    'Neurosurgery',
    'Orthopedics',
    'Pediatrics surgery',
    'Gastroenterology',
    'GI surgery',
    'General surgery',
    'Ophthalmology',
    'Nephrology',
    'Urology',
    'Pulmonology',
    'Dermatology',
    'Oncology',
    'Haematology',
    'Onco surgery',
    'Hepatology',
    'Rheumatology',
    'Endocrinology',
    'Endocrine surgery',
    'Plastic surgery',
    'Ayurveda',
    'Yoga',
    'Dentistry',
  ];

  const experienceYears = Array.from(
    {length: 30},
    (_, i) => `${i + 1} Year${i > 0 ? 's' : ''}`,
  );

  //  const handleSave = () => {
  //    if (!profile.name || !profile.age || !profile.number) {
  //      Alert.alert('Error', 'Please fill all personal details.');
  //      return;
  //    }
  //    if (!profile.specialist) {
  //      Alert.alert('Error', 'Please select a specialist.');
  //      return;
  //    }
  //    if (!profile.experience) {
  //      Alert.alert('Error', 'Please select years of experience.');
  //      return;
  //    }
  //    if (!profile.photo) {
  //      Alert.alert('Error', 'Please upload a profile photo.');
  //      return;
  //    }

  //    setIsEditable(false);
  //    ToastAndroid.show('Profile updated successfully', ToastAndroid.TOP);
  //   //  Alert.alert('Success', 'Profile updated successfully!');
  //  };

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const handlePhotoUpload = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        return;
      }
      if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        const photoUri = response.assets[0].uri;
        setProfile({...profile, photo: photoUri});
        Alert.alert('Success', 'Photo uploaded successfully!');
      }
      if (!profile.degree) {
        Alert.alert('Error', 'Please enter your degree.');
        return;
      }
      if (!profile.fellowship) {
        Alert.alert('Error', 'Please enter your fellowship.');
        return;
      }
      if (!profile.about) {
        Alert.alert('Error', 'Please write about yourself.');
        return;
      }
    });
  };

  const handleSave = () => {
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
    if (!profile.degree) {
      Alert.alert('Error', 'Please enter your degree.');
      return;
    }
    if (!profile.fellowship) {
      Alert.alert('Error', 'Please enter your fellowship.');
      return;
    }
    if (!profile.about) {
      Alert.alert('Error', 'Please write about yourself.');
      return;
    }

    setIsEditable(false);
    ToastAndroid.show('Profile updated successfully!', ToastAndroid.SHORT);
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerLeft}>
          <AntDesign name="arrowleft" size={25} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctor Profile</Text>
        <TouchableOpacity onPress={handleEditToggle} style={styles.headerRight}>
          <Text style={styles.editButtonText}>
            {isEditable ? 'Save' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Content Section */}
        {/* Input Fields */}
        <Text style={styles.modalTitle}>Enter Your Details</Text>
        <InputField
          label="Name"
          placeholder="Enter your name"
          iconName="user"
          editable={isEditable}
          value={profile.name}
          onChangeText={text => setProfile({...profile, name: text})}
        />

        <InputField
          label="Age"
          placeholder="Enter your age"
          iconName="solution1"
          keyboardType="number-pad"
          editable={isEditable}
          value={profile.age}
          onChangeText={text => setProfile({...profile, age: text})}
        />

        <InputField
          label="Phone Number"
          placeholder="Enter your number"
          keyboardType="phone-pad"
          iconName="phone"
          editable={isEditable}
          value={profile.number}
          onChangeText={text => setProfile({...profile, number: text})}
        />
        {/* Dropdown: specialist */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Your specialist</Text>
          <Dropdown
            style={[
              styles.dropdown,
              {
                backgroundColor: isEditable ? '#FAFAFA' : '#F9F9F9',
                opacity: isEditable ? 1 : 0.6,
              },
            ]}
            data={specialists.map(item => ({label: item, value: item}))}
            disable={!isEditable}
            labelField="label"
            valueField="value"
            placeholder="Select specialist"
            placeholderStyle={{color: '#000', fontSize: 16}}
            selectedTextStyle={{color: '#000', fontSize: 16}}
            itemTextStyle={{color: '#000', fontSize: 16}}
            value={profile.specialist}
            onChange={item => setProfile({...profile, specialist: item.value})}
          />
        </View>
        {/* Dropdown: Experience */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Years of Experience</Text>
          <Dropdown
            style={[
              styles.dropdown,
              {
                backgroundColor: isEditable ? '#FAFAFA' : '#F9F9F9',
                opacity: isEditable ? 1 : 0.6,
              },
            ]}
            data={experienceYears.map(item => ({label: item, value: item}))}
            disable={!isEditable}
            labelField="label"
            valueField="value"
            placeholder="Select experience"
            placeholderStyle={{color: '#000000', fontSize: 16}}
            selectedTextStyle={{color: '#000', fontSize: 16}}
            itemTextStyle={{color: '#000', fontSize: 16}}
            value={profile.experience}
            onChange={item => setProfile({...profile, experience: item.value})}
          />
        </View>
        <InputField
          label="Degree"
          iconName="profile"
          placeholder="Enter your degree"
          editable={isEditable}
          value={profile.degree}
          onChangeText={text => setProfile({...profile, degree: text})}
        />
        <InputField
          label="Fellowship"
          iconName="Trophy"
          placeholder="Enter your fellowship"
          editable={isEditable}
          value={profile.fellowship}
          onChangeText={text => setProfile({...profile, fellowship: text})}
        />
        <InputField
          label="About"
          placeholder="Write about yourself"
          iconName="carryout"
          editable={isEditable}
          value={profile.about}
          onChangeText={text => setProfile({...profile, about: text})}
          multiline
        />

        <TouchableOpacity
          style={[
            styles.uploadButton,
            {backgroundColor: isEditable ? '#34D399' : '#D1D5DB'},
          ]}
          onPress={isEditable ? handlePhotoUpload : null}>
          <Text style={styles.uploadButtonText}>
            {profile.photo ? 'Photo Uploaded' : 'Upload Photo'}
          </Text>
        </TouchableOpacity>
        {profile.photo && (
          <Image source={{uri: profile.photo}} style={styles.uploadedPhoto} />
        )}

        {isEditable && (
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    width: 40,
    alignItems: 'flex-start',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#000',
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
    paddingTop: 10,
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
    padding: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#34D399',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
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
    padding: 10,
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

export default DoctorProfile;
