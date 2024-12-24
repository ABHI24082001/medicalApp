import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {LineChart, PieChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import LinearGradient from 'react-native-linear-gradient';
const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
};

const data2 = [
  {
    name: 'Weekly',
    population: 20,
    color: '#2E8B57',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: 'Monthly',
    population: 50,
    color: '#B0C4DE',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: 'Annually',
    population: 30,
    color: '#FFA500',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
];

const DoctoronboardingScreen = ({navigation}) => {
  return (
    <ScrollView>
      <StatusBar
        backgroundColor="#00731f"
        barStyle="light-content"
        translucent={false}
      />
      <LinearGradient
        colors={['#28C76F', '#6df792', '#88b895']}
        style={styles.headerContainer}>
        <View style={styles.header}>
          {/* Profile Image */}
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={{
                uri: 'https://media.istockphoto.com/id/2153805399/photo/portrait-of-happy-female-doctor-standing-outside-at-front-of-modern-hospital.jpg?s=2048x2048&w=is&k=20&c=XReqcBIwh9BZvjwq4n-yhWHRhSIzOthMejkX96m15yk=',
              }}
              style={styles.profileImage}
            />
          </TouchableOpacity>

          {/* Greeting Text */}

          {/* Notification Icon */}
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <Octicons name="bell" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.greetingText}>
          Let's Find <Text style={styles.waveEmoji}>👋</Text>
        </Text>
        <Text style={styles.greetingText}>
          Your New Appointments <Text style={styles.waveEmoji}>🩺</Text>
        </Text>
      </LinearGradient>
      {/* <View>
        <Text style={{color: 'black', fontSize: 24, fontWeight: 'bold'}}>
          Hey, Dr. Harbor!
        </Text>
        <Text style={{color: 'black', fontSize: 18}}>Today is a busy day</Text>
        <View style={styles.iconContainer}>
          <Icon name="bell" size={24} color="#FFF" />
        </View>
      </View> */}
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 16,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          borderColor: '#000',
          borderWidth: 1,
          marginLeft: 10,
          marginRight: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{
              uri: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?t=st=1734068411~exp=1734072011~hmac=9ef0563082193d646016a004cc96c10aa5bebda11d68ca967a9f2e97c4ad18d8&w=360',
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 15,
              marginRight: 16,
              resizeMode: 'center',
            }}
          />

          <View>
            <Text style={{fontWeight: 'bold', color: '#000'}}>
              Alicent Hightower
            </Text>
            <Text style={{color: 'gray'}}>Migranes • Online Visit</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#D1FAE5',
            borderRadius: 10,
            padding: 8,
            marginTop: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="calendar"
              size={20}
              color="#34D399"
              style={{marginRight: 8}}
            />
            <Text style={{color: '#000'}}>Monday, May 12</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="clock-o"
              size={20}
              color="#34D399"
              style={{marginRight: 8}}
            />
            <Text style={{color: '#000'}}>11:00 - 12:00 AM</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 16}}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'white',
              borderColor: 'gray',
              borderWidth: 1,
              padding: 12,
              borderRadius: 10,
              marginRight: 8,
            }}
            onPress={() => navigation.navigate('DoctorDashboard')}>
            <Text style={{textAlign: 'center', color: 'gray'}}>Reschedule</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#065F46',
              padding: 12,
              borderRadius: 10,
            }}
            onPress={() => navigation.navigate('DoctorDashboard')}>
            <Text style={{textAlign: 'center', color: 'white'}}>Upcoming</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 16,
          marginTop: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          marginLeft: 10,
          marginRight: 10,
          borderEndColor: '#000',
          borderWidth: 1
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', color: '#000'}}>
            Patient Visits
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('DoctorReport')}>
            <Text style={{color: '#427eff', fontWeight: '800'}}>View All</Text>
          </TouchableOpacity>
        </View>
        <PieChart
          data={data2}
          width={screenWidth - 64}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[10, 10]}
          absolute
          style={{marginTop: 16}}
        />
      </View> */}

      <View style={styles.card}>
        {/* Header Section */}
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>All Reports Visits</Text>

          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={() => navigation.navigate('DoctorReport')}
              style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <AntDesign name="arrowright" size={16} color="#427eff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Pie Chart Section */}
        <PieChart
          data={data2}
          width={screenWidth - 32} // Reduced padding for better space
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[10, 10]}
          absolute
          style={styles.pieChart}
        />
      </View>

      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 16,
          marginTop: 11,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          marginLeft: 10,
          marginRight: 10,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 17, color: '#000'}}>
          World Class HealthCare Ecosystem in India
        </Text>
        <View style={{flexDirection: 'row', marginTop: 16}}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#065F46',
              borderRadius: 10,
              padding: 16,
            }}>
            <Text style={{color: 'white'}}>
              Trusted User and Hospitals with quality and affordable healthcare
              services for all
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#34D399',
                padding: 12,
                borderRadius: 10,
                marginTop: 16,
              }}
              onPress={() => navigation.navigate('DoctorDashboard')}>
              <Text style={{textAlign: 'center', color: 'white'}}>
                All Appointment
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: 'https://media.istockphoto.com/id/1189191657/photo/indian-young-female-doctor-showing-thumbs-up.jpg?s=2048x2048&w=is&k=20&c=BLBT7Xc1uPrBA_D3Wfty2EN4KDPTgxP6fQTD88cRs2c=',
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginLeft: 16,
              resizeMode: 'center',
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default DoctoronboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerContainer: {
    paddingVertical: 30,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 16,
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
    marginTop: 10,
    fontSize: 25,
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

  iconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: '#34D399',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 8,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    // Modern Shadow Design
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,

    borderWidth: 1,
    borderColor: '#e5e7eb', // Light gray for a clean look
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  downloadButton: {
    backgroundColor: '#2563EB', // Blue download button
    padding: 8,
    borderRadius: 25,
    marginRight: 10,
    elevation: 2,
  },

  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  viewAllText: {
    color: '#427eff',
    fontWeight: '700',
    marginRight: 4, // Space between text and arrow
  },

  pieChart: {
    marginTop: 16,
  },
});
