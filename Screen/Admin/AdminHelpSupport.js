import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  LayoutAnimation,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import GradientButton from '../component/GradientButton';
import InputField from '../component/InputField';

const AdminHelpSupport = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [errors, setErrors] = useState({});

  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    Keyboard.dismiss();
    setModalVisible(false);
  };

  const handleSubmit = () => {
    const newErrors = {};

    // **Name Validation**
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[A-Za-z ]+$/.test(name)) {
      newErrors.name = 'Name must contain only alphabets';
    } else if (name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters long';
    }

    // **Number Validation**
    if (!number.trim()) {
      newErrors.number = 'Number is required';
    } else if (!/^\d{10}$/.test(number)) {
      newErrors.number = 'Enter a valid 10-digit number';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      Alert.alert('Success', 'Form is valid');
      closeModal();
      setName('');
      setNumber('');
    }
  };

  const data = [
    {
      id: 1,
      title: 'Booking a new Appointment',
      description: 'Learn how to book a new appointment.',
    },
    {
      id: 2,
      title: 'Existing Appointment',
      description: 'Manage your current appointments.',
    },
    {
      id: 3,
      title: 'Online Consultations',
      description: 'Get details about online consultations.',
    },
    {id: 4, title: 'Feedbacks', description: 'Share your feedback with us.'},
    {id: 5, title: 'Medicine Orders', description: 'Order medicines online.'},
    {
      id: 6,
      title: 'Diagnostic Tests',
      description: 'Book diagnostic tests easily.',
    },
    {
      id: 7,
      title: 'Health Plans',
      description: 'Explore various health plans.',
    },
    {
      id: 8,
      title: 'Feature Suggestions',
      description: 'Suggest new features for our app.',
    },
    {id: 9, title: 'Other Issues', description: 'Report any other issues.'},
  ];

  const toggleExpand = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleClearSearch = () => setSearchText('');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#009929', '#588563']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={styles.gradientContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={25} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={openModal}>
            <Entypo name="dots-three-vertical" size={25} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.adminContainer}>
          <View style={styles.profileContainer}>
            <Text style={styles.adminText}>Hi,how can we help you ?</Text>
          </View>
        </View>

        <View style={styles.searchInputContainer}>
          <AntDesign name="search1" size={20} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Do you have any issues with?"
            placeholderTextColor={'#888'}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText && (
            <TouchableOpacity onPress={handleClearSearch}>
              <AntDesign name="closecircle" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <View>
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => toggleExpand(index)}
              activeOpacity={0.7}>
              <Text style={styles.listItemText}>{item.title}</Text>
              <Icon
                name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="#000"
              />
            </TouchableOpacity>
            {expandedIndex === index && (
              <View style={styles.expandedContent}>
                <Text style={styles.descriptionText}>{item.description}</Text>
              </View>
            )}
          </View>
        )}
        contentContainerStyle={styles.list}
      />

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enter Details</Text>
          <InputField
            label="Name"
            placeholder="Enter your name"
            iconName="user"
            value={name}
            onChangeText={setName}
            errorMessage={errors.name}
          />

          <InputField
            label="Number"
            placeholder="Enter your Number"
            iconName="phone"
            value={number}
            onChangeText={setNumber}
            errorMessage={errors.number}
          />
          <View style={styles.buttonContainer}>
            <GradientButton
              title="Submit"
              onPress={handleSubmit}
              colors={['#00BFA6', '#007a21']}
              style={{marginBottom: 10}}
            />
            <GradientButton
              title="Cancel"
              onPress={closeModal}
              colors={['#E63946', '#E63946']}
              style={{marginBottom: 10}}
            />
          </View>

          {/* <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
  },

  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 10,
    elevation: 5,
  },

  adminContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  searchInput: {
    flex: 1,
    paddingHorizontal: 8,
    color: '#000',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listItemText: {fontSize: 22, color: '#333', fontWeight: '500'},
  expandedContent: {backgroundColor: '#f1f1f1', padding: 12},
  descriptionText: {fontSize: 16, color: '#000', fontWeight: '400'},
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  adminText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '700',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#000',
  },
  modalInput: {
    height: 40,
    borderWidth: 2,
    borderColor: '#bababa',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#00BFA6',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
  },
  cancelText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: 'bold',
  },
  gradientContainer: {
    width: '100%',
    paddingBottom: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
});

export default AdminHelpSupport;
