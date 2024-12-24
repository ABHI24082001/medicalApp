import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Modal,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FilterModal from '../component/FilterModalComponent';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import globalStyles from '../component/style';


const AllHospital = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [editingHospital, setEditingHospital] = useState(null); // For editing
  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: 'Sir Ganga Ram Hospital',
      details: {address: 'Old Rajinder Nagar, New Delhi-110060'},
      contact: '9006868659',
      treatment: 'Cardiology, Orthopedics',
      remark: 'Special discounts on selected services',
    },
    {
      id: 2,
      name: 'Shri Mool Chand Kharaiti Ram Hospital',
      details: {address: 'Lajpat Nagar-III, New Delhi-110024'},
      contact: '9006868659 , 9937497494',
      treatment: 'Cardiology, Orthopedics, ',
      remark: 'Special discounts on selected services',
    },
  ]);

  const [newHospital, setNewHospital] = useState({
    name: '',
    location: '',
    contact: '',
    treatment: '',
    remark: '',
  });

  const filteredHospitals = hospitals.filter(
    hospital =>
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.details.address
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  // Handle phone dial
  const dialPhone = number => {
    Linking.openURL(`tel:${number}`);
  };

  // Handle Add/Edit Hospital
  const handleSaveHospital = () => {
    if (!newHospital.name || !newHospital.location) {
      alert('Please fill in all required fields.');
      return;
    }

    if (editingHospital) {
      // Update existing hospital
      setHospitals(prev =>
        prev.map(hospital =>
          hospital.id === editingHospital.id
            ? {...editingHospital, ...newHospital}
            : hospital,
        ),
      );
    } else {
      // Add new hospital
      setHospitals(prev => [
        ...prev,
        {
          id: Date.now(),
          name: newHospital.name,
          details: {address: newHospital.location},
          contact: newHospital.contact,
          treatment: newHospital.treatment,
          remark: newHospital.remark,
        },
      ]);
    }

    setModalVisible(false);
    setNewHospital({
      name: '',
      location: '',
      contact: '',
      treatment: '',
      remark: '',
    });
    setEditingHospital(null);
  };

  // Handle Delete Hospital
  const handleDeleteHospital = id => {
    setHospitals(prev => prev.filter(hospital => hospital.id !== id));
  };

  // Open modal for adding or editing hospital
  const openModal = (hospital = null) => {
    setEditingHospital(hospital);
    if (hospital) {
      setNewHospital({
        name: hospital.name,
        location: hospital.details.address,
        contact: hospital.contact,
        treatment: hospital.treatment,
        remark: hospital.remark,
      });
    } else {
      setNewHospital({
        name: '',
        location: '',
        contact: '',
        treatment: '',
        remark: '',
      });
    }
    setModalVisible(true);
  };

  const handleFilter = filterType => {
    switch (filterType) {
      case 'A-Z':
        setHospitals(prev =>
          [...prev].sort((a, b) => a.name.localeCompare(b.name)),
        );
        break;
      case 'Z-A':
        setHospitals(prev =>
          [...prev].sort((a, b) => b.name.localeCompare(a.name)),
        );
        break;
      case 'new':
        setHospitals(prev => [...prev].sort((a, b) => b.id - a.id));
        break;
      case 'old':
        setHospitals(prev => [...prev].sort((a, b) => a.id - b.id));
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
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
              onPress={() => setShowFilterModal(true)}>
              <Icon name="filter" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Header Title */}
          <View style={styles.header}>
            <Text style={styles.greetingText}>Hospital Management</Text>
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
              value={searchQuery}
              onChangeText={setSearchQuery}
              // value={searchText}
              placeholderTextColor="#888"
              // onChangeText={handleSearch}
            />
          </View>
        </LinearGradient>

        {/* <View style={styles.header}>
          <AntDesign
            name="arrowleft"
            size={25}
            color="#6B7280"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Hospital Management</Text>
          <View style={{width: 20}} />
        </View>

        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by ID, name, or role..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={() => setShowFilterModal(true)}>
            <AntDesign name="filter" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View> */}

        {/* Display Hospitals */}
        {filteredHospitals.map(hospital => (
          <View key={hospital.id} style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={globalStyles.textBold1}>{hospital.name}</Text>
              <Text style={globalStyles.textSemiBold}>
                {hospital.details.address}
              </Text>
              <Text style={globalStyles.textSemiBold}>
                {hospital.treatment}
              </Text>
              <View style={styles.actions}>
                {/* Edit Action */}
                <TouchableOpacity
                  onPress={() => openModal(hospital)}
                  style={styles.actionButton}>
                  <AntDesign
                    name="edit"
                    size={18}
                    color="#10B981"
                    style={styles.icon}
                  />
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>

                {/* Delete Action */}
                <TouchableOpacity
                  onPress={() => handleDeleteHospital(hospital.id)}
                  style={styles.actionButton}>
                  <AntDesign
                    name="delete"
                    size={18}
                    color="#FF6347"
                    style={styles.icon}
                  />
                  <Text style={[styles.actionText, styles.deleteText]}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity onPress={() => openModal()} style={styles.fab}>
        <AntDesign name="plus" size={30} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Modal for Add/Edit Hospital */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {editingHospital ? 'Edit Hospital' : 'Add Hospital'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Hospital Name"
              placeholderTextColor={'#000'}
              value={newHospital.name}
              onChangeText={text =>
                setNewHospital({...newHospital, name: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              placeholderTextColor={'#000'}
              value={newHospital.location}
              onChangeText={text =>
                setNewHospital({...newHospital, location: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Contact Number"
              placeholderTextColor={'#000'}
              value={newHospital.contact}
              onChangeText={text =>
                setNewHospital({...newHospital, contact: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Treatment"
              placeholderTextColor={'#000'}
              value={newHospital.treatment}
              onChangeText={text =>
                setNewHospital({...newHospital, treatment: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Remark"
              placeholderTextColor={'#000'}
              value={newHospital.remark}
              onChangeText={text =>
                setNewHospital({...newHospital, remark: text})
              }
            />

            <TouchableOpacity
              onPress={handleSaveHospital}
              style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onFilter={handleFilter}
      />
    </View>
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12, 
    borderColor: '#E0E0E0', 
    borderWidth: 1,
    paddingVertical: 7, 
    paddingHorizontal: 7,
    elevation: 1, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    marginRight: 7, 
    justifyContent: 'center',
  },
  actionText: {
    color: '#10B981',
    marginLeft: 8,
    fontSize: 19,
    fontWeight: '800',
  },
  icon: {
    marginRight: 8,
  },
  deleteText: {
    color: '#FF6347',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
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
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#374151',
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultText: {
    color: '#6b7280',
  },
  sortText: {
    color: '#6b7280',
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#2d4f1d',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  cardAddress: {
    fontSize: 20,
    color: '#6B7280',
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#10B981',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 8,
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#10B981',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ff6347',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 12,
    padding: 8,
  },
});

export default AllHospital;
