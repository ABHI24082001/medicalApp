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
  Switch,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import globalStyles from '../component/style';
const TotalUser = ({navigation}) => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'James Robinson',
      role: 'Orthopedic Surgery',
      location: 'Elite Ortho Clinic, USA',
      date: '2023-05-22',
      time: '10:00 AM',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/330px-Outdoors-man-portrait_%28cropped%29.jpg',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Jane Doe',
      role: 'Pediatric Specialist',
      location: 'City Children Clinic, USA',
      date: '2023-05-23',
      time: '11:00 AM',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/330px-Outdoors-man-portrait_%28cropped%29.jpg',
      status: 'Inactive',
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
  

  const genderOptions = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Other', value: 'other'},
  ];

  const defaultImage =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/330px-Outdoors-man-portrait_%28cropped%29.jpg';

  const roleOptions = [
    {label: 'Orthopedic Surgery', value: 'Orthopedic Surgery'},
    {label: 'Pediatric Specialist', value: 'Pediatric Specialist'},
    {label: 'Cardiologist', value: 'Cardiologist'},
    {label: 'Dentist', value: 'Dentist'},
  ];

  const [isActivated, setIsActivated] = useState(false);

  const handleAddUser = () => {
    // Validation checks
    if (!newUser.name.trim()) {
      Alert.alert('Error', 'Name is required!');
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
      users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  
    setUsers([
      ...users,
      {
        id,
        ...newUser,
        gender,
        role,
        image: defaultImage,
        status: isActivated ? 'Active' : 'Inactive',
      },
    ]);
  
    // Reset state and form
    setShowModal(false);
    resetForm();
  
    // Success alert
    Alert.alert(
      'Success',
      'User added successfully!',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  };
  
  const handleSearch = text => {
    setSearchText(text);
  };

  const resetForm = () => {
    setNewUser({
      name: '',
      age: '',
      gender: '',
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
    age: '',
    gender: '',
    phone: '',
    email: '',
    location: '',
    role: '',
  });

  const toggleSwitch = () => setIsActivated(!isActivated);

  const handleDeleteUser = id => {
    Alert.alert('Delete User', 'Are you sure you want to delete this user?', [
      {text: 'Cancel'},
      {
        text: 'Delete',
        onPress: () => setUsers(users.filter(user => user.id !== id)),
      },
    ]);
  };

  const handleSort = type => {
    let sortedUsers = [...users];
    if (type === 'A-Z') {
      sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === 'Z-A') {
      sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
    } else if (type === 'Newest') {
      sortedUsers.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (type === 'Oldest') {
      sortedUsers.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    setUsers(sortedUsers);
    setSortType(type);
  };

  const filteredUsers = users.filter(user =>
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
          onPress={() => navigation.navigate('Adminuserdetails')}>
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => {
            setSelectedUser(item); // Set selected user for editing
            setShowModal(true); // Open modal for editing
          }}>
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.cardContent}>
        <Image source={{uri: item.image}} style={styles.cardImage} />
        <View style={styles.cardInfo}>
          <Text style={globalStyles.textBold}>{item.name}</Text>
          <Text style={globalStyles.textSemiBold}>{item.role}</Text>
          <Text style={globalStyles.textSemiBold}>
            {item.location}
          </Text>
        </View>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[
            styles.statusButton,
            {backgroundColor: item.status === 'Active' ? '#4CAF50' : '#FF6347'},
          ]}
          onPress={() =>
            setUsers(
              users.map(user =>
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
            {item.status === 'Active' ? 'Deactivate' : 'Activate'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteUser(item.id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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
          <Text style={styles.greetingText}>User Management </Text>
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
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowFilterModal(true)}>
            <Icon name="filter-outline" size={23} color="#000" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Management</Text>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Icon name="add-circle-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#6B7280" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by ID, name, or role..."
          placeholderTextColor="#9CA3AF"
          value={searchText}
          onChangeText={handleSearch}
        />
        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
          <Icon name="filter-outline" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View> */}

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
            <Text style={styles.modalTitle}>Add User</Text>
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
              <Text style={styles.inputLabel}>Treatment</Text>
              <Dropdown
                style={styles.dropdown}
                data={roleOptions}
                labelField="label"
                valueField="value"
                placeholderStyle={{color: '#000', fontSize: 16}}
                selectedTextStyle={{color: '#000', fontSize: 16}}
                itemTextStyle={{color: '#000', fontSize: 16}}
                placeholder="Select Role"
                value={role}
                onChange={item => setRole(item.value)} // Set selected role
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>
                  {isActivated ? 'Activate' : 'Deactivate'}
                </Text>
                <Switch
                  value={isActivated}
                  onValueChange={toggleSwitch}
                  trackColor={{false: '#e04826', true: '#34D399'}}
                  thumbColor={isActivated ? '#10B981' : '#e04826'}
                />
              </View>
            </View>

            <View style={styles.modalActions}>
              <Button
                title="Add User"
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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
  scrollContent: {
    paddingBottom: 20,
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
  switchLabel: {
    fontSize: 16,
    color: '#000',
  },
  iconContainer: {
    width: 40, // Set width to make it a circle
    height: 40, // Set height equal to width
    borderRadius: 15, // Half of the width/height to make it a circle
    backgroundColor: '#FFF', // Light background color for the icon
    justifyContent: 'center', // Center the icon vertically
    alignItems: 'center', // Center the icon horizontally
  
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2, // Elevation for Android shadow effect
  },

  backButton: {
    padding: 8,
  },
  addButton: {
    padding: 8,
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
    marginRight: 10, 
    marginLeft: 10,
    borderColor: '#4CAF50',
    borderWidth: 1
    
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

export default TotalUser;
