import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import LinearGradient from 'react-native-linear-gradient';
import {PieChart} from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';

const AdminDashboard = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [viewMode, setViewMode] = useState('Today');
  const [appointmentsData, setAppointmentsData] = useState({
    upcoming: 14,
    past: 17,
    cancelled: 3,
    total: 535,
  });

  const [pieData, setPieData] = useState([
    {
      name: 'New Patients',
      population: 57,
      color: '#4CAF50',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: 'Returning Patients',
      population: 43,
      color: '#FF9800',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
  ]);

  // Function to handle date change
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
      fetchDataForDate(selectedDate);
    }
  };

  // Function to simulate fetching data based on the date and view mode
  const fetchDataForDate = date => {
    // Simulated API call logic (you can modify this as needed)
    const day = date.getDate();
    const newAppointmentsData = {
      upcoming: Math.floor(Math.random() * 20),
      past: Math.floor(Math.random() * 20),
      cancelled: Math.floor(Math.random() * 10),
      total: Math.floor(Math.random() * 1000),
    };
    setAppointmentsData(newAppointmentsData);
  };

  const handleViewModeChange = mode => {
    setViewMode(mode);
    const newData =
      mode === 'Today'
        ? [
            {
              name: 'New Patients',
              population: 70,
              color: '#4CAF50',
              legendFontColor: '#333',
              legendFontSize: 12,
            },
            {
              name: 'Returning Patients',
              population: 30,
              color: '#FF9800',
              legendFontColor: '#333',
              legendFontSize: 12,
            },
          ]
        : [
            {
              name: 'New Patients',
              population: 40,
              color: '#4CAF50',
              legendFontColor: '#333',
              legendFontSize: 12,
            },
            {
              name: 'Returning Patients',
              population: 60,
              color: '#FF9800',
              legendFontColor: '#333',
              legendFontSize: 12,
            },
          ];

    setPieData(newData);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#28C76F', '#1E8449']}
        style={styles.headerContainer}>
        <View style={styles.header}>
          {/* Profile Image */}
          <TouchableOpacity onPress={() => navigation.navigate('AdminProfile')}>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Outdoors-man-portrait_%28cropped%29.jpg',
              }}
              style={styles.profileImage}
            />
          </TouchableOpacity>

          {/* Greeting Text */}
          <Text style={styles.greetingText}>
            Hello, Admin <Text style={styles.waveEmoji}>👋</Text>
          </Text>

          {/* Notification Icon */}
          <TouchableOpacity
            onPress={() => navigation.navigate('AdminNotification')}>
            <Octicons name="bell" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Date Section */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{selectedDate.toDateString()}</Text>
          <AntDesign name="calendar" size={20} color="#fff" />
        </View>
      </TouchableOpacity>
      <Text style={styles.AppTitle}>All Appointments</Text>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={onDateChange}
        />
      )}

      <View style={styles.appointmentsContainer}>
        <TouchableOpacity style={[styles.card, styles.cardBlue]}>
          <Text style={styles.cardTitle}>Upcoming Appointments</Text>
          <Text style={styles.cardValue}>{appointmentsData.upcoming}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, styles.cardRed]}>
          <Text style={styles.cardTitle}>Past Appointments</Text>
          <Text style={styles.cardValue}>{appointmentsData.past}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, styles.cardYellow]}>
          <Text style={styles.cardTitle}>Cancelled Appointments</Text>
          <Text style={styles.cardValue}>{appointmentsData.cancelled}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, styles.cardGreen]}>
          <Text style={styles.cardTitle}>Total Appointments</Text>
          <Text style={styles.cardValue}>{appointmentsData.total}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.reportSection}>
        <Text style={styles.sectionTitle}>Check All Report</Text>
        <View style={styles.reportButtons}>
          <TouchableOpacity
            style={[
              styles.reportButton,
              viewMode === 'Today' && styles.activeButton,
            ]}
            onPress={() => handleViewModeChange('Today')}>
            <Text style={styles.reportButtonText}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.reportButton,
              viewMode === 'Upcoming Week' && styles.activeButton,
            ]}
            onPress={() => handleViewModeChange('Upcoming Week')}>
            <Text style={styles.reportButtonText}>Upcoming Week</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.pieChartContainer}>
        <View style={styles.pieHeader}>
          <Text style={styles.sectionTitle}>All Overview</Text>
          <TouchableOpacity
            onPress={() => console.log('Download icon pressed')}>
            <FontAwesome
              name="download"
              size={24}
              color="green"
              style={styles.downloadIcon}
            />
          </TouchableOpacity>
        </View>
        <PieChart
          data={pieData}
          width={Dimensions.get('window').width - 40} // Reduce less width so labels have more space
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft={7} // Reduce padding for more space
          center={[0, 0]}
          style={{
            borderRadius: 16,
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerContainer: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pieHeader: {
    flexDirection: 'row', // Align children horizontally
    justifyContent: 'space-between', // Space between children
    alignItems: 'center', // Vertically align the children
    paddingHorizontal: 10, // Add some horizontal padding
    paddingVertical: 5, // Add vertical padding
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  downloadIcon: {
    padding: 5, // Add space around the icon for touchable effect
  },
  greetingText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '600',
    flex: 1, // Pushes the notification icon to the end
    marginLeft: 10, // Adds space between image and text
  },
  waveEmoji: {
    fontSize: 18,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 16,
    backgroundColor: '#28C76F',
    borderRadius: 8,
    padding: 12,
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  appointmentsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  card: {
    width: '48%',
    borderRadius: 8,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
  },
  cardBlue: {
    backgroundColor: '#007BFF',
  },
  cardRed: {
    backgroundColor: '#FF4D4F',
  },
  cardYellow: {
    backgroundColor: '#FFC107',
  },
  cardGreen: {
    backgroundColor: '#28C76F',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardValue: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
  },
  reportSection: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 14,
    color: '#000',
  },
  sectionTitl: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 14,
    color: '#000',
  },
  AppTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 14,
    color: '#000',
    marginLeft: 20,
    marginBottom: 20,
  },
  reportButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reportButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#28C76F',
  },
  reportButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
  pieChartContainer: {
    backgroundColor: '#ffffff',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
    elevation: 3,
    padding: 8,
    shadowColor: '#000',
  },
});

export default AdminDashboard;
