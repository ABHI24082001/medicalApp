import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {primarycolor} from './Screen/utils';
import Home from './Screen/Home';
import Book from './Screen/Book';
import SplashScreen from './Screen/Splash';
import LoginScreen from './Screen/LogPage';
import Login from './Screen/LoginScreen';
import SignUpScreen from './Screen/SignUpScreen';
import LoginPhone from './Screen/LoginPhone';
import Loginotp from './Screen/Loginotp';
import Dashboard from './Screen/User/Dashboard';
import AllHospital from './Screen/User/AllHospital';
import DoctorDetails from './Screen/User/DoctorDetails';
import AllDoctor from './Screen/User/AllDoctor';
import Doctor from './Screen/User/Doctor';
import DateTime from './Screen/User/DateTime';
import BookAppointment from './Screen/User/BookAppointment';
import Profile from './Screen/User/Profile';
import AppointmentHistory from './Screen/User/AppointmentHistory';
import Notification from './Screen/User/Notification';
import HelpSupport from './Screen/User/HelpSupport';
import EditProfile from './Screen/User/EditProfile';
import ForgetPassword from './Screen/ForgetPassword';
import DoctorDashboard from './Screen/Doctor/DoctorDashboard';
import DoctorProfile from './Screen/Doctor/DoctorProfile';
import DoctorEditProfile from './Screen/Doctor/DoctorEditProfile';
import DoctorNotification from './Screen/Doctor/DoctorNotification';
import PatintRecord from './Screen/Doctor/PatintRecord';
import DoctorAppointmentHistory from './Screen/Doctor/DoctorAppointmentHistory';
import Communication from './Screen/Doctor/Communication';
import DoctorMessage from './Screen/Doctor/DoctorMessage';
import AdminDashboard from './Screen/Admin/AdminDashboard';
import TotalUser from './Screen/Admin/TotalUser';
import TotalDoctor from './Screen/Admin/TotalDoctor';
import Adminuserdetails from './Screen/Admin/Adminuserdetails';
import Admindoctor from './Screen/Admin/Admindoctor';
import AdminProfile from './Screen/Admin/AdminProfile';
import AllReport from './Screen/Admin/AllReport';
import DoctorReport from './Screen/User/DoctorReport';
import MangeDoctor from './Screen/Admin/MangeDoctor';
import AppointmentDetails from './Screen/User/AppointmentDetails';
import AdminHospital from './Screen/Admin/AdminHospital';
import AdminManage from './Screen/Admin/AdminManage';
import AdminEditProfile from './Screen/Admin/AdminEditProfile';
import DoctorAppointmentHistoryDetails from './Screen/Doctor/DoctorAppointmentHistoryDetails';
import PatintRecordDetails from './Screen/Doctor/PatintRecordDetails';
import DoctoronboardingScreen from './Screen/Doctor/DoctoronboardingScreen';
import Appointment from './Screen/Doctor/Appointment';
import AdminAppointments from './Screen/Admin/AdminAppointments';
import AdminAppointmentsDetails from './Screen/Admin/AdminAppintmentsDetails';
import AdminNotification from './Screen/Admin/AdminNotification';
import PostTreatment from './Screen/Admin/PostTreatment';
import Availability from './Screen/Admin/Availability';
import AdminHelpSupport from './Screen/Admin/AdminHelpSupport';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function UserTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Date') {
            iconName = 'calendar-week';
          } else if (route.name === 'Profile') {
            iconName = 'user-circle';
          }
          return (
            <Icon name={iconName} size={focused ? 32 : 24} color={color} />
          );
        },
        tabBarLabel: ({focused}) => (
          <Text
            style={{
              fontSize: focused ? 12 : 10,
              fontWeight: 'bold',
              color: focused ? primarycolor : '#92f7c0',
            }}>
            {route.name}
          </Text>
        ),
        tabBarStyle: {
          backgroundColor: '#fff',
          paddingBottom: 10,
          height: 70,
          borderTopWidth: 0.5,
          borderTopColor: '#ccc',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
          marginHorizontal: 0,
        },
        tabBarActiveTintColor: primarycolor,
        tabBarInactiveTintColor: '#92f7c0',
      })}>
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Date"
        component={AppointmentHistory}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    
    </Tab.Navigator>
  );
}

function DoctorTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Dashboard') {
            iconName = 'home';
          } else if (route.name === 'Appointments') {
            iconName = 'calendar-check';
          } else if (route.name === 'Profile') {
            iconName = 'user-md';
          }
          return (
            <Icon name={iconName} size={focused ? 32 : 24} color={color} />
          );
        },
        tabBarLabel: ({focused}) => (
          <Text
            style={{
              fontSize: focused ? 12 : 10,
              fontWeight: 'bold',
              color: focused ? primarycolor : '#92f7c0',
            }}>
            {route.name}
          </Text>
        ),
        tabBarStyle: {
          backgroundColor: '#fff',
          paddingBottom: 10,
          height: 70,
          borderTopWidth: 0.5,
          borderTopColor: '#ccc',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
        },
        tabBarActiveTintColor: primarycolor,
        tabBarInactiveTintColor: '#92f7c0',
      })}>
      <Tab.Screen
        name="Dashboard"
        component={DoctoronboardingScreen} // Ensure this is doctor-specific
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Appointments"
        component={DoctorAppointmentHistory}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={DoctorProfile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;
          if (route.name === 'AdminDashboard') {
            iconName = 'chart-pie';
          } else if (route.name === 'ManageDoctors') {
            iconName = 'user-md';
          } else if (route.name === 'AdminAppointments') {
            iconName = 'calendar-alt';
          }
          return (
            <Icon name={iconName} size={focused ? 32 : 24} color={color} />
          );
        },
        tabBarActiveTintColor: primarycolor,
        tabBarInactiveTintColor: '#92f7c0',
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 70,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
        },
      })}>
      <Tab.Screen
        name="AdminDashboard"
        component={AdminDashboard}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="ManageDoctors"
        component={TotalDoctor}
        options={{headerShown: false}}
      />

      <Tab.Screen
        name="AdminAppointments"
        component={AdminAppointments}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen
          name="splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Logind"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginPhone"
          component={LoginPhone}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Loginotp"
          component={Loginotp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{headerShown: false}}
        />
        {/* <Tab.Screen name="Chat" component={Book} options={{headerShown: false}} /> */}
        <Stack.Screen
          name='Chat'
          component={Book}
          options={{headerShown: false}}
        
        />
        <Stack.Screen
          name="AllHospital"
          component={AllHospital}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DoctorDetails"
          component={DoctorDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AllDoctor"
          component={AllDoctor}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Doctor"
          component={Doctor}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DateTime"
          component={DateTime}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BookAppointment"
          component={BookAppointment}
          options={{headerShown: false}}
        />

        {/* UserProfile */}

        <Stack.Screen
          name="AppointmentHistory"
          component={AppointmentHistory}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="HelpSupport"
          component={HelpSupport}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="DoctoronboardingScreen"
          component={DoctoronboardingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AppointmentDetails"
          component={AppointmentDetails}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="usertabs"
          component={UserTabs}
          options={{headerShown: false}}
        />

        {/* Doctor panel */}
        <Stack.Screen
          name="DoctorDashboard"
          component={DoctorDashboard}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="DoctorTabs"
          component={DoctorTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DoctorEditProfile"
          component={DoctorEditProfile}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="DoctorNotification"
          component={DoctorNotification}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="PatintRecord"
          component={PatintRecord}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="DoctorAppointmentHistory"
          component={DoctorAppointmentHistory}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="DoctorAppointmentHistoryDetails"
          component={DoctorAppointmentHistoryDetails}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Appointment"
          component={Appointment}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Communication"
          component={Communication}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="DoctorMessage"
          component={DoctorMessage}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="DoctorReport"
          component={DoctorReport}
          options={{headerShown: false}}
        />

        {/* Andmin dashboard */}

        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AdminAppointments"
          component={AdminAppointments}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AdminAppointmentsDetails"
          component={AdminAppointmentsDetails}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="TotalUser"
          component={TotalUser}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="TotalDoctor"
          component={TotalDoctor}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Adminuserdetails"
          component={Adminuserdetails}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Admindoctor"
          component={Admindoctor}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AdminProfile"
          component={AdminProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AllReport"
          component={AllReport}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="MangeDoctor"
          component={MangeDoctor}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AdminHospital"
          component={AdminHospital}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="PatintRecordDetails"
          component={PatintRecordDetails}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AdminManage"
          component={AdminManage}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AdminEditProfile"
          component={AdminEditProfile}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AdminTabs"
          component={AdminTabs}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="PostTreatment"
          component={PostTreatment}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AdminNotification"
          component={AdminNotification}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Availability"
          component={Availability}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AdminHelpSupport"
          component={AdminHelpSupport}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
