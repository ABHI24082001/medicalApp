import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';


const AdminUserDetails = ({ navigation }) => {
  // State Management
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [speciality, setSpeciality] = useState('Dentist');
  const [location, setLocation] = useState('New York, USA');
  const [appointmentDate, setAppointmentDate] = useState('May 22, 2023');
  const [duration, setDuration] = useState('30 mins');
  const [payment, setPayment] = useState('$50');

  // Toggle Editing Mode
  const handleSaveOrEdit = () => {
    setEditing(!editing);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#28C76F', '#1E8449']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={25} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Details</Text>
        <TouchableOpacity onPress={handleSaveOrEdit}>
          <Text style={styles.editText}>{editing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* User Card */}
      {/* <View style={styles.card}>
        <Text style={styles.cardDate}>May 22, 2023 - 10:00 AM</Text>
        <View style={styles.cardContent}>
          <View style={styles.detailsWrapper}>
            {editing ? (
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            ) : (
              <Text style={styles.text}>{name}</Text>
            )}
            {editing ? (
              <TextInput
                style={styles.input}
                value={speciality}
                onChangeText={setSpeciality}
              />
            ) : (
              <Text style={styles.text}>{speciality}</Text>
            )}
            <View style={styles.location}>
              {editing ? (
                <TextInput
                  style={[styles.input, {marginLeft: 5}]}
                  value={location}
                  onChangeText={setLocation}
                />
              ) : (
                <Text style={[styles.text, {marginLeft: 5}]}>{location}</Text>
              )}
            </View>
          </View>
        </View>
      </View> */}

      <View style={styles.details}>
        <Text style={styles.detailsHeading}>Basic Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name</Text>
          {editing ? (
            <TextInput
              style={styles.detailInput}
              value={name}
              onChangeText={setName}
            />
          ) : (
            <Text style={styles.detailText}>{name}</Text>
          )}
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Specialist</Text>
          {editing ? (
            <TextInput
              style={styles.detailInput}
              value={speciality}
              onChangeText={setSpeciality}
            />
          ) : (
            <Text style={styles.detailText}>{speciality}</Text>
          )}
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Location</Text>
          {editing ? (
            <TextInput
              style={styles.detailInput}
              value={location}
              onChangeText={setLocation}
            />
          ) : (
            <Text style={styles.detailText}>{location}</Text>
          )}
        </View>
      </View>

      {/* Details Section */}
      <View style={styles.details}>
        <Text style={styles.detailsHeading}>Appointment Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date</Text>
          {editing ? (
            <TextInput
              style={styles.detailInput}
              value={appointmentDate}
              onChangeText={setAppointmentDate}
            />
          ) : (
            <Text style={styles.detailText}>{appointmentDate}</Text>
          )}
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Duration</Text>
          {editing ? (
            <TextInput
              style={styles.detailInput}
              value={duration}
              onChangeText={setDuration}
            />
          ) : (
            <Text style={styles.detailText}>{duration}</Text>
          )}
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment</Text>
          {editing ? (
            <TextInput
              style={styles.detailInput}
              value={payment}
              onChangeText={setPayment}
            />
          ) : (
            <Text style={styles.detailText}>{payment}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 16,
    elevation: 5,
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

  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 10,
    fontWeight: '600',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  detailsWrapper: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 8,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    
  },
  detailsHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    flex: 2,
  },
  detailInput: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    flex: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 8,
  },
});

export default AdminUserDetails;
