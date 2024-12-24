import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const notifications = [
  {
    id: '1',
    title: 'Appointment Success',
    description:
      'You have successfully booked your appointment with Dr. Emily Walker.',
    time: '1h',
    type: 'success',
    date: 'Today',
  },
  {
    id: '2',
    title: 'Appointment Cancelled',
    description:
      'You have successfully cancelled your appointment with Dr. David Patel.',
    time: '2h',
    type: 'cancelled',
    date: 'Today',
  },
  {
    id: '3',
    title: 'Scheduled Changed',
    description:
      'You have successfully changed your appointment with Dr. Jesica Turner.',
    time: '8h',
    type: 'changed',
    date: 'Today',
  },
  {
    id: '4',
    title: 'Appointment Success',
    description:
      'You have successfully booked your appointment with Dr. David Patel.',
    time: '1d',
    type: 'success',
    date: 'Yesterday',
  },
];

const AdminNotification = ({navigation}) => {
  const renderItem = ({item}) => {
    const iconData = {
      success: {name: 'calendar-check', color: '#4CAF50'},
      cancelled: {name: 'calendar-remove', color: '#F44336'},
      changed: {name: 'calendar-edit', color: '#FFC107'},
    };

    return (
      <View style={styles.notificationCard}>
        <View
          style={[
            styles.iconContainer,
            {backgroundColor: iconData[item.type].color + '20'},
          ]}>
          <Icon
            name={iconData[item.type].name}
            size={24}
            color={iconData[item.type].color}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <TouchableOpacity>
          <LinearGradient
            colors={['#4CAF50', '#66BB6A']}
            style={styles.newBadge}>
            <Text style={styles.newBadgeText}>New</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Notification List */}
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  markRead: {
    fontSize: 14,
    color: '#4CAF50',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#004707',
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  newBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  time: {
    fontSize: 12,
    color: '#999',
    marginLeft: 1,
  },
  newBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AdminNotification;
