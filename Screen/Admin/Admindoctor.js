import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import globalStyles from '../component/style';
const Admindoctor = ({route, navigation}) => {
  const {item} = route.params;

  const [isEditing, setIsEditing] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState({
    name: 'Dr James',
    degree: 'Orthopedic Surgery',
    experience: '10 years',
    fellowship: 'Elite Ortho Clinic, USA',
    about: 'Specialist in orthopedic treatments.',
    profileImage:
      'https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  });

  // Handle field input changes
  const handleInputChange = (field, value) => {
    setDoctorDetails({...doctorDetails, [field]: value});
  };

  // Handle photo picker
  const handlePhotoPicker = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (response.assets && response.assets.length > 0) {
        setDoctorDetails({
          ...doctorDetails,
          profileImage: response.assets[0].uri,
        });
      }
    });
  };

  // Save changes and exit edit mode
  const handleSave = () => {
    setIsEditing(false);
    console.log('Updated Doctor Details:', doctorDetails);
  };

  return (
    <View style={styles.container}>
      {/* Header with LinearGradient */}
      <LinearGradient colors={['#28C76F', '#1E8449']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={25} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctor Details</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.editText}>{isEditing ? 'Cancel' : 'Edit'}</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Doctor Details */}
      <View style={styles.card}>
        {isEditing ? (
          <TouchableOpacity
            style={styles.imagePicker}
            onPress={handlePhotoPicker}>
            <Image
              source={{uri: doctorDetails.profileImage}}
              style={styles.profileImage}
            />
            <Text style={styles.imagePickerText}>Change Photo</Text>
          </TouchableOpacity>
        ) : (
          <Image
            source={{uri: doctorDetails.profileImage}}
            style={styles.profileImage}
          />
        )}

        {['name', 'degree', 'experience', 'fellowship', 'about'].map(
          (field, index) => (
            <View key={index} style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={doctorDetails[field]}
                  onChangeText={value => handleInputChange(field, value)}
                  placeholder={`Enter ${field}`}
                />
              ) : (
                <Text style={styles.fieldValue}>{doctorDetails[field]}</Text>
              )}
            </View>
          ),
        )}
      </View>

      {/* Save Button */}
      {isEditing && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 16,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  editText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 16,
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePickerText: {
    marginTop: 8,
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#111827',
  },
  saveButton: {
    backgroundColor: '#10B981',
    paddingVertical: 15,
    borderRadius: 60,
    alignItems: 'center',
    width: '60%',
    justifyContent: 'center',
    marginLeft: 80,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default Admindoctor;
