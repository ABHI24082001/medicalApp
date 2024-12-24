import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const AppointmentHistory = ({navigation}) => {
  const appointments = [
    {
      id: 1,
      doctorName: 'Dr. David Patel',
      hospitalName: 'Sunrise Health Clinic',
      location: 'Mumbai, India',
      appointmentDate: '25/08/22',
      time: '08:00 AM - 06:00 PM',
      duration: '30 MIN',
      Treatment: 'Pediatrics'
    },
    {
      id: 2,
      doctorName: 'Dr. David Patel',
      hospitalName: 'Sunrise Health Clinic',
      location: 'Mumbai, India',
      appointmentDate: '25/08/22',
      time: '08:00 AM - 06:00 PM',
      duration: '30 MIN',
      Treatment: 'Orthopedic Surgery'
    },
    {
      id: 3,
      doctorName: 'Dr. Sarah Lee',
      hospitalName: 'Golden Cardiology',
      location: 'Delhi, India',
      appointmentDate: '28/08/22',
      time: '10:00 AM - 02:00 PM',
      duration: '45 MIN',
      Treatment: 'Gynecologist'
    },
    
  ];
  const handleSeeDetails = appointment => {
    // Navigate to the AppointmentDetails screen and pass the full appointment object
    navigation.navigate('AppointmentDetails', {appointmentData: appointment});
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrowleft" size={24} color="#4B5563" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointment History</Text>
        <View style={{width: 24}} />
      </View>

      {/* Appointment List */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {appointments.map(appointment => (
          <View key={appointment.id} style={styles.card}>
            {/* Info Container */}
            <View style={styles.infoContainer}>
              <Text style={styles.doctorName}>{appointment.doctorName}</Text>
              <Text style={styles.hospitalName}>
                {appointment.hospitalName}
              </Text>
              <Text style={styles.hospitalName}>
                {appointment.Treatment}
              </Text>
              <Text style={styles.location}>{appointment.location}</Text>
              <Text style={styles.details}>
                {appointment.appointmentDate} | {appointment.time}
              </Text>
              <Text style={styles.duration}>
                Duration: {appointment.duration}
              </Text>
            </View>

            {/* See Details Button */}
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => handleSeeDetails(appointment)}>
              <Text style={styles.detailsButtonText}>See Details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#FFFFFF',
    elevation: 3,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoContainer: {
    marginBottom: 8,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  details: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  duration: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 4,
  },
  detailsButton: {
    marginTop: 12,
    backgroundColor: '#10B981', // A vibrant green button
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AppointmentHistory;
