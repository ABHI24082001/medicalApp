import React from 'react';
import { Modal, TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const FilterModal = ({ visible, onClose, onFilter }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Sort Hospitals</Text>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => {
              onFilter('A-Z');
              onClose();
            }}
          >
            <Text style={styles.filterText}>A-Z</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => {
              onFilter('Z-A');
              onClose();
            }}
          >
            <Text style={styles.filterText}>Z-A</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => {
              onFilter('new');
              onClose();
            }}
          >
            <Text style={styles.filterText}>New</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => {
              onFilter('old');
              onClose();
            }}
          >
            <Text style={styles.filterText}>Old</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: '#10B981',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  filterText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#ff6347',
    fontSize: 16,
  },
});

export default FilterModal;
