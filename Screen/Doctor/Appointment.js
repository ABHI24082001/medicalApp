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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const AppointmentDetails = ({route, navigation}) => {
  const {appointment} = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#5ca836', '#39ab00']} style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerLeft}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Session Details</Text>
        <View style={styles.headerRight} />
      </LinearGradient>

      <Text style={styles.AbhiTitle}>Patient</Text>
      {/* Profile Card */}
      <LinearGradient
        colors={['#FDEFF9', '#F8F9FA']}
        style={styles.profileCard}>
        <Image
          source={{
            uri: 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png',
          }}
          style={styles.profileImage}
        />
        <Text style={styles.doctorName}>{appointment.doctor}</Text>
        <Text style={styles.condition}>{appointment.hospitalName}</Text>
        <Text style={styles.condition}>{appointment.condition}</Text>
      </LinearGradient>

      {/* Appointment Details */}
      <LinearGradient
        colors={['#FFFFFF', '#F3F4F6']}
        style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <FontAwesome name="clock-o" size={20} color="#00731f" />
          <Text style={styles.detailText}>Time: {appointment.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesome name="stethoscope" size={20} color="#00731f" />
          <Text style={styles.detailText}>
            Condition: {appointment.condition}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesome6 name="location-dot" size={20} color="#ff763b" />
          <Text style={styles.detailText}>
            Location: {appointment.location}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Medical Report</Text>
        <TouchableOpacity style={styles.downloadButton}>
          <MaterialIcons name="download" size={20} color="#FFFFFF" />
          <Text style={styles.downloadText}>Download Report</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 70,
    paddingHorizontal: 15,
  },
  headerLeft: {
    width: 40,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  profileCard: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: {width: 0, height: 8},
    shadowRadius: 8,
    elevation: 2,
    marginLeft: 10,
    marginRight: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#fff',
    resizeMode: 'cover'
  },
  doctorName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  condition: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },

  detailsCard: {
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: {width: 0, height: 8},
    shadowRadius: 8,
    elevation: 2,
    marginTop: 16,
    marginLeft: 10,
    marginRight: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 10,
    marginBottom: 10,
  },
  AbhiTitle: {
    fontSize: 25,
    fontWeight: '600',
    color: '#206100',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },

  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 10,
    elevation: 2,
  },
  downloadText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default AppointmentDetails;
