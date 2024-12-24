import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
const DoctorAppointmentHistory = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('A-Z');
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const appointments = [
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
      doctorName: 'Dr. Sarah Lee',
      hospitalName: 'Golden Cardiology',
      location: 'Delhi, India',
      appointmentDate: '28/08/22',
      time: '10:00 AM - 02:00 PM',
      duration: '45 MIN',
      Treatment: 'Gynecologist',
    },
    {
      id: 3,
      doctorName: 'Dr. Michael Brown',
      hospitalName: 'City Orthopedics',
      location: 'Pune, India',
      appointmentDate: '30/08/22',
      time: '09:00 AM - 12:00 PM',
      duration: '1 HR',
      Treatment: 'Orthopedic Surgery',
    },
  ];

  const filteredAppointments = appointments
    .filter(appointment =>
      appointment.doctorName.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) =>
      sortOption === 'A-Z'
        ? a.doctorName.localeCompare(b.doctorName)
        : b.doctorName.localeCompare(a.doctorName),
    );

  const handleSeeDetails = appointment => {
    navigation.navigate('DoctorAppointmentHistoryDetails', {
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
          <Text style={styles.greetingText}>All Appointments History</Text>
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
            placeholder="Search Patients..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setDropdownVisible(!isDropdownVisible)}>
            <MaterialIcons name="filter-list" size={25} color="green" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Filter Dropdown */}
      {isDropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={styles.dropdownOption}
            onPress={() => {
              setSortOption('A-Z');
              setDropdownVisible(false);
            }}>
            <Text style={styles.dropdownText}>Sort A-Z</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dropdownOption}
            onPress={() => {
              setSortOption('Z-A');
              setDropdownVisible(false);
            }}>
            <Text style={styles.dropdownText}>Sort Z-A</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Appointment List */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {filteredAppointments.map(appointment => (
          <View key={appointment.id} style={styles.card}>
            {/* Info Container */}
            <View style={styles.infoContainer}>
              <Text style={styles.doctorName}>{appointment.doctorName}</Text>
              <Text style={styles.hospitalName}>
                {appointment.hospitalName}
              </Text>
              <Text style={styles.treatment}>{appointment.Treatment}</Text>
              <Text style={styles.location}>{appointment.location}</Text>
              <Text style={styles.details}>
                {appointment.appointmentDate} | {appointment.time}
              </Text>
              <Text style={styles.duration}>
                Duration: {appointment.duration}
              </Text>
            </View>

            {/* See Details Button */}
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => handleSeeDetails(appointment)}>
              <Text style={styles.detailsButtonText}>See Details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    paddingVertical: 50,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 5,
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

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    margin: 16,
    elevation: 2,
    paddingHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 8,
    marginLeft: 8,
  },
  filterButton: {
    padding: 8,
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 16,
    elevation: 2,
    paddingVertical: 8,
  },
  dropdownOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  card: {
  backgroundColor: '#eaf8f4', // Soft mint-green color
  borderRadius: 20, 
  padding: 20, 
  marginBottom: 16,
  borderWidth: 2, 
  borderColor: '#1abc9c', // Bright green border to match background
  elevation: 10, 
  shadowColor: 'rgba(0, 0, 0, 0.15)', 
  shadowOffset: { width: 0, height: 8 }, 
  shadowOpacity: 0.2, 
  shadowRadius: 12, 
},
  infoContainer: {
    marginBottom: 12,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
    marginTop: 4,
  },
  treatment: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  details: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 4,
  },
  duration: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 4,
  },
  detailsButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default DoctorAppointmentHistory;
