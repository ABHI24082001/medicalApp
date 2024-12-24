import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GradientButton from '../component/GradientButton';

const AppointmentScreen = ({ route,navigation}) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const {doctor} = route.params;
  // Example times
  const availableTimes = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
  ];

  // Function to handle date change
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
  
    // Check if the selected date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00 to ignore time part for comparison
  
    if (currentDate < today) {
      // Show alert if the selected date is in the past
      Alert.alert("Invalid Date", "You cannot select a past date.");
      return; // Don't update the date if it's invalid
    }
  
    setShowDatePicker(Platform.OS === 'ios'); // Keep the picker open on iOS
    setDate(currentDate);
  };

  // Function to handle confirm button click
  const handleConfirm = () => {
    if (!selectedTime) {
      Alert.alert("Validation Error", "Please select a time for the appointment.");
      return;
    }
  
    if (!date) {
      Alert.alert("Validation Error", "Please select a date for the appointment.");
      return;
    }
  
    // Pass date and time to the next screen
    navigation.navigate("BookAppointment", {
      doctor,
      date: date.toDateString(), // Format date as string
      time: selectedTime
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <AntDesign
          name="arrowleft"
          size={25}
          color="#6B7280"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Select Date</Text>
        <View style={{width: 20}}></View>
      </View>

      {/* Select Date */}
      <Text style={styles.sectionTitle}>Select Date</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.datePickerButton}>
        <Text style={styles.dateText}>{date.toDateString()}</Text>
        <Icon name="calendar-outline" size={20} color="#000" />
      </TouchableOpacity>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {/* Select Time */}
      <Text style={styles.sectionTitle}>Select Hour</Text>
      <View style={styles.timeGrid}>
        {availableTimes.map(time => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeButton,
              selectedTime === time && styles.selectedTimeButton,
            ]}
            onPress={() => setSelectedTime(time)}>
            <Text
              style={[
                styles.timeText,
                selectedTime === time && styles.selectedTimeText,
              ]}>
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <GradientButton
        title="Book Now"
        onPress={handleConfirm}
        colors={['#00BFA6', '#007a21']}
        style={{marginBottom: 20}}
      />

      {/* Confirm Button */}
      {/* <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Continue</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#000',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 16,
    color: '#000'
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeButton: {
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
    marginVertical: 5,
  },
  selectedTimeButton: {
    backgroundColor: '#4CAF50',
  },
  timeText: {
    fontSize: 16,
    color: '#000'
  },
  selectedTimeText: {
    color: '#FFF',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppointmentScreen;
