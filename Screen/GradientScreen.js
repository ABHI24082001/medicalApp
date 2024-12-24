import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Example icon library, change if needed

const GradientScreen = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#CDA6FF', '#2663FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <View style={styles.cardContainer}>
          {/* Search Bar */}
          <Text style={styles.heading}>How do you feel today?</Text>
          <View style={styles.searchBar}>
            <Icon name="search" size={20} color="#fff" />
            <TextInput
              placeholder="Search doctor or clinic..."
              placeholderTextColor="#fff"
              style={styles.searchInput}
            />
          </View>

          {/* Icon Buttons */}
          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconButton}>
              <Icon style={styles.icon} name="medical-services" size={25} color="#fff" />
              <Text style={styles.iconText}>Consultation</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Icon style={styles.icon} name="local-hospital" size={25} color="#fff" />
              <Text style={styles.iconText}>Hospital</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Icon style={styles.icon} name="assignment" size={25} color="#fff" />
              <Text style={styles.iconText}>Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Icon style={styles.icon} name="receipt" size={25} color="#fff" />
              <Text style={styles.iconText}>Recipe</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height:200
  },
  gradientBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    width:'100%',
    marginLeft:'auto',
    marginRight:'auto',
    height:200
  },
  cardContainer: {
    width: '100%',
    height:100
  },
  heading: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    marginTop:-40,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 20,
    height:50
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    marginLeft: 10,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    
    padding:5,
    borderRadius:10,
width:70
  },
  icon:{
    backgroundColor:'rgba(255, 255, 255, 0.1)',padding:10,borderRadius:10,
    
  },
  iconText: {
    color: '#fff',
    fontSize: 10,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default GradientScreen;
