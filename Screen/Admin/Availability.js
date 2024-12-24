import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Availability = ({navigation}) => {
  const [availability, setAvailability] = useState({
    Monday: {active: true, hours: [{start: '08:00 AM', end: '02:00 PM'}]},
    Tuesday: {active: false, hours: []},
    Wednesday: {
      active: true,
      hours: [
        {start: '11:00 AM', end: '02:00 PM'},
        {start: '07:00 PM', end: '11:00 PM'},
      ],
    },
    Thursday: {active: false, hours: []},
    Friday: {active: true, hours: [{start: '04:00 PM', end: '08:00 PM'}]},
    Saturday: {active: false, hours: []},
    Sunday: {active: false, hours: []},
  });

  const [isPickerVisible, setPickerVisible] = useState({
    day: null,
    index: null,
    field: null,
    show: false,
  });

  const toggleDay = day => {
    setAvailability(prev => ({
      ...prev,
      [day]: {...prev[day], active: !prev[day].active, hours: []},
    }));
  };

  const addHour = day => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        hours: [...prev[day].hours, {start: '', end: ''}],
      },
    }));
  };

  const updateHour = (day, index, field, value) => {
    setAvailability(prev => {
      const updatedHours = [...prev[day].hours];
      updatedHours[index] = {...updatedHours[index], [field]: value};
      return {...prev, [day]: {...prev[day], hours: updatedHours}};
    });
  };

  const showPicker = (day, index, field) => {
    setPickerVisible({day, index, field, show: true});
  };

  const onPickerChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setPickerVisible({day: null, index: null, field: null, show: false});
      return;
    }

    const formattedTime = formatTime(selectedDate);
    const {day, index, field} = isPickerVisible;

    if (day !== null && index !== null && field !== null) {
      updateHour(day, index, field, formattedTime);
    }

    setPickerVisible({day: null, index: null, field: null, show: false});
  };

  const formatTime = date => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const renderDay = (day, data) => (
    <View key={day} style={styles.dayContainer}>
      <View style={styles.dayHeader}>
        <Text style={styles.dayTitle}>{day}</Text>
        <Switch
          value={data.active}
          onValueChange={() => toggleDay(day)}
          trackColor={{false: '#D1D5DB', true: '#10B981'}}
          thumbColor={data.active ? '#fff' : '#9CA3AF'}
        />
      </View>
      {data.active &&
        data.hours.map((hour, index) => (
          <View key={index} style={styles.hourContainer}>
            <TouchableOpacity
              style={styles.timeInput}
              onPress={() => showPicker(day, index, 'start')}>
              <Text style={styles.timeText}>
                {hour.start || 'Select Start Time'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.toText}>to</Text>
            <TouchableOpacity
              style={styles.timeInput}
              onPress={() => showPicker(day, index, 'end')}>
              <Text style={styles.timeText}>
                {hour.end || 'Select End Time'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      {data.active && (
        <TouchableOpacity onPress={() => addHour(day)}>
          <Text style={styles.addHourText}>+ Add More Hours</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Availability</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.activeButton]}>
          <Text style={styles.buttonText}>Specific Hours</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: '#E5E7EB'}]}>
          <Text style={styles.buttonTextInactive}>Always Available</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Add hours of your availability:</Text>
      {Object.keys(availability).map(day => renderDay(day, availability[day]))}
      {isPickerVisible.show && (
        <DateTimePicker
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          value={new Date()}
          onChange={onPickerChange}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#111827',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 8,
    backgroundColor: '#F9FAFB',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#10B981',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonTextInactive: {
    color: '#6B7280',
  },
  subtitle: {
    color: '#6B7280',
    marginBottom: 16,
    fontSize: 16,
  },
  dayContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  hourContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  timeText: {
    color: '#000',
    fontSize: 16,
  },
  toText: {
    marginHorizontal: 8,
    color: '#6B7280',
  },
  addHourText: {
    color: '#10B981',
    marginTop: 8,
    fontWeight: '500',
  },
});

export default Availability;
