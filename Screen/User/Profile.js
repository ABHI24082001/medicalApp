import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
const ProfileScreen = ({navigation}) => {
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
                uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              }}
              style={styles.profileImage}
            />
          </TouchableOpacity>

          {/* Greeting Text */}
        </View>
        <View style={styles.ProfileHeader}>
          <Text style={styles.greetingText}>Hello User</Text>
        </View>
      </LinearGradient>

      <View style={styles.menu}>
        <MenuItem
          icon="person-outline"
          text="Edit Profile"
          onPress={() => navigation.navigate('EditProfile')}
        />
        {/* <MenuItem
          icon="heart-outline"
          text="Favourites"
          onPress={() => navigation.navigate('Favourites')}
        /> */}
        <MenuItem
          icon="notifications-outline"
          text="Notifications"
          onPress={() => navigation.navigate('Notification')}
        />
        {/* <MenuItem
          icon="list-outline"
          text="Medical Report"
          onPress={() => navigation.navigate('MedicalReport')}
        /> */}
        <MenuItem
          icon="help-circle-outline"
          text="Help and Support"
          onPress={() => navigation.navigate('HelpSupport')}
        />
        <MenuItem
          icon="chatbubble-ellipses-outline"
          text="Chat Now"
          onPress={() => navigation.navigate('Chat')}
        />
        <MenuItem
          icon="log-out-outline"
          text="Log Out"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
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
  headerLeft: {
    width: 40,
    alignItems: 'flex-start',
  },
  ProfileHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default ProfileScreen;
