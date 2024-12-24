import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AdminManage = ({ route, navigation }) => {
  // Retrieve hospital data passed via navigation
  const { hospital } = route.params;

  // State variables for editable fields
  const [name, setName] = useState(hospital.name);
  const [address, setAddress] = useState(hospital.details.address);
  const [contact, setContact] = useState(hospital.contact);
  const [treatmentOffered, setTreatmentOffered] = useState(hospital.Treatment);
  const [remark, setRemark] = useState(hospital.Remark);

  // State to track edit mode
  const [isEditable, setIsEditable] = useState(false);

  // Handle save action
  const handleSave = () => {
    const updatedHospital = {
      ...hospital,
      name,
      details: {
        ...hospital.details,
        address,
      },
      contact,
      Treatment: treatmentOffered,
      Remark: remark,
    };

    console.log('Updated Hospital:', updatedHospital);
    alert('Hospital details updated successfully!');
    setIsEditable(false); // Disable editing after saving
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <AntDesign
          name="arrowleft"
          size={25}
          color="#6B7280"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>All Admin Manager</Text>
        <TouchableOpacity onPress={() => setIsEditable(!isEditable)}>
          <Text style={styles.editText}>{isEditable ? 'Cancel' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Form */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Editable Fields */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Hospital Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter hospital name"
            editable={isEditable} // Enable or disable input based on edit mode
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter address"
            editable={isEditable}
          />

          <Text style={styles.label}>Contact</Text>
          <TextInput
            style={styles.input}
            value={contact}
            onChangeText={setContact}
            keyboardType="phone-pad"
            placeholder="Enter contact details"
            editable={isEditable}
          />

          <Text style={styles.label}>Treatment Offered</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={treatmentOffered}
            onChangeText={setTreatmentOffered}
            placeholder="Enter treatments offered"
            multiline={true}
            numberOfLines={4}
            editable={isEditable}
          />

          <Text style={styles.label}>Remark</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={remark}
            onChangeText={setRemark}
            placeholder="Enter remark"
            multiline={true}
            numberOfLines={4}
            editable={isEditable}
          />
        </View>

        {/* Save Button */}
        {isEditable && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default AdminManage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  editText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3B82F6',
  },
  scrollContainer: {
    padding: 16,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F3F4F6',
    fontSize: 16,
    color: '#374151',
    marginBottom: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top', // Align text to the top for Android
  },
  saveButton: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
