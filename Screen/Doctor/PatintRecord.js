import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const patientRecords = [
  {
    id: '1',
    status: 'Complete',
    name: 'Sarah Johnson',
    date: '27 Feb 2025',
    specialty: 'Gynecologist',
    clinic: "Women's Health Clinic",
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    location: 'Mumbai, India',
    appointmentDate: '25/08/22',
    time: '08:00 AM - 06:00 PM',
    duration: '30 MIN',
    treatment: 'Pediatrics',
  },
  {
    id: '2',
    status: 'On Progress',
    name: 'Michael Chang',
    date: '27 Feb 2025',
    specialty: 'Cardiologist',
    clinic: 'HeartCare Center, USA',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    location: 'Mumbai, India',
    appointmentDate: '25/08/22',
    time: '08:00 AM - 06:00 PM',
    duration: '30 MIN',
    treatment: 'Orthopedic Surgery',
  },
];

const PatientRecordsScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('A-Z');
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const filteredPatients = patientRecords
    .filter(patient =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) =>
      sortOption === 'A-Z'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
    );

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('PatintRecordDetails', {patient: item})
      }>
      <LinearGradient
        colors={['#37b859', '#7aff9e']}
        style={styles.dateContainer}>
        <Text style={styles.date}>{item.date.split(' ')[0]}</Text>
        <Text style={styles.monthYear}>
          {item.date.split(' ')[1]} {item.date.split(' ')[2]}
        </Text>
      </LinearGradient>

      <View style={styles.divider} />
      <View style={styles.detailsContainer}>
        <Text style={styles.doctorName}>{item.name}</Text>
        <Text style={styles.clinic}>{item.clinic}</Text>
        <Text style={styles.specialization}>{item.specialty}</Text>
        <View style={styles.infoRow}>
          <Icon name="map-marker" size={14} color="#555" />
          <Text style={styles.infoText}>{item.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="clock-o" size={14} color="#555" />
          <Text style={styles.infoText}>{item.time}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="hourglass-start" size={14} color="#555" />
          <Text style={styles.infoText}>Duration: {item.duration}</Text>
        </View>
      </View>

      <View></View>

      {/* <View style={styles.row}>
        <View style={{flex: 1}}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.specialty}>{item.specialty}</Text>
          <Text style={styles.clinic}>{item.clinic}</Text>
          <Text style={styles.clinic}>{item.status}</Text>
        </View>
        
      </View> */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={25} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Patient Records</Text>
        <View style={styles.headerRight} />
      </View> */}

      {/* Search Bar */}
      {/* <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search patients..."
          placeholderTextColor="#6B7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      
      </View> */}
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
          <Text style={styles.greetingText}>All Appointment Patients</Text>
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

      {/* Patient List */}
      <FlatList
        data={filteredPatients}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerContainer: {
    paddingVertical: 50,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 5,
  },
  detailsContainer: {
    flex: 1,
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
  date: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  detailsContainer: {
    flex: 1,
  },
  monthYear: {
    fontSize: 14,
    color: '#ffffff',
  },
  divider: {
    width: 1,
    backgroundColor: '#cccccc',
    height: '100%',
    marginHorizontal: 8,
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#a8ff78',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    marginRight: 16,
    shadowRadius: 2,
    shadowOpacity: 0.2,
    borderRadius: 20,
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
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  searchIcon: {
    marginRight: 8,
  },
  filterButton: {
    marginLeft: 8,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 10,
  },
  dropdownOption: {
    padding: 8,
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  list: {
    padding: 16,
  },
 card: {
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: 12, 
  padding: 16,
  marginBottom: 16,
  backgroundColor: '#f5f5f5', // Light background for soft shadows
  shadowColor: '#fff', // Top shadow (lighter color)
  shadowOffset: { width: -4, height: -4 }, // Top-left shadow
  shadowOpacity: 0.7, // Opacity for top shadow
  shadowRadius: 6, 
  elevation: 2, 
  borderWidth: 1, 
  borderColor: '#e0e0e0', 
  shadowColor: '#c8c8c8', // Bottom-right shadow
  shadowOffset: { width: 4, height: 4 }, // Bottom-right shadow
},



  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  specialty: {
    fontSize: 14,
    color: '#6B7280',
    marginVertical: 4,
  },
  clinic: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusComplete: {
    backgroundColor: '#4CAF50',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'center',
  },
  statusProgress: {
    backgroundColor: '#FF9800',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'center',
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  clinic: {
    fontSize: 14,
    color: '#666',
  },
  specialization: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555',
  },
});

export default PatientRecordsScreen;
