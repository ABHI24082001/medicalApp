import React, {useState , useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dropdown} from 'react-native-element-dropdown';
import globalStyles from '../component/style';
import LoadingModal from '../component/LoadingModal';


const App = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [loading, setLoading] = useState(true);

  const treatments = [
    {label: 'CTVS', value: 'CTVS'},
    {label: 'Neurology', value: 'Neurology'},
    {label: 'Neurosurgery', value: 'Neurosurgery'},
    {label: 'Orthopedics', value: 'Orthopedics'},
    {label: 'Pediatrics surgery', value: 'Pediatrics surgery'},
    {label: 'Gastroenterology', value: 'Gastroenterology'},
    {label: 'GI surgery', value: 'GI surgery'},
    {label: 'General surgery', value: 'General surgery'},
    {label: 'Ophthalmology', value: 'Ophthalmology'},
    {label: 'Nephrology', value: 'Nephrology'},
    {label: 'Urology', value: 'Urology'},
  ];

  const hospitals = [
    {
      id: 1,
      name: 'Sri Ganga Ram Hospital',
      treatments: ['CTVS', 'Orthopedics', 'Gastroenterology'],
      details: {
        hospitalName: 'Sri Ganga Ram Hospital, Sir Ganga Ram Hospital Marg',
        address: 'Old Rajinder Nagar, New Delhi-110060',
        telephone: {landlines: ['25751111', '25861463', '42251252']},
        diseasesEmpanelled: {
          general:
            'The hospital has already been empanelled for Cardiology. Now empanelment/direct billing is extended for Orthopedics including joint replacements & Gastroenterology including liver transplant.',
        },
        remark:
          '10% discount on total bill excluding Drugs, Disposables and Implants.',
      },
      distance: '2.5 km/40min',
      type: 'Hospital',
      rating: 5.0,
      reviews: 128,
      imageUri:
        'https://thumbs.dreamstime.com/z/hospital-medical-emergency-room-health-care-aid-24011837.jpg?ct=jpeg',
    },
    {
      id: 2,
      name: 'Shri Mool Chand Kharaiti Ram Hospital',
      treatments: ['CTVS', 'Orthopedics', 'Gastroenterology'],
      details: {
        hospitalName: 'Shri Mool Chand Kharaiti Ram Hospital ',
        address: 'Lajpat Nagar-III, New Delhi-110024',
        telephone: {
          landlines: ['25751111', '25861463', '42251252'],
        },
        diseasesEmpanelled: {
          general: 'General treatment and Ayurvedic research.',
        },
        remark: 'Specialized in Ayurvedic treatments and research.',
      },
      distance: '2.5 km/40min',
      type: 'Clinic',
      rating: 4.9,
      reviews: 58,
      imageUri:
        'https://media.istockphoto.com/id/1312706413/photo/modern-hospital-building.jpg?s=2048x2048&w=is&k=20&c=15TsJBPquZtgf8ciMtV6wlEAccnI5RJoNcqzFY9qe80=',
    },
    {
      id: 3,
      name: 'Batra Hospital & Medical Research Centre',
      treatments: ['CTVS', 'Orthopedics', 'Gastroenterology'],
      details: {
        hospitalName: 'Batra Hospital & Medical Research Centre',
        address:
          'Tughlakabad Instl. Area, Mehrauli-Badarpur Road New Delhi-110062',
        telephone: {
          landlines: ['25751111', '25861463', '42251252'],
        },
        diseasesEmpanelled: {
          general:
            'Advanced medical research and treatment across multiple disciplines.',
        },
        remark: 'Focus on research-based treatments.',
      },
      distance: '2.5 km/40min',
      type: 'Clinic',
      rating: 4.9,
      reviews: 58,

      imageUri:
        'https://thumbs.dreamstime.com/z/hospital-building-modern-parking-lot-59693686.jpg?ct=jpeg',
    },
    {
      id: 4,
      name: 'Batra Hospital & Medical Research Centre',
      treatments: ['CTVS', 'Orthopedics', 'Gastroenterology'],
      details: {
        hospitalName: 'Batra Hospital & Medical Research Centre',
        address:
          'Tughlakabad Instl. Area, Mehrauli-Badarpur Road New Delhi-110062',
        telephone: {
          landlines: ['25751111', '25861463', '42251252'],
        },
        diseasesEmpanelled: {
          general:
            'Advanced medical research and treatment across multiple disciplines.',
        },
        remark: 'Focus on research-based treatments.',
      },
      distance: '2.5 km/40min',
      type: 'Clinic',
      rating: 4.9,
      reviews: 58,
      imageUri:
        'https://as1.ftcdn.net/v2/jpg/02/11/15/66/1000_F_211156620_CeBr5etdTNXLb231sFcQ8M9YD1OY5IW8.jpg',
    },
  ];

  // Filter hospitals based on the search query
  const filteredHospitals = hospitals.filter(
    hospital =>
      (hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.details.address
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) &&
      (!selectedTreatment || hospital.treatments.includes(selectedTreatment)),
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Set loading to false after a delay
    }, 2000); // Set your desired delay time here (e.g., 2 seconds)
  }, []); // Only run on mount

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <LinearGradient
        colors={['#28C76F', '#1E8449']}
        style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={25} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.greetingText}>All Hospitals </Text>

        <View style={styles.searchContainer}>
          <Icon name="search" size={20} style={styles.searchIcon} />
          <TextInput
            placeholder="Search for packages, services..."
            style={styles.searchInput}
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filterContainer}>
          <Dropdown
            style={styles.dropdown}
            data={treatments}
            placeholderStyle={styles.dropdownText}
            selectedTextStyle={styles.dropdownText}
            itemTextStyle={styles.dropdownText}
            labelField="label"
            valueField="value"
            placeholder="Select treatment"
            value={selectedTreatment}
            onChange={item => setSelectedTreatment(item.value)}
            renderRightIcon={() => (
              <AntDesign name="down" size={20} color="#888" />
            )}
          />
        </View>
      </LinearGradient>

      {/* Info Box */}
      <View style={styles.infoBox}>
        <Image
          source={{
            uri: 'https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          style={styles.infoImage}
        />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTitle}>What is the Best Package for Me?</Text>
          <Text style={styles.infoSubtitle}>
            We help you find a package that suits your needs.
          </Text>
          <TouchableOpacity>
            <Text style={styles.infoLink}>Learn More </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Section Title */}
      <Text style={styles.sectionTitle}>All Hospitals</Text>
      {loading && <LoadingModal />}   
      {!loading && (
        <>
          <View style={styles.hospitalContainer}>
            {/* {setLoading} <LoadingModal /> */}
            {filteredHospitals.map(hospital => (
              <TouchableOpacity
                key={hospital.id}
                onPress={() => navigation.navigate('DoctorDetails', {hospital})}
                style={styles.cardContainer}>
                <Image
                  source={{uri: hospital.imageUri}}
                  style={styles.hospitalImage}
                  resizeMode="cover"
                />
                <View style={styles.cardContent}>
                  <Text
                    style={globalStyles.textBold2}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {hospital.name}
                  </Text>
                  <Text
                    style={globalStyles.textMedium}
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {hospital.details.address}
                  </Text>
                  <Text
                    style={globalStyles.textMedium}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {hospital.distance}
                  </Text>

                  <TouchableOpacity
                    style={styles.detailsButton}
                    key={hospital.id}
                    onPress={() =>
                      navigation.navigate('DoctorDetails', {hospital})
                    }>
                    <Text style={styles.detailsButtonText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 5,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 16,
    padding: 8,
  },
  greetingText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: -10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
  },
  searchIcon: {
    color: '#9CA3AF',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#111827',
  },
  filterIcon: {
    color: '#9CA3AF',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  infoImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  infoTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  infoSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  infoLink: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: 'bold',
    marginTop: 8,
  },

  packageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  packageBox: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    overflow: 'hidden',
  },
  packageImage: {
    width: '100%',
    height: 120,
  },
  packageTextContainer: {
    padding: 12,
  },
  packageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  packagePrice: {
    fontSize: 16,
    color: '#10B981',
    marginBottom: 4,
  },
  packageStatusYellow: {
    fontSize: 14,
    color: '#F59E0B',
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
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '500',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000',
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 10,
    color: '#000',
  },
  hospitalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  cardContainer: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  hospitalImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  cardContent: {
    padding: 10,
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  hospitalAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  hospitalDistance: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  detailsButton: {
    backgroundColor: '#28C76F',
    borderRadius: 8,
    marginTop: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default App;
