import React , {useState}from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity , Modal} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';
const DoctorProfileScreen = ({navigation}) => {
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
                uri: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?t=st=1734068411~exp=1734072011~hmac=9ef0563082193d646016a004cc96c10aa5bebda11d68ca967a9f2e97c4ad18d8&w=360',
              }}
              style={styles.profileImage}
            />
          </TouchableOpacity>

          {/* Greeting Text */}
        </View>
        <View style={styles.ProfileHeader}>
          <Text style={styles.greetingText}>
            Hello Doctor <Text style={styles.waveEmoji}>🩺</Text>
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.menu}>
        <MenuItem
          icon="person-outline"
          text="Edit Profile"
          onPress={() => navigation.navigate('DoctorEditProfile')}
        />
        <MenuItem
          icon="heart-outline"
          text="Communication"
          onPress={() => navigation.navigate('Communication')}
        />
        <MenuItem
          icon="notifications-outline"
          text="Notifications"
          onPress={() => navigation.navigate('DoctorNotification')}
        />
        <MenuItem
          icon="body-sharp"
          text="All Patient"
          onPress={() => navigation.navigate('PatintRecord')}
        />
        <MenuItem
          icon="help-circle-outline"
          text="Help and Support"
          onPress={() => navigation.navigate('HelpSupport')}
        />
        <MenuItem
          icon="bar-chart-outline"
          text="All Report "
          onPress={() => navigation.navigate('DoctorReport')}
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
  profileHeader: {
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    padding: 10,
    position: 'absolute',
    top: -25,
    left: 10,
    borderRadius: 25,
  },
  headerContainer: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
    resizeMode: 'center',

  },
  greetingText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '600',
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
    fontSize: 24,
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
    marginTop: 20
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

export default DoctorProfileScreen;
