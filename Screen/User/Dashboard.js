import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImageCarousel from '../component/ImageCarousel';

const Dashboard = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCenters, setFilteredCenters] = useState(medicalCenters);

  const handleSearch = text => {
    setSearchQuery(text);
    if (text) {
      const filtered = medicalCenters.filter(center =>
        center.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredCenters(filtered);
    } else {
      setFilteredCenters(medicalCenters);
    }
  };

  const renderMedicalCenters = () => {
    return filteredCenters.map((center, index) => (
      <View key={index} style={styles.medicalCenter}>
        <Image source={{uri: center.image}} style={styles.medicalCenterImage} />
        <Text style={styles.medicalCenterText}>{center.name}</Text>
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        backgroundColor="#00731f"
        barStyle="light-content"
        translucent={false}
      />
      {/* Header */}
      <View style={styles.header}>
        <View>
          <View style={styles.locationContainer}>
            <Text style={styles.location}>Heal in India</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Icon name="bell" size={20} color="#808080" />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Hospital , Doctor , Treatment..."
          placeholderTextColor="#808080"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Icon
          name="search"
          size={20}
          color="#808080"
          style={styles.searchIcon}
        />
      </View>

      {/* Conditional Rendering */}
      {searchQuery ? (
        // Display filtered medical centers in a vertical scroll view
        <ScrollView style={styles.filteredContainer}>
          {renderMedicalCenters()}
        </ScrollView>
      ) : (
        <>
          {/* Image Carousel */}
          <ImageCarousel />

          {/* Categories Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllDoctor')}>
              <Text style={styles.sectionLink}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoriesContainer}>
            {categories.map((category, index) => (
              <View key={index} style={styles.category}>
                <View
                  style={[
                    styles.categoryIconContainer,
                    {backgroundColor: category.bgColor},
                  ]}>
                  <Icon
                    name={category.icon}
                    size={30}
                    color={category.iconColor}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AllDoctor')}>
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Medical Centers Section */}
          {/* Medical Centers Section */}
          <View style={styles.sectionHeader}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AllHospital')}>
              <Text style={styles.sectionTitle}>All Medical Centers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('AllHospital')}>
              <Text style={styles.sectionLink}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.medicalCentersContainer}>
            {medicalCenters.map((center, index) => (
              <View key={index} style={styles.medicalCenterCard}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AllHospital')}>
                  <Image
                    source={{uri: center.image}}
                    style={styles.medicalCenterImage}
                  />
                </TouchableOpacity>
                <View style={styles.medicalCenterDetails}>
                  <Text style={styles.medicalCenterName}>{center.name}</Text>
                  <Text style={styles.medicalCenterLocation}>
                    <Icon name="map-marker-alt" size={14} color="#808080" /> New
                    York, USA
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </ScrollView>
  );
};

const categories = [
  {name: 'Dentistry', icon: 'tooth', bgColor: '#FFCCCC', iconColor: '#FF0000'},
  {
    name: 'Cardiology',
    icon: 'heartbeat',
    bgColor: '#CCFFCC',
    iconColor: '#00FF00',
  },
  {
    name: 'Oncology',
    icon: 'bacteria',
    bgColor: '#FFCC99',
    iconColor: '#FF6600',
  },
  {
    name: 'General',
    icon: 'stethoscope',
    bgColor: '#CCCCFF',
    iconColor: '#6600CC',
  },
  {name: 'Neurology', icon: 'brain', bgColor: '#CCFFFF', iconColor: '#00CCCC'},
  {
    name: 'Gynecology',
    icon: 'baby',
    bgColor: '#CCCCFF',
    iconColor: '#6600CC',
  },
  {name: 'Laboratory', icon: 'vial', bgColor: '#FFCCFF', iconColor: '#FF00FF'},
  {
    name: 'Vaccination',
    icon: 'syringe',
    bgColor: '#99CCFF',
    iconColor: '#0066FF',
  },
];

const medicalCenters = [
  {
    name: 'Sunrise Health Clinic',
    image:
      'https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    name: 'Golden Cardiology',
    image:
      'https://plus.unsplash.com/premium_photo-1682130157004-057c137d96d5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    name: 'Healing Hands',
    image:
      'https://plus.unsplash.com/premium_photo-1682130157004-057c137d96d5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00BFA6',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  searchInput: {
    width: '100%',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    color: '#808080',
  },
  searchIcon: {
    position: 'absolute',
    top: 14,
    right: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6b6b6b',
  },
  sectionLink: {
    color: '#000',
    fontWeight: '600',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  category: {
    alignItems: 'center',
    width: '22%',
    marginBottom: 20,
  },
  categoryIconContainer: {
    padding: 20,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 12,
    color: '#424242',
    fontWeight: '800',
    textAlign: 'center',
    maxWidth: '90%', // Adjust the maximum width to avoid overflow
    alignSelf: 'center',
    overflow: 'hidden', // Ensure text stays within bounds
  },
  medicalCentersContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  medicalCenterCard: {
    marginBottom: 20,
    width: 200,
    marginLeft: 1,
    marginRight: 18,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  medicalCenterImage: {
    width: '100%',
    height: 120,
  },
  medicalCenterDetails: {
    padding: 8,
  },
  medicalCenterName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  medicalCenterLocation: {
    fontSize: 12,
    color: '#808080',
  },
  filteredContainer: {
    marginTop: 16,
  },
});

export default Dashboard;
