import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // You can use other icons too

const StatsCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>4.8</Text>
        <Text style={styles.statLabel}>Rating</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>8 yrs+</Text>
        <Text style={styles.statLabel}>Experience</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>120+</Text>
        <Text style={styles.statLabel}>Patient</Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="bookmark" size={24} color="#4A90E2" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white', // Light background
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation:4,
    marginVertical:15,
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  iconContainer: {
    backgroundColor: '#E8F0FE',
    padding: 10,
    borderRadius: 10,
  },
});

export default StatsCard;
