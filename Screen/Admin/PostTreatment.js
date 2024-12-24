import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const appointments = {
  current: [
    {
      id: '1',
      date: '25 Dec 2024',
      doctor: 'Dr. David Patel',
      clinic: 'Sunrise Health Clinic',
      specialization: 'Pediatrics',
      location: 'Mumbai, India',
      time: '08:00 AM - 06:00 PM',
      duration: '30 MIN',
    },
    {
      id: '2',
      date: '27 Feb 2025',
      doctor: 'Dr. David Patel',
      clinic: 'Sunrise Health Clinic',
      specialization: 'Orthopedic Surgery',
      location: 'Mumbai, India',
      time: '08:00 AM - 06:00 PM',
      duration: '30 MIN',
    },
    {
      id: '3',
      date: '27 Feb 2025',
      doctor: 'Dr. David Patel',
      clinic: 'Sunrise Health Clinic',
      specialization: 'Orthopedic Surgery',
      location: 'Mumbai, India',
      time: '08:00 AM - 06:00 PM',
      duration: '30 MIN',
    },
  ],
  history: [
    {
      id: '3',
      date: '15 Jan 2024',
      doctor: 'Dr. Sarah Lee',
      clinic: 'Health First Hospital',
      specialization: 'Dermatology',
      location: 'Pune, India',
      time: '10:00 AM - 10:30 AM',
      duration: '30 MIN',
    },
  ],
};

const Appointments = ({navigation}) => {
  const [tab, setTab] = useState('current');

  const renderAppointment = ({item}) => (
    <View style={styles.card}>
      {/* Date Section with Linear Gradient */}
      <LinearGradient
        colors={['#37b859', '#7aff9e']}
        style={styles.dateContainer}>
        <Text style={styles.date}>{item.date.split(' ')[0]}</Text>
        <Text style={styles.monthYear}>
          {item.date.split(' ')[1]} {item.date.split(' ')[2]}
        </Text>
      </LinearGradient>

      {/* Divider */}
      <View style={styles.divider} />
      <View style={styles.detailsContainer}>
        <Text style={styles.doctorName}>{item.doctor}</Text>
        <Text style={styles.clinic}>{item.clinic}</Text>
        <Text style={styles.specialization}>{item.specialization}</Text>
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
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#28C76F', '#1E8449']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={25} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctor Details</Text>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={25} color="#FFF" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Header Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            tab === 'current' && styles.activeTab, // Highlight the active tab
          ]}
          onPress={() => setTab('current')}>
          <LinearGradient
            colors={
              tab === 'current'
                ? ['#000', '#000'] // Gradient for active tab
                : ['#ffffff', '#ffffff'] // Default background for inactive tab
            }
            style={[
              styles.gradientTab,
              tab === 'current' && styles.activeTabGradient,
            ]}>
            <Text
              style={[
                styles.tabText,
                tab === 'current' && styles.activeTabText, // Bold text for active tab
              ]}>
              Current
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            tab === 'history' && styles.activeTab, // Highlight the active tab
          ]}
          onPress={() => setTab('history')}>
          <LinearGradient
            colors={
              tab === 'history'
                ? ['#000', '#000'] // Gradient for active tab
                : ['#ffffff', '#ffffff'] // Default background for inactive tab
            }
            style={[
              styles.gradientTab,
              tab === 'history' && styles.activeTabGradient,
            ]}>
            <Text
              style={[
                styles.tabText,
                tab === 'history' && styles.activeTabText, // Bold text for active tab
              ]}>
              History
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Appointment List */}
      <FlatList
        data={appointments[tab]}
        keyExtractor={item => item.id}
        renderItem={renderAppointment}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    elevation: 1,
  },
  gradientTab: {
    width: '80%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 16,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  editText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFF',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 20,
    overflow: 'hidden', // Ensures the gradient stays within the tab
  },
  activeTabGradient: {
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    color: '#555',
  },
  activeTabText: {
    color: '#ffffff', // White text for active tabs
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    elevation: 2,
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
  date: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
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
  detailsContainer: {
    flex: 1,
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

export default Appointments;
