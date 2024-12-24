import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  Button,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import globalStyles from '../component/style';
import DeleteModal from '../component/DeleteModal';

const TotalDoctor = ({navigation}) => {
  const [doctor, setDoctors] = useState([
    {
      id: 1,
      name: 'Dr James Robinson',
      role: 'Orthopedic Surgery',
      location: 'Elite Ortho Clinic, USA',
      date: '2023-05-22',
      time: '10:00 AM',
      image:
        'https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      status: 'Active',
      about:
        'Born on November 11, 1955, in Vaipur, Pathanamthitta, Kerala Dr. K.Chitrathara had her early school education at the NSS High School in Vaipur. She had her pre-degree course at Assumption College, Changanacherry. Then she joined the Kottayam Medical College for MBBS in 1973 and completed it in 1979 with good academic records.',
      fellowship:
        'National award of FOGSI 2014 “Dr. Duru Shah Distinguished Community Service Award”',
    },
    {
      id: 2,
      name: 'Dr Jane Doe',
      role: 'Pediatric Specialist',
      location: 'City Children Clinic, USA',
      date: '2023-05-23',
      time: '11:00 AM',
      image:
        'https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      status: 'Inactive',
      about:
        'Sri Ramakrishna Sevasramam award for community service December 2015',
      fellowship:
        '. Musiris binale awards for Best Doctor in Kerala 2014 & 2015',
    },
  ]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('All');
  const [sortType, setSortType] = useState('A-Z');
  const [showModal, setShowModal] = useState(false);
  const [gender, setGender] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState(null);
  const [showDelete , setShowDelete] = useState(false);
  const [isChanging , setIsChanging] = useState(false);
  const [selectedId, setSelectedId] = useState(null)

  const genderOptions = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Other', value: 'other'},
  ];

  const Experience = [
    {label: '1 Year', value: '1 Year'},
    {label: '2 Year', value: '2 Year'},
    {label: '3 Year', value: '3 Year'},
    {label: '4 Year', value: '4 Year'},
    {label: '5 Year', value: '5 Year'},
  ];

  const defaultImage =
    'https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const roleOptions = [
    {label: 'Orthopedic Surgery', value: 'Orthopedic Surgery'},
    {label: 'Pediatric Specialist', value: 'Pediatric Specialist'},
    {label: 'Cardiologist', value: 'Cardiologist'},
    {label: 'Dentist', value: 'Dentist'},
  ];

  const [isActivated, setIsActivated] = useState(false);

  const handleAddUser = () => {
    if (!newUser.name.trim()) {
      Alert.alert('Error', 'Name is required!');
      return;
    }
    if (!newUser.about.trim()) {
      Alert.alert('Error', 'About is required!');
      return;
    }
    if (!newUser.fellowship.trim()) {
      Alert.alert('Error', 'Fellowship is required!');
      return;
    }
    if (!newUser.age || isNaN(newUser.age) || parseInt(newUser.age) <= 0) {
      Alert.alert('Error', 'Enter a valid age!');
      return;
    }
    if (!gender) {
      Alert.alert('Error', 'Gender is required!');
      return;
    }
    if (!experience) {
      Alert.alert('Error', 'Experience is required!');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      Alert.alert('Error', 'Enter a valid email address!');
      return;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(newUser.phone)) {
      Alert.alert('Error', 'Enter a valid 10-digit phone number!');
      return;
    }
    if (!newUser.location.trim()) {
      Alert.alert('Error', 'Location is required!');
      return;
    }
    if (!role) {
      Alert.alert('Error', 'Role is required!');
      return;
    }

    // Add new user to the list
    const id =
      doctor.length > 0 ? Math.max(...doctor.map(user => user.id)) + 1 : 1;

    const newDoctor = {
      id,
      ...newUser,
      gender,
      experience,
      role,
      image: defaultImage,
      status: isActivated ? 'Active' : 'Inactive',
    };

    setDoctors([...doctor, newDoctor]);

    // Reset state and form
    setShowModal(false);
    resetForm();

    Alert.alert(
      'Success',
      'Doctor added successfully!',
      [{text: 'OK', onPress: () => console.log('Doctor Added')}],
      {cancelable: false},
    );
  };

  const handleSearch = text => {
    setSearchText(text);
  };

  const resetForm = () => {
    setNewUser({
      name: '',
      about: '',
      fellowship: '',
      age: '',
      gender: '',
      experience: '',
      phone: '',
      email: '',
      location: '',
      role: '',
    });
    setGender(null);
    setRole('');
    setIsActivated(false);
  };

  const [newUser, setNewUser] = useState({
    name: '',
    about: '',
    fellowship: '',
    age: '',
    gender: '',
    experience: '',
    phone: '',
    email: '',
    location: '',
    role: '',
  });


  // const handleDeleteUser = id => {
  //   Alert.alert('Delete User', 'Are you sure you want to delete this user?', [
  //     {text: 'Cancel'},
  //     {
  //       text: 'Delete',
  //       onPress: () => setDoctors(doctor.filter(user => user.id !== id)),
  //     },
  //   ]);
  // };


  const handleDeleteUser = id => {
    setSelectedId(id);
    setShowDelete(true);
  };


    const handleDelete = () => {
      if (selectedId !== null) {
        setIsChanging(true); // Set the loading state
        setDoctors(prevDoctors =>
          prevDoctors.filter(user => user.id !== selectedId),
        );
        setIsChanging(false); // Reset loading state
        setShowDelete(false); // Close the modal
      }
    };



  const handleSort = type => {
    let sortedUsers = [...doctor];
    if (type === 'A-Z') {
      sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === 'Z-A') {
      sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
    } else if (type === 'Newest') {
      sortedUsers.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (type === 'Oldest') {
      sortedUsers.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    setDoctors(sortedUsers);
    setSortType(type);
  };

  const filteredUsers = doctor.filter(user =>
    filter === 'All' ? true : user.status === filter,
  );

  const searchedUsers = filteredUsers.filter(
    user =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.role.toLowerCase().includes(searchText.toLowerCase()) ||
      user.id.toString().includes(searchText),
  );

  const renderUserCard = ({item}) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={globalStyles.textLight}>
          {item.date} - {item.time}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Admindoctor', {item: doctor})}>
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <Image source={{uri: item.image}} style={styles.cardImage} />
        <View style={styles.cardInfo}>
          <Text style={globalStyles.textBold}>{item.name}</Text>
          <Text style={globalStyles.textSemiBold}>{item.role}</Text>
          <Text style={globalStyles.textSemiBold}>{item.location}</Text>
        </View>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[
            styles.statusButton,
            {backgroundColor: item.status === 'Active' ? '#4CAF50' : '#FF6347'},
          ]}
          onPress={() =>
            setDoctors(
              doctor.map(user =>
                user.id === item.id
                  ? {
                      ...user,
                      status: user.status === 'Active' ? 'Inactive' : 'Active',
                    }
                  : user,
              ),
            )
          }>
          <Text style={styles.statusButtonText}>
            {item.status === 'Active' ? 'Upcoming' : 'cancel'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteUser(item.id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>

        <DeleteModal
          showDelete={showDelete}
          setShowDelete={setShowDelete}
          handleDelete={handleDelete}
          isChanging={isChanging}
        />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#28C76F', '#1E8449']}
        style={styles.headerContainer}>
        {/* Buttons (Back Button on Left, Add Button on Right) */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={25} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowModal(true)}>
            <Icon name="add-circle-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Header Title */}
        <View style={styles.header}>
          <Text style={styles.greetingText}>Doctor Management</Text>
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
            placeholder="Search by ID, name, or role..."
            value={searchText}
            placeholderTextColor="#888"
            onChangeText={handleSearch}
          />
        </View>
      </LinearGradient>

      <FlatList
        data={searchedUsers}
        keyExtractor={item => item.id.toString()}
        renderItem={renderUserCard}
        contentContainerStyle={styles.listContainer}
      />
      {/* Add User Modal */}
      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.Modalheader}>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Icon name="arrow-back-outline" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add Doctor</Text>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter Name"
                placeholderTextColor={'#000'}
                value={newUser.name}
                onChangeText={text => setNewUser({...newUser, name: text})}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>About</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter About"
                placeholderTextColor={'#000'}
                value={newUser.about}
                onChangeText={text => setNewUser({...newUser, about: text})}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Fellowship</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter Fellowship"
                placeholderTextColor={'#000'}
                value={newUser.fellowship}
                onChangeText={text =>
                  setNewUser({...newUser, fellowship: text})
                }
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Age</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter Age"
                placeholderTextColor={'#000'}
                value={newUser.age}
                keyboardType="number-pad"
                onChangeText={text => setNewUser({...newUser, age: text})}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Enter your Number </Text>
              <TextInput
                style={styles.modalInput}
                placeholderTextColor={'#000'}
                placeholder="Enter Phone Number"
                value={newUser.phone}
                keyboardType="phone-pad"
                onChangeText={text => setNewUser({...newUser, phone: text})}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Enter your Email Address </Text>
              <TextInput
                style={styles.modalInput}
                placeholderTextColor={'#000'}
                placeholder="Enter Email Address"
                value={newUser.email}
                keyboardType="email-address"
                onChangeText={text => setNewUser({...newUser, email: text})}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Enter your Location </Text>
              <TextInput
                style={styles.modalInput}
                placeholderTextColor={'#000'}
                placeholder="Enter Location"
                value={newUser.location}
                onChangeText={text => setNewUser({...newUser, location: text})}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Enter Your Gender</Text>
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
                onChange={item => setGender(item.value)}
                disabled={!isEditable}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Enter Your Experience</Text>
              <Dropdown
                style={styles.dropdown}
                data={Experience}
                placeholderStyle={{color: '#000', fontSize: 16}}
                selectedTextStyle={{color: '#000', fontSize: 16}}
                itemTextStyle={{color: '#000', fontSize: 16}}
                labelField="label"
                valueField="value"
                placeholder="Select Experience"
                value={experience}
                onChange={item => setExperience(item.value)}
                disabled={!isEditable}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Select Specialist</Text>
              <Dropdown
                style={styles.dropdown}
                data={roleOptions}
                labelField="label"
                valueField="value"
                placeholderStyle={{color: '#000', fontSize: 16}}
                selectedTextStyle={{color: '#000', fontSize: 16}}
                itemTextStyle={{color: '#000', fontSize: 16}}
                placeholder="Select Specialist"
                value={role}
                onChange={item => setRole(item.value)} // Set selected role
              />
            </View>

            <View style={styles.modalActions}>
              <Button
                title="Add Doctors"
                onPress={handleAddUser}
                color="#4CAF50"
              />
              <Button
                title="Cancel"
                onPress={() => setShowModal(false)}
                color="#FF6347"
              />
            </View>
          </ScrollView>
        </View>
      </Modal>

      <Modal visible={showFilterModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.Modalheader}>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <Icon name="arrow-back-outline" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Filters</Text>
          </View>
          <View style={styles.filterOptions}>
            {['All', 'Active', 'Inactive'].map(status => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.filterButton,
                  filter === status && styles.activeFilterButton,
                ]}
                onPress={() => {
                  setFilter(status);
                  setShowFilterModal(false);
                }}>
                <Text
                  style={[
                    styles.filterButtonText,
                    filter === status && styles.activeFilterButtonText,
                  ]}>
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
            {['A-Z', 'Z-A', 'Newest', 'Oldest'].map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterButton,
                  sortType === type && styles.activeFilterButton,
                ]}
                onPress={() => {
                  handleSort(type);
                  setShowFilterModal(false);
                }}>
                <Text
                  style={[
                    styles.filterButtonText,
                    sortType === type && styles.activeFilterButtonText,
                  ]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
    padding: 8,
  },
  addButton: {
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  inputGroup: {
    marginBottom: 1,
  },
  Modalheader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 20,
    marginBottom: 10,
  },

  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 12,
    marginTop: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginBottom: 8,
    marginHorizontal: 5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2, // Add shadow effect for a lifted look
  },
  activeFilterButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
    elevation: 5, // Highlight the active filter with more shadow
  },
  filterButtonText: {
    fontSize: 14,
    color: '#6B7280',
  },
  activeFilterButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold', // Make text bold when active
  },

  listContainer: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#2d4f1d',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  detailsButtonText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  cardRole: {
    fontSize: 14,
    color: '#6B7280',
    marginVertical: 4,
  },
  cardLocation: {
    fontSize: 12,
    color: '#6B7280',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  statusButton: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  statusButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  deleteButton: {
    borderColor: '#FF6347',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  deleteButtonText: {
    fontSize: 14,
    color: '#FF6347',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
    color: '#374151',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
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

export default TotalDoctor;
