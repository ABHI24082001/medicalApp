import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
  Modal,
  Alert,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';

const AppointmentScreen = ({route, navigation}) => {
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [allergy, setAllergy] = useState(''); // State for allergy input
  const {date, time, doctor} = route.params;

  const openWebsite = () => {
    Linking.openURL('https://www.makemytrip.com/').catch(err =>
      console.error('Failed to open URL:', err),
    );
  };

  const handleImageUpload = () => {
    launchImageLibrary(
      {mediaType: 'photo', includeBase64: false, quality: 0.5},
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Image Picker Error: ', response.errorCode);
        } else {
          setImageUri(response.assets[0].uri);
        }
      },
    );
  };

  const handleConfirm = () => {
    if (!allergy.trim()) {
      Alert.alert('Allergy Information Required', 'Please enter any known allergies or "None" if applicable.');
      return;
    }
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          size={24}
          color="#1F2937"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Book Appointment</Text>
        <View style={{width: 24}} />
      </View>

      {/* Doctor Card */}
      <View style={styles.doctorCard}>
        <Image
          source={{
            uri: 'https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          style={styles.doctorImage}
        />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.speciality}>{doctor.specialty}</Text>
          <View style={styles.locationRow}>
            <MaterialIcons name="location-on" size={16} color="#6B7280" />
            <Text style={styles.locationText}>{doctor.location}</Text>
          </View>
        </View>
      </View>

      {/* Appointment Details */}
      <View style={styles.detailRow}>
        <Text style={styles.sectionTitle}>Hospital</Text>
        <Text style={styles.detailValue}>Golden Cardiology Center</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Time</Text>
        <Text style={styles.detailValue}>{time}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Date</Text>
        <Text style={styles.detailValue}> {date}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Duration</Text>
        <Text style={styles.detailValue}>30 min</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Payment</Text>
        <Text style={styles.detailValue}>Card/ Cash</Text>
      </View>

      {/* Allergy Input */}
      

      {/* Passport and Travel Options */}
      <View style={styles.optionsContainer}>
        <Text style={styles.optionLabel}>Medical Report</Text>
        {!imageUri ? (
          <TouchableOpacity
            style={styles.optionButton}
            onPress={handleImageUpload}>
            <Text style={styles.optionButtonText}>Upload</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.imageContainer}>
            <Text style={styles.optionButtonText}>Upload Success</Text>
          </View>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Any Allergies?</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter allergy details or 'None'"
          placeholderTextColor={'#000'}
          value={allergy}
          onChangeText={setAllergy}
        />
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>

      {/* Confirmation Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Icon name="checkmark-circle" size={80} color="#4CAF50" />
            <Text style={styles.modalText}>Congratulations!</Text>
            <Text style={styles.modalSubtext}>
              Your appointment with {doctor.name} is confirmed.
            </Text>
            <Text style={styles.modalSubtext}>Date: {date}</Text>
            <Text style={styles.modalSubtext}>Time: {time}</Text>
            <Text style={styles.modalSubtext}>Allergy: {allergy}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Home');
              }}>
              <Text style={styles.modalButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF',
    flexGrow: 1,
  },
  inputContainer: {
    marginVertical: 12,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    color:'#000'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageContainer: {
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 20,
  },
  doctorImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  speciality: {
    fontSize: 14,
    color: '#6B7280',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  detailValue: {
    fontSize: 16,
    color: '#6B7280',
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  optionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  optionButtonTex: {
    color: '#b3b3b3',
    fontSize: 16,
    fontWeight: '400',
    marginRight: 8,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginVertical: 10,
  },
  modalSubtext: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppointmentScreen;
