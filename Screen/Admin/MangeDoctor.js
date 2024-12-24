import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';


const DoctorManageApp = ({navigation}) => {
  const appointments = [
    {
      id: 1,
      doctorName: 'David Patel',
      details: '25/08/22 - 08.00 AM-18.00 PM',
      duration: '30 MIN',
    },
    {
      id: 2,
      doctorName: 'David Patel',
      details: '25/08/22 - 08.00 AM-18.00 PM',
      duration: '30 MIN',
    },
    {
      id: 3,
      doctorName: 'David Patel',
      details: '25/08/22 - 08.00 AM-18.00 PM',
      duration: '30 MIN',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" size={24} color="#4B5563" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Doctor Appointments</Text>
        <View style={{width: 24}} />
      </View>

      <Text style={styles.sectionTitle}>Appointment History </Text>

      {/* Appointment List */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {appointments.map(appointment => (
          <View key={appointment.id} style={styles.card}>
            {/* Date Container */}
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>25</Text>
              <Text style={styles.monthText}>Aug</Text>
            </View>

            {/* Info Container */}
            <View style={styles.infoContainer}>
              <Text style={styles.doctorName}>{appointment.doctorName}</Text>
              <Text style={styles.details}>{appointment.details}</Text>
              <Text style={styles.duration}>{appointment.duration}</Text>
            </View>

          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    padding: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    backgroundColor: '#10B981',
    borderRadius: 8,
    padding: 8,
    width: 60,
    height: 80,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  monthText: {
    fontSize: 14,
    color: '#FFF',
  },
  label: {
    backgroundColor: '#059669',
    borderRadius: 4,
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  labelText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFF',
  },
  infoContainer: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  details: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  duration: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  editIcon: {
    marginLeft: 16,
  },
});

export default DoctorManageApp;
