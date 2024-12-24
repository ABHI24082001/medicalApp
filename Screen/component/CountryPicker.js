import React, {useState, useMemo} from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  View,
  Pressable,
  Keyboard,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Countries from '../../constant';

const CountryPicker = ({visible, onClose, onSelect}) => {
  const [searchTxt, setSearchTxt] = useState('');

  //   console.log('Countries:', Countries); // Debug log

  // Filtered list of countries based on search text
  const searchResults = useMemo(() => {
    if (!Countries || Countries.length === 0) return [];
    if (!searchTxt) return Countries;
    const lowerSearch = searchTxt.toLowerCase();
    return Countries.filter(
      item =>
        item.name.toLowerCase().includes(lowerSearch) ||
        item.phone.toLowerCase().includes(lowerSearch),
    );
  }, [searchTxt]);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Pressable onPress={onClose} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#000" />
          </Pressable>
          <Text style={styles.heading}>Select Your Country</Text>
        </View>

        {/* Search Input */}
        <TextInput
          style={styles.input}
          placeholder="Search by country name"
          value={searchTxt}
          onChangeText={setSearchTxt}
          placeholderTextColor={'#000'}
        />

        {/* Country List */}
        <FlatList
          keyboardShouldPersistTaps="always"
          data={searchResults}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.flagWrapper}
              onPress={() => {
                Keyboard.dismiss();
                onSelect(item);
              }}>
                 <Text style={styles.PhoneName}>+{item.phone}</Text>
              <Image
                source={{
                  uri: `https://flagcdn.com/w40/${item.code.toLowerCase()}.png`,
                }}
                style={styles.flag}
              />
              <View style={styles.countryInfo}>
                <Text style={styles.countryName}>{item.name}</Text>
               
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.code}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#000',
  },
  PhoneName: {
    fontSize: 14,
    color: '#333',
    margin: 10,
    fontWeight: '800',
    fontFamily: 'System',
    lineHeight: 18,
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 16,
    color: '#000',
  },
  flagWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  flag: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  countryName: {
    fontSize: 16,
    color: '#333',
  },
});

export default CountryPicker;
