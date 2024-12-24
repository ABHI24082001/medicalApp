import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const AdminAppointmentsDetails = ({ route, navigation }) => {
  const { appointmentData } = route.params;

  // States for each action switch
  const [isRescheduled, setIsRescheduled] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  // Handlers for each switch
  const handleRescheduleToggle = () => {
    setIsRescheduled(!isRescheduled);
    Alert.alert(
      'Reschedule Changed',
      `Appointment is now ${isRescheduled ? 'not' : ''} Rescheduled`
    );
  };

  const handleCancelToggle = () => {
    setIsCancelled(!isCancelled);
    Alert.alert(
      'Cancel Changed',
      `Appointment is now ${isCancelled ? 'not' : ''} Cancelled`
    );
  };

  const handleApproveToggle = () => {
    setIsApproved(!isApproved);
    Alert.alert(
      'Approve Changed',
      `Appointment is now ${isApproved ? 'not' : ''} Approved`
    );
  };

  const handleRejectToggle = () => {
    setIsRejected(!isRejected);
    Alert.alert(
      'Reject Changed',
      `Appointment is now ${isRejected ? 'not' : ''} Rejected`
    );
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
        <Text style={styles.headerTitle}>Admin Appointment Details</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Appointment Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>
          Doctor: <Text style={styles.boldText}>{appointmentData.doctorName}</Text>
        </Text>
        <Text style={styles.detailText}>
          Hospital: <Text style={styles.boldText}>{appointmentData.hospitalName}</Text>
        </Text>
        <Text style={styles.detailText}>
          Treatment: <Text style={styles.boldText}>{appointmentData.Treatment}</Text>
        </Text>
        <Text style={styles.detailText}>
          Location: <Text style={styles.boldText}>{appointmentData.location}</Text>
        </Text>
        <Text style={styles.detailText}>
          Date: <Text style={styles.boldText}>{appointmentData.appointmentDate}</Text>
        </Text>
        <Text style={styles.detailText}>
          Time: <Text style={styles.boldText}>{appointmentData.time}</Text>
        </Text>
        <Text style={styles.detailText}>
          Duration: <Text style={styles.boldText}>{appointmentData.duration}</Text>
        </Text>
      </View>

      {/* Switches for Appointment Actions */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>
          Reschedule: <Text style={styles.boldText}>{isRescheduled ? 'Yes' : 'No'}</Text>
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#10B981' }}
          thumbColor={'#10B981'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleRescheduleToggle}
          value={isRescheduled}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>
          Cancel: <Text style={styles.boldText}>{isCancelled ? 'Yes' : 'No'}</Text>
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#EF4444' }}
          thumbColor={'#EF4444'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleCancelToggle}
          value={isCancelled}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>
          Approve: <Text style={styles.boldText}>{isApproved ? 'Yes' : 'No'}</Text>
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#10B981' }}
          thumbColor={'#10B981'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleApproveToggle}
          value={isApproved}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>
          Reject: <Text style={styles.boldText}>{isRejected ? 'Yes' : 'No'}</Text>
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#F59E0B' }}
          thumbColor={'#F59E0B'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleRejectToggle}
          value={isRejected}
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.rescheduleButton}>
          <Text style={styles.actionButtonText}>Reschedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.actionButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.approveButton}>
          <Text style={styles.actionButtonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton}>
          <Text style={styles.actionButtonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  detailsContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    borderRadius: 20,
    marginLeft: 15,
    marginRight: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  detailText: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 12,
  },
  boldText: {
    fontWeight: '700',
    color: '#111827',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  switchLabel: {
    fontSize: 16,
    color: '#111827',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  rescheduleButton: {
    backgroundColor: '#4B5563',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#EF4444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  approveButton: {
    backgroundColor: '#10B981',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  rejectButton: {
    backgroundColor: '#F59E0B',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AdminAppointmentsDetails;
