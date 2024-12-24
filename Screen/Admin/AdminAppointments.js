import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  Image
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Dropdown} from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import globalStyles from '../component/style';
import DeleteModal from '../component/DeleteModal';

const AdminAppointments = ({navigation}) => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: 'Dr. David Patel',
      hospitalName: 'Sunrise Health Clinic',
      location: 'Mumbai, India',
      appointmentDate: '25/08/22',
      time: '08:00 AM - 06:00 PM',
      duration: '30 MIN',
      Treatment: 'Pediatrics',
    },
    {
      id: 2,
      doctorName: 'Dr. David Patel',
      hospitalName: 'Sunrise Health Clinic',
      location: 'Mumbai, India',
      appointmentDate: '25/08/22',
      time: '08:00 AM - 06:00 PM',
      duration: '30 MIN',
      Treatment: 'Orthopedic Surgery',
    },
    {
      id: 3,
      doctorName: 'Dr. Sarah Lee',
      hospitalName: 'Golden Cardiology',
      location: 'Delhi, India',
      appointmentDate: '28/08/22',
      time: '10:00 AM - 02:00 PM',
      duration: '45 MIN',
      Treatment: 'Gynecologist',
    },
  ]);

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [showDelete , setShowDelete] = useState(false);
  const [isChanging , setIsChanging] = useState(false);
  const [selectedId , setSelectedId] = useState(null);

  // Dropdown data
  const filterOptions = [
    {label: 'All', value: ''},
    {label: 'Pediatrics', value: 'Pediatrics'},
    {label: 'Orthopedic Surgery', value: 'Orthopedic Surgery'},
    {label: 'Gynecologist', value: 'Gynecologist'},
  ];

  const filteredAppointments = appointments.filter(
    appointment =>
      (appointment.doctorName
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
        appointment.hospitalName
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        appointment.Treatment.toLowerCase().includes(
          searchText.toLowerCase(),
        )) &&
      (selectedFilter ? appointment.Treatment === selectedFilter : true),
  );

  // Handle Delete
  // const handleDelete = id => {
  //   Alert.alert(
  //     'Confirm Delete',
  //     'Are you sure you want to delete this appointment?',
  //     [
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Delete',
  //         onPress: () =>
  //           setAppointments(appointments.filter(item => item.id !== id)),
  //       },
  //     ],
  //   );
  // };

  const handleDeleteUser = id => {
    setSelectedId(id);
    setShowDelete(true);
  }


  const handleDelete = () => {
    if (selectedId !== null) {
      setIsChanging(true); // Set the loading state
      setAppointments(prevDoctors =>
        prevDoctors.filter(user => user.id !== selectedId),
      );
      setIsChanging(false); // Reset loading state
      setShowDelete(false); // Close the modal
    }
  };
  

  



  // Handle Edit (Placeholder)
  const handleEdit = appointment => {
    setSelectedAppointment(appointment); // Set the selected appointment for editing
    setEditModalVisible(true); // Show the edit modal
  };

  const handleSaveEdit = () => {
    setAppointments(prevAppointments =>
      prevAppointments.map(item =>
        item.id === selectedAppointment.id ? selectedAppointment : item,
      ),
    );
    setEditModalVisible(false); // Close the modal
  };

  const handleSeeDetails = appointment => {
    navigation.navigate('AdminAppointmentsDetails', {
      appointmentData: appointment,
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#28C76F', '#1E8449']}
        style={styles.headerContainer}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={25} color="#FFF" />
        </TouchableOpacity>

        {/* Header Title */}
        <View style={styles.header}>
          <Text style={styles.greetingText}>Appointment Management</Text>
        </View>

        {/* Search Input with Icon */}
        <View style={styles.searchContainer}>
          <AntDesign
            name="search1"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Appointment"
            value={searchText}
            placeholderTextColor="#888"
            onChangeText={text => setSearchText(text)}
          />
        </View>
      </LinearGradient>

      <View style={styles.filterContainer}>
        <Dropdown
          style={styles.dropdown}
          data={filterOptions}
          placeholderStyle={styles.dropdownText}
          selectedTextStyle={styles.dropdownText}
          itemTextStyle={styles.dropdownText}
          labelField="label"
          valueField="value"
          placeholder="Filter"
          value={selectedFilter}
          onChange={item => setSelectedFilter(item.value)}
          renderRightIcon={() => (
            <MaterialIcons name="keyboard-arrow-down" size={20} color="#888" />
          )}
        />
      </View>

      {/* Appointment List */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {filteredAppointments.map(appointment => (
          <View key={appointment.id} style={styles.card}>
            {/* Info Container */}
            <View style={styles.infoContainer}>
              <Text style={globalStyles.textBold}>
                {appointment.doctorName}
              </Text>
              <Text style={globalStyles.textSemiBold}>
                {appointment.hospitalName}
              </Text>
              <Text style={globalStyles.textSemiBold}>
                {appointment.Treatment}
              </Text>
              <Text style={globalStyles.textSemiBold}>
                {appointment.location}
              </Text>
              <Text style={globalStyles.textSemiBold}>
                {appointment.appointmentDate} | {appointment.time}
              </Text>
              <Text style={globalStyles.textSemiBold}>
                Duration: {appointment.duration}
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEdit(appointment)}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteUser(appointment.id)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => handleSeeDetails(appointment)}>
                <Text style={styles.detailsButtonText}>Details</Text>
              </TouchableOpacity>
            </View>

            <DeleteModal
              showDelete={showDelete}
              setShowDelete={setShowDelete}
              handleDelete={handleDelete}
              isChanging={isChanging}
            />
          </View>
        ))}
      </ScrollView>

      {isEditModalVisible && selectedAppointment && (
        <Modal
          visible={isEditModalVisible}
          animationType="slide"
          transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Appointment</Text>
              <TextInput
                style={styles.input}
                value={selectedAppointment.doctorName}
                placeholder="Doctor Name"
                placeholderTextColor="#888"
                onChangeText={text =>
                  setSelectedAppointment(prev => ({
                    ...prev,
                    doctorName: text,
                  }))
                }
              />
              <TextInput
                style={styles.input}
                value={selectedAppointment.hospitalName}
                placeholder="Hospital Name"
                placeholderTextColor="#888"
                onChangeText={text =>
                  setSelectedAppointment(prev => ({
                    ...prev,
                    hospitalName: text,
                  }))
                }
              />
              <TextInput
                style={styles.input}
                value={selectedAppointment.Treatment}
                placeholder="Treatment"
                placeholderTextColor="#888"
                onChangeText={text =>
                  setSelectedAppointment(prev => ({
                    ...prev,
                    Treatment: text,
                  }))
                }
              />
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveEdit}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setEditModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  headerContainer: {
    paddingVertical: 50,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 3},
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  filterContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    alignItems: 'center',
  },
  dropdown: {
    width: '100%', // Adjusts width to 40% of the screen
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Shadow for Android
  },
  dropdownText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  listContainer: {paddingHorizontal: 16, paddingTop: 16},
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    borderColor: '#119100',
    borderWidth: 1,
  },
  infoContainer: {marginBottom: 8},
  doctorName: {fontSize: 18, fontWeight: '700', color: '#000'},
  hospitalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginTop: 4,
  },
  location: {fontSize: 14, color: '#000', marginTop: 4},
  details: {fontSize: 14, color: '#000', marginTop: 4},
  duration: {fontSize: 14, color: '#000', marginTop: 4},
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  editButton: {backgroundColor: '#3498db', padding: 10, borderRadius: 8},
  editButtonText: {color: '#fff', fontWeight: '600'},
  deleteButton: {backgroundColor: '#e74c3c', padding: 10, borderRadius: 8},
  deleteButtonText: {color: '#fff', fontWeight: '600'},
  detailsButton: {backgroundColor: '#10B981', padding: 10, borderRadius: 8},
  detailsButtonText: {color: '#fff', fontWeight: '600'},

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    color: '#000', // Ensuring black text color for inputs
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#10B981',
    padding: 10,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#fff',
  },
});

export default AdminAppointments;
