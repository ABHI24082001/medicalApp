import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  Button,
  ScrollView,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const UserModal = ({
  visible,
  onClose,
  onSave,
  userToEdit = null,
  defaultImage,
  roleOptions,
  genderOptions,
}) => {
  const [user, setUser] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    location: '',
    role: '',
    status: 'Inactive',
  });

  const [isActivated, setIsActivated] = useState(false);

  // Populate user data if editing
  useEffect(() => {
    if (userToEdit) {
      setUser({ ...userToEdit });
      setIsActivated(userToEdit.status === 'Active');
    } else {
      resetForm();
    }
  }, [userToEdit]);

  const resetForm = () => {
    setUser({
      name: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      location: '',
      role: '',
      status: 'Inactive',
    });
    setIsActivated(false);
  };

  const toggleSwitch = () => {
    setIsActivated(!isActivated);
    setUser({ ...user, status: !isActivated ? 'Active' : 'Inactive' });
  };

  const handleSave = () => {
    // Validation checks
    if (!user.name.trim()) {
      alert('Name is required!');
      return;
    }
    if (!user.age || isNaN(user.age) || parseInt(user.age) <= 0) {
      alert('Enter a valid age!');
      return;
    }
    if (!user.gender) {
      alert('Gender is required!');
      return;
    }
    if (!user.email.includes('@')) {
      alert('Enter a valid email address!');
      return;
    }
    if (!user.phone || user.phone.length !== 10) {
      alert('Enter a valid 10-digit phone number!');
      return;
    }
    if (!user.location.trim()) {
      alert('Location is required!');
      return;
    }
    if (!user.role) {
      alert('Role is required!');
      return;
    }

    onSave({ ...user, image: user.image || defaultImage });
    onClose();
  };

  return (
    visible && (
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.modalTitle}>{userToEdit ? 'Edit User' : 'Add User'}</Text>
          <Button title="Close" onPress={onClose} />
        </View>
        <ScrollView>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              value={user.name}
              onChangeText={(text) => setUser({ ...user, name: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Age"
              keyboardType="number-pad"
              value={user.age.toString()}
              onChangeText={(text) => setUser({ ...user, age: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Phone Number"
              keyboardType="phone-pad"
              value={user.phone}
              onChangeText={(text) => setUser({ ...user, phone: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Email Address"
              keyboardType="email-address"
              value={user.email}
              onChangeText={(text) => setUser({ ...user, email: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Location"
              value={user.location}
              onChangeText={(text) => setUser({ ...user, location: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <Dropdown
              style={styles.dropdown}
              data={genderOptions}
              labelField="label"
              valueField="value"
              placeholder="Select Gender"
              value={user.gender}
              onChange={(item) => setUser({ ...user, gender: item.value })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Role</Text>
            <Dropdown
              style={styles.dropdown}
              data={roleOptions}
              labelField="label"
              valueField="value"
              placeholder="Select Role"
              value={user.role}
              onChange={(item) => setUser({ ...user, role: item.value })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Status</Text>
            <Switch
              value={isActivated}
              onValueChange={toggleSwitch}
              trackColor={{ false: '#767577', true: '#4CAF50' }}
              thumbColor={isActivated ? '#FFFFFF' : '#f4f3f4'}
            />
          </View>

          <Button title="Save" onPress={handleSave} />
        </ScrollView>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
});

export default UserModal;
