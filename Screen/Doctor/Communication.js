import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Communication = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Accepted');

  const acceptedData = [
    {
      id: '1',
      name: 'Esmeralda Nevy',
      status: 'Accepted',
      date: '17 November 2023',
      type: 'video-camera',
      avatar:
        'https://img.freepik.com/free-photo/medium-shot-smiley-man-posing_23-2149915905.jpg',
    },
    {
      id: '2',
      name: 'Esmeralda Nevy',
      status: 'Accepted',
      date: '17 November 2023',
      type: 'video-camera',
      avatar:
        'https://img.freepik.com/free-photo/medium-shot-smiley-man-posing_23-2149915905.jpg',
    },
    {
      id: '3',
      name: 'Esmeralda Nevy',
      status: 'Accepted',
      date: '17 November 2023',
      type: 'video-camera',
      avatar:
        'https://img.freepik.com/free-photo/medium-shot-smiley-man-posing_23-2149915905.jpg',
    },
  ];

  const cancelledData = [
    {
      id: '2',
      name: 'John Doe',
      status: 'Cancelled',
      date: '15 November 2023',
      type: 'phone',
      avatar:
        'https://img.freepik.com/free-photo/medium-shot-smiley-man-posing_23-2149915905.jpg',
    },
    {
      id: '1',
      name: 'John Doe',
      status: 'Cancelled',
      date: '15 November 2023',
      type: 'phone',
      avatar:
        'https://img.freepik.com/free-photo/medium-shot-smiley-man-posing_23-2149915905.jpg',
    },
    {
      id: '3',
      name: 'John Doe',
      status: 'Cancelled',
      date: '15 November 2023',
      type: 'phone',
      avatar:
        'https://img.freepik.com/free-photo/medium-shot-smiley-man-posing_23-2149915905.jpg',
    },
  ];

  const renderCard = ({item}) => (
    <View style={styles.card}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <Image source={{uri: item.avatar}} style={styles.avatar} />
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <View style={styles.statusContainer}>
            <Text
              style={
                item.status === 'Accepted'
                  ? styles.statusAccepted
                  : styles.statusCancelled
              }>
              {item.status}
            </Text>
            <Icon
              name={item.type}
              size={20}
              color="#ccc"
              style={styles.typeIcon}
            />
          </View>
          <View style={styles.dateContainer}>
            <Icon name="calendar" size={16} color="#ccc" />
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        </View>
      </View>

      {/* Card Actions */}
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        {/* Show Reschedule Button Only for Accepted Appointments */}
        {item.status === 'Accepted' && (
          <TouchableOpacity style={styles.rescheduleButton}>
            <Text style={styles.rescheduleButtonText}>Reschedule</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerLeft}>
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Communication</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('Accepted')}
          style={styles.tab}>
          <Text
            style={
              activeTab === 'Accepted' ? styles.activeTab : styles.inactiveTab
            }>
            Accepted
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('Cancelled')}
          style={styles.tab}>
          <Text
            style={
              activeTab === 'Cancelled' ? styles.activeTab : styles.inactiveTab
            }>
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>

      {/* FlatList */}
      <View style={styles.content}>
        {activeTab === 'Accepted' ? (
          <FlatList
            data={acceptedData}
            keyExtractor={item => item.id}
            renderItem={renderCard}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No accepted appointments.</Text>
            }
          />
        ) : (
          <FlatList
            data={cancelledData}
            keyExtractor={item => item.id}
            renderItem={renderCard}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No cancelled appointments.</Text>
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerLeft: {width: 40, alignItems: 'flex-start'},
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  headerRight: {width: 40},
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    marginHorizontal: 15,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    fontSize: 16,
    color: '#32CD32',
    fontWeight: 'bold',
    borderBottomWidth: 3,
    borderBottomColor: '#32CD32',
  },
  inactiveTab: {
    fontSize: 16,
    color: '#666',
  },

  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 3},
    elevation: 3,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 2,
    borderColor: '#2ecc71',
    borderRadius: 8,
    borderStyle: 'dashed', // Dashed border style
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  cardInfo: {
    marginLeft: 16,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusAccepted: {
    backgroundColor: '#d4edda',
    color: '#155724',
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusCancelled: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  typeIcon: {
    marginLeft: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  dateText: {
    color: '#555',
    marginLeft: 4,
    fontSize: 14,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    borderColor: '#ff4d4d',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cancelButtonText: {
    color: '#ff4d4d',
    fontWeight: 'bold',
  },
  rescheduleButton: {
    backgroundColor: '#32CD32',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  rescheduleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
    fontSize: 16,
  },
});

export default Communication;
