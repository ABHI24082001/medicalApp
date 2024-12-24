import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  StatusBar
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const MyBookingsScreen = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [request, setRequest] = useState(false);
  const [reason, setReason] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const appointments = [
    {
      id: 1,
      time: '09:00 am - 09:30 am',
      hospitalName: 'Global Health Care',
      appointmentDate: '12/12/2024',
      doctor: 'Aryan Mehta',
      condition: 'Dermatology • Online Visit',
      status: 'Completed',
      statusColor: '#e0f7fa',
      statusTextColor: 'green',
      location: 'Pune, India',
      duration: '30 MIN',
    },
    {
      id: 2,
      time: '11:00 am - 11:30 am',
      hospitalName: 'Metro City Hospital',
      appointmentDate: '13/12/2024',
      doctor: 'Sarah Johnson',
      condition: 'Pediatric Check-up • Physical Visit',
      status: 'Upcoming',
      statusColor: '#fff3e0',
      statusTextColor: 'orange',
      location: 'Chennai, India',
      duration: '30 MIN',
    },
    {
      id: 3,
      time: '02:00 pm - 02:30 pm',
      hospitalName: 'Wellness Specialty Clinic',
      appointmentDate: '14/12/2024',
      doctor: 'Mohammed Ali',
      condition: 'Cardiology • Online Visit',
      status: 'Pending',
      statusColor: '#f3e5f5',
      statusTextColor: 'purple',
      location: 'Kolkata, India',
      duration: '30 MIN',
    },
    {
      id: 4,
      time: '04:00 pm - 04:30 pm',
      hospitalName: 'Prime Care Medical Center',
      appointmentDate: '15/12/2024',
      doctor: 'Neeraj Kumar',
      condition: 'General Consultation • Physical Visit',
      status: 'Canceled',
      statusColor: '#ffebee',
      statusTextColor: 'red',
      location: 'Bengaluru, India',
      duration: '30 MIN',
    },
  ];


  const filters = ['All', 'Pending', 'Upcoming', 'Completed', 'Canceled'];

  const filteredAppointments =
    activeFilter === 'All'
      ? appointments
      : appointments.filter(item => item.status === activeFilter);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const renderCard = appointment => (
    <TouchableOpacity
      activeOpacity={0.9}
      key={appointment.id}
      onPress={() => navigation.navigate('Appointment', {appointment})}>
      <View style={styles.appointment}>
        <Text style={styles.timeText}>{appointment.time}</Text>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Image
              source={{
                uri: 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png',
              }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.doctorName}>{appointment.doctor}</Text>

              <View style={styles.row}>
                <Icon name="local-pharmacy" size={16} color="#ff724f" />
                <Text style={styles.appointmentDetails}>
                  : {appointment.hospitalName}
                </Text>
              </View>

              <View style={styles.row}>
                <Icon name="calendar-today" size={16} color="#4B5563" />
                <Text style={styles.appointmentDetails}>
                  : {appointment.appointmentDate}
                </Text>
              </View>
              <View style={styles.row}>
                <Icon name="healing" size={16} color="#4f75ff" />
                <Text style={styles.appointmentDetails}>
                  : {appointment.condition}
                </Text>
              </View>

              {/* <Text style={styles.appointmentDetails}>
                {appointment.hospitalName}
              </Text>
              <Text style={styles.appointmentDetails}>
                {appointment.condition}
              </Text>
              <Text style={styles.appointmentDetails}>
                {appointment.appointmentDate}
              </Text> */}
            </View>
            <View
              style={[
                styles.statusBadge,
                {backgroundColor: appointment.statusColor},
              ]}>
              <Text
                style={[
                  styles.statusText,
                  {color: appointment.statusTextColor},
                ]}>
                {appointment.status}
              </Text>
            </View>
          </View>
          {appointment.status === 'Upcoming' && (
            <TouchableOpacity style={styles.attendButton}>
              <Text style={styles.attendButtonText}>Attend Session</Text>
            </TouchableOpacity>
          )}
          {appointment.status === 'Pending' && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.declineButton}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.declineButtonText}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => setRequest(true)}>
                <Text style={styles.acceptButtonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>   
      <Text style={styles.appointmentsHeader}> My Appointments</Text>
      <Text style={styles.allAppointmentsHeader}>All Appointments</Text>
      <View style={styles.filterContainer}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter}
            onPress={() => setActiveFilter(filter)}>
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.filterTextActive,
              ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {filteredAppointments.map(renderCard)}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.detailRow}>
              <Text style={styles.modalTitle}>Reschedule Appointment</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Entypo name="circle-with-cross" size={25} color="#ff6d2e" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.inputField}
              placeholderTextColor={'#000'}
              placeholder="Write your reason"
              value={reason}
              onChangeText={setReason}
            />
            <TextInput
              style={styles.inputField}
              placeholderTextColor={'#000'}
              placeholder="Your Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.inputField}
              placeholderTextColor={'#000'}
              placeholder="Your Phone Number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <TouchableOpacity
              style={styles.requestButton}
              onPress={() => {
                // Handle request
                setModalVisible(false);
                alert('Request Sent!');
              }}>
              <Text style={styles.requestButtonText}>Request to Call</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* <Modal
        visible={request}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setRequest(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.detailRow}>
              <Text style={styles.modalTitle}>Reschedule Appointment</Text>
              <TouchableOpacity
                onPress={() => {
                  setRequest(false);
                }}>
                <Entypo name="circle-with-cross" size={25} color="#ff6d2e" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.inputField}
              placeholderTextColor={'#000'}
              placeholder="Your Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.inputField}
              placeholderTextColor={'#000'}
              placeholder="Your Phone Number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <TouchableOpacity
              style={styles.requestButton}
              onPress={() => {
                // Handle request
                setRequest(false);
                alert('Request Sent!');
              }}>
              <Text style={styles.requestButtonText}>Request to Call</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setRequest(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  appointmentsHeader: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 16,
    color: '#00731f',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  allAppointmentsHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterText: {
    color: '#9e9e9e',
    fontSize: 14,
    marginHorizontal: 8,
  },
  filterTextActive: {
    color: 'green',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: 'green',
  },
  appointment: {
    marginBottom: 16,
  },
  timeText: {
    color: '#9e9e9e',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fffaf7',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#B3A69B',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
    resizeMode: 'center',
  },
  doctorName: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 20, 
  },
  appointmentDetails: {
    color: '#000',
    fontSize: 12,
    marginLeft: 5,
    width: 'auto',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginLeft: 'auto',
    position: 'absolute',
    margin: 10,
    top: -16,
    end: -15,
  },
  statusText: {
    fontSize: 12,
  },
  attendButton: {
    backgroundColor: 'green',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  attendButtonText: {
    color: 'white',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  declineButton: {
    backgroundColor: '#ffebee',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  declineButtonText: {
    color: '#f44336',
  },
  acceptButton: {
    backgroundColor: '#e8f5e9',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  acceptButtonText: {
    color: '#4caf50',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',

    // backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  inputField: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    color: '#000',
  },
  requestButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  requestButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#ddd',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  closeButtonText: {
    color: '#000',
  },
});

export default MyBookingsScreen;
