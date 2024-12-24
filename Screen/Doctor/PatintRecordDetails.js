import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PatientRecordDetails = ({route, navigation}) => {
  const {patient} = route.params;

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <AntDesign name="arrowleft" size={25} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Patient Details</Text>
      <View style={styles.headerRight} />
    </View>
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: patient.image }} style={styles.image} />
        <Text style={styles.name}>{patient.name}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appointment Details</Text>
        <View style={styles.row}>
          <MaterialIcons name="business" size={20} color="#6B7280" />
          <Text style={styles.detail}>Clinic: {patient.clinic}</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="place" size={20} color="#6B7280" />
          <Text style={styles.detail}>Location: {patient.location}</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="calendar-today" size={20} color="#6B7280" />
          <Text style={styles.detail}>Appointment: {patient.appointmentDate}</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="health-and-safety" size={20} color="#6B7280" />
          <Text style={styles.detail}>Treatment: {patient.specialty}</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="schedule" size={20} color="#6B7280" />
          <Text style={styles.detail}>Time: {patient.time}</Text>
        </View>
        
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status</Text>
        <View
          style={
            patient.status === 'Complete'
              ? styles.statusBadgeComplete
              : styles.statusBadgeInProgress
          }
        >
          <Text style={styles.statusBadgeText}>{patient.status}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medical Report</Text>
        <TouchableOpacity style={styles.downloadButton}>
          <MaterialIcons name="download" size={20} color="#FFFFFF" />
          <Text style={styles.downloadText}>Download Report</Text>
        </TouchableOpacity>
      </View>
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
      backgroundColor: '#fff', // Vibrant header
      paddingVertical: 11,
      paddingHorizontal: 15,
      elevation: 1,
    },
    backButton: {
      padding: 5,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: '#000',
      textAlign: 'center',
      flex: 1,
    },
    headerRight: {
      width: 40,
    },
    content: {
      padding: 16,
    },
    profileContainer: {
      alignItems: 'center',
      marginBottom: 16,
    },
    image: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 2,
      borderColor: '#E5E7EB',
      marginBottom: 8,
    },
    name: {
      fontSize: 22,
      fontWeight: '600',
      color: '#1F2937',
    },
    section: {
      backgroundColor: '#FFFFFF',
      padding: 16,
      borderRadius: 10,
      marginBottom: 16,
      elevation: 2,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#374151',
      marginBottom: 8,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
    },
    detail: {
      fontSize: 16,
      color: '#4B5563',
      marginLeft: 8,
    },
    statusBadgeComplete: {
      backgroundColor: '#22C55E',
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 20,
      alignSelf: 'flex-start',
    },
    statusBadgeInProgress: {
      backgroundColor: '#FACC15',
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 20,
      alignSelf: 'flex-start',
    },
    statusBadgeText: {
      fontSize: 14,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    downloadButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2563EB',
      paddingVertical: 10,
      borderRadius: 25,
      marginTop: 8,
      elevation: 2,
    },
    downloadText: {
      fontSize: 16,
      color: '#FFFFFF',
      fontWeight: '600',
      marginLeft: 8,
    },
  });
  

export default PatientRecordDetails;
