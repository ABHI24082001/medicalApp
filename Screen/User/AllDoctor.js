import React, {useState, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';
import globalStyles from '../component/style';
import LoadingModal from '../component/LoadingModal';

const AllDoctor = ({navigation}) => {
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading , setLoading] =  useState('true');

  const doctors = [
    {
      About:
        ' Dr. David Patel working as Senior Obstetrician and Gynecologist with more than 25 years of varied experience in clinical practice. Dr. Goyal has proven expertise in diagnosing and treating a wide spectrum of gynecologic conditions occurring in patients. She regularly attends various regional and National Seminars and Conferences and is associated with NARCHI ( National Association for Reproduction Child health of India) , FOGSI ( Federation of Obstetrician Gynecologist Society of India ) & AIGOD ( All India Society of Gynecologist & Obstetrician of Delhi)',
      hospitalName: 'Sri Ganga Ram Hospital, Sir Ganga Ram Hospital Marg',
      name: 'Dr. David Patel',
      specialty: 'Cardiologist',
      location: 'Cardiology Center, USA',
      rating: 5,
      reviews: 1872,
      Experience: '15+ years',
      Followership: 'electrophysiology, care hospital Hyderabad.',
      Degree: 'MBBS',
      image:
        'https://familydoctor.org/wp-content/uploads/2018/02/41808433_l-848x566.jpg',
    },
    {
      About:
        'Dr.Jessica Turner working as Senior Obstetrician and Gynecologist with more than 25 years of varied experience in clinical practice. Dr. Goyal has proven expertise in diagnosing and treating a wide spectrum of gynecologic conditions occurring in patients. She regularly attends various regional and National Seminars and Conferences and is associated with NARCHI ( National Association for Reproduction Child health of India) , FOGSI ( Federation of Obstetrician Gynecologist Society of India ) & AIGOD ( All India Society of Gynecologist & Obstetrician of Delhi)',
      hospitalName: 'Sri Ganga Ram Hospital, Sir Ganga Ram Hospital Marg',
      name: 'Dr.Jessica Turner',
      specialty: 'Gynecologist',
      location: "Women's Clinic, Seattle, USA",
      rating: 4.9,
      reviews: 127,
      Degree: 'MBBS',
      Experience: '1+ years',
      Followership: 'electrophysiology, care hospital Hyderabad.',
      image: 'https://healinindia.gov.in/images/doctors/default_doctor.png',
    },
    {
      About:
        'Dr. Michael Johnson working as Senior Obstetrician and Gynecologist with more than 25 years of varied experience in clinical practice. Dr. Goyal has proven expertise in diagnosing and treating a wide spectrum of gynecologic conditions occurring in patients. She regularly attends various regional and National Seminars and Conferences and is associated with NARCHI ( National Association for Reproduction Child health of India) , FOGSI ( Federation of Obstetrician Gynecologist Society of India ) & AIGOD ( All India Society of Gynecologist & Obstetrician of Delhi)',
      hospitalName: 'Sri Ganga Ram Hospital, Sir Ganga Ram Hospital Marg',
      name: 'Dr. Michael Johnson',
      specialty: 'Orthopedic Surgery',
      location: 'Maple Associates, NY, USA',
      rating: 4.7,
      reviews: 5223,
      Degree: 'MBBS',
      Experience: '11+ years',
      Followership: 'electrophysiology, care hospital Hyderabad.',
      image:
        'https://cdn.askapollo.com/live/images/doctors/general-medicine/dr-amitav-mohanty-general-medicine-in-bhubaneswar.png',
    },
    {
      About:
        'Dr.Emily Walker working as Senior Obstetrician and Gynecologist with more than 25 years of varied experience in clinical practice. Dr. Goyal has proven expertise in diagnosing and treating a wide spectrum of gynecologic conditions occurring in patients. She regularly attends various regional and National Seminars and Conferences and is associated with NARCHI ( National Association for Reproduction Child health of India) , FOGSI ( Federation of Obstetrician Gynecologist Society of India ) & AIGOD ( All India Society of Gynecologist & Obstetrician of Delhi)',
      hospitalName: 'Sri Ganga Ram Hospital, Sir Ganga Ram Hospital Marg',
      name: 'Dr.Emily Walker',
      specialty: 'Pediatrics',
      location: 'Serenity Pediatrics Clinic',
      rating: 5,
      reviews: 405,
      Experience: '13+ years',
      Degree: 'MBBS',
      Followership: 'electrophysiology, care hospital Hyderabad.',
      image: 'https://healinindia.gov.in/images/doctors/default_doctor.png',
    },
    {
      About:
        'Dr.JON working as Senior Obstetrician and Gynecologist with more than 25 years of varied experience in clinical practice. Dr. Goyal has proven expertise in diagnosing and treating a wide spectrum of gynecologic conditions occurring in patients. She regularly attends various regional and National Seminars and Conferences and is associated with NARCHI ( National Association for Reproduction Child health of India) , FOGSI ( Federation of Obstetrician Gynecologist Society of India ) & AIGOD ( All India Society of Gynecologist & Obstetrician of Delhi)',
      hospitalName: 'Sri Ganga Ram Hospital, Sir Ganga Ram Hospital Marg',
      name: 'Dr.JON',
      specialty: 'Pediatrics',
      location: 'Serenity Pediatrics Clinic',
      rating: 5,
      reviews: 405,
      Experience: '13+ years',
      Degree: 'MBBS',
      Followership: 'electrophysiology, care hospital Hyderabad.',
      image: 'https://healinindia.gov.in/images/doctors/default_doctor.png',
    },
    {
      About:
        'Dr.Ealker working as Senior Obstetrician and Gynecologist with more than 25 years of varied experience in clinical practice. Dr. Goyal has proven expertise in diagnosing and treating a wide spectrum of gynecologic conditions occurring in patients. She regularly attends various regional and National Seminars and Conferences and is associated with NARCHI ( National Association for Reproduction Child health of India) , FOGSI ( Federation of Obstetrician Gynecologist Society of India ) & AIGOD ( All India Society of Gynecologist & Obstetrician of Delhi)',
      hospitalName: 'Sri Ganga Ram Hospital, Sir Ganga Ram Hospital Marg',
      name: 'Dr.Ealker',
      specialty: 'Pediatrics',
      location: 'Serenity Pediatrics Clinic',
      rating: 5,
      reviews: 405,
      Experience: '13+ years',
      Degree: 'MBBS',
      Followership: 'electrophysiology, care hospital Hyderabad.',
      image:
        'https://cdn.askapollo.com/live/images/doctors/rheumatology/dr-ajit-kumar-surin-rheumatology-in-bhubaneswar.png',
    },
  ];

  const treatments = [
    {label: 'General Surgery', value: 'General Surgery'},
    {label: 'Internal Medicine', value: 'Internal Medicine'},
    {label: 'Pediatrics', value: 'Pediatrics'},
    {label: 'Psychiatry', value: 'Psychiatry'},
    {label: 'Dermatology', value: 'Dermatology'},
    {label: 'Gynecology', value: 'Gynecology'},
    {label: 'Cardiology', value: 'Cardiology'},
    {label: 'Neurology', value: 'Neurology'},
  ];


  // console.log(doctors)

  const filteredDoctors = useMemo(() => {
    return doctors.filter(
      doctor =>
        (!selectedTreatment || doctor.specialty === selectedTreatment) &&
        (!searchQuery ||
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase())),
    );
  }, [selectedTreatment, searchQuery, doctors]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, []);

  const renderDoctorCard = ({item}) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('Doctor', {doctor: item})}>
      <Image source={{uri: item.image}} style={styles.doctorImage} />
      <View style={styles.cardContent}>
        <Text style={globalStyles.textBold2} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={globalStyles.textMedium}>{item.specialty}</Text>
        <Text style={globalStyles.textMedium}>{item.Experience}</Text>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate('Doctor', {doctor: item})}>
          <Text style={styles.detailsButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#28C76F', '#1E8449']}
        style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={25} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.greetingText}>All Doctors</Text>
        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={20}
            style={styles.searchIcon}
            color="#000"
          />
          <TextInput
            placeholder="Search for doctors, services..."
            style={styles.searchInput}
            placeholderTextColor="#6B7280"
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

      {loading && <LoadingModal />}

      {!loading && (
        <>
          <FlatList
            data={filteredDoctors}
            renderItem={renderDoctorCard}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.doctorList}
            numColumns={2}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  headerContainer: {
    padding: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  greetingText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  backButton: {position: 'absolute', left: 16, top: 16},
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: -9,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
  },
  searchInput: {flex: 1, color: '#111827'},
  searchIcon: {marginRight: 10},
  filterContainer: {marginVertical: 16},
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
  doctorList: {paddingHorizontal: 10},
  cardContainer: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    margin: '1%',
    paddingBottom: 10,
    elevation: 1,
    marginTop: 20,
  },
  doctorImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    resizeMode: 'center',
  },
  cardContent: {padding: 10},
  doctorName: {fontSize: 16, fontWeight: 'bold', color: '#1E293B'},
  doctorSpecialty: {fontSize: 14, color: '#10b981', marginBottom: 4},
  doctorExperience: {fontSize: 12, color: '#000'},
  ratingContainer: {flexDirection: 'row', alignItems: 'center', marginTop: 4},
  ratingText: {marginLeft: 4, color: '#555', fontSize: 12},
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

export default AllDoctor;
