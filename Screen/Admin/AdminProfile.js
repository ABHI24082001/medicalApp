import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


const AdminProfileScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1E8449', '#8ff7ab', '#8ff7ab', '#1E8449']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={25} color="#FFF" />
          </TouchableOpacity>
          {/* Profile Image */}
          <TouchableOpacity>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Outdoors-man-portrait_%28cropped%29.jpg',
              }}
              style={styles.profileImage}
            />
          </TouchableOpacity>

          {/* Greeting Text */}
        </View>
        <View style={styles.ProfileHeader}>
          <Text style={styles.greetingText}>
            Hello, Admin <Text style={styles.waveEmoji}>👋</Text>
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.menu}>
        {/* <MenuItem
          icon="person-outline"
          text="Edit Profile"
          onPress={() => navigation.navigate('AdminEditProfile')}
        /> */}
        <MenuItem
          icon="business"
          text="Hospital Management"
          onPress={() => navigation.navigate('AdminHospital')}
        />
        <MenuItem
          icon="notifications-outline"
          text="Notifications"
          onPress={() => navigation.navigate('AdminNotification')}
        />
        <MenuItem
          icon="list-outline"
          text="All Patients"
          onPress={() => navigation.navigate('TotalUser')}
        />
        <MenuItem
          icon="help-circle-outline"
          text="Help and Support"
          onPress={() => navigation.navigate('AdminHelpSupport')}
        />
        <MenuItem
          icon="bar-chart-outline"
          text="Report"
          onPress={() => navigation.navigate('AllReport')}
        />

        <MenuItem
          icon="bag-add-outline"
          text="Post-Treatment"
          onPress={() => navigation.navigate('PostTreatment')}
        />

        <MenuItem
          icon="log-out-outline"
          text="Log Out"
          // onPress={() => navigation.navigate('Login')}
          onPress={() => setModalVisible(true)}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.actionSheet}>
            <Text style={styles.modalTitle}>
              Are you sure you want to log out?
            </Text>
            <TouchableOpacity>
               <SimpleLineIcons name="logout" size={50} color="#00ad00" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Login');
              }}>
              <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// MenuItem component to handle navigation
const MenuItem = ({icon, text, onPress}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Icon name={icon} size={24} color="#4A4A4A" />
    <Text style={styles.menuText}>{text}</Text>
    <Icon name="chevron-forward-outline" size={20} color="#4A4A4A" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 10,
    position: 'absolute',
    top: -25,
    left: 10,
    borderRadius: 25,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greetingText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProfileHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  LogoutImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerLeft: {
    width: 40,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    flex: 1,
  },
  headerRight: {
    width: 40, // Empty space for balance
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  phone: {
    fontSize: 14,
    color: '#666',
  },
  menu: {
    marginTop: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#4A4A4A',
    marginLeft: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  actionSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#245403',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 11,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#ddd',
    paddingVertical: 11,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminProfileScreen;
