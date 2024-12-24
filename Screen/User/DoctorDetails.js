import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const MountainDetailsScreen = ({navigation, route}) => {
  const {hospital} = route.params;

  const {name, details, distance, rating, reviews, imageUri, treatments} =
    hospital;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: imageUri,
            }}
            style={styles.image}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon name="arrow-left" size={20} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookmarkButton}>
            <Icon name="share" size={20} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.subtitle}>{details.address}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.activeTab}>Type</Text>
          <Text style={styles.Type}>{hospital?.type}</Text>
          <Text style={styles.activeTab}>Overview</Text>
          <Text style={styles.description}>
            {details?.diseasesEmpanelled?.general}
          </Text>

          <Text style={styles.activeTab}>Remark</Text>
          <Text style={styles.description}>{details?.remark}</Text>

          <Text style={styles.activeTab}>Contact Number</Text>
          <View style={styles.contactContainer}>
            {details.telephone.landlines && (
              <View style={styles.contactRow}>
                <Text style={styles.cardText}>
                  <Text style={styles.label}>Landline: </Text>
                  {details.telephone.landlines.join(', ')}
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.activeTab}>All Treatment</Text>
          <View style={styles.contactContainer}>
            {treatments.length > 0 && (
              <View style={styles.contactRow}>
                <Text style={styles.cardText}>
                  <Text style={styles.label}>Treatment: </Text>
                  {treatments.join(', ')}
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => navigation.navigate('AllDoctor')}>
            <Text style={styles.bookButtonText}>View All Doctor</Text>
            <Icon
              name="arrow-right"
              size={20}
              color="#fff"
              style={styles.bookButtonIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 400,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 50,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 50,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#e5e7eb',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#000',
    fontSize: 14,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    color: '#000',
    fontSize: 14,
  },
  price: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  activeTab: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  inactiveTab: {
    fontSize: 16,
    color: '#000',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 8,
    color: '#000',
  },
  description: {
    color: '#000',
    marginBottom: 16,
  },
  Type: {
    color: '#000',
    marginBottom: 16,
    fontSize: 20,
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bookButtonIcon: {
    marginLeft: 8,
  },
  contactContainer: {
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
  },
});

export default MountainDetailsScreen;
