import React from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import DeleteAnimation from '../LottiView/Delete.json'; // Import the Lottie animation

const DeleteModal = ({showDelete, setShowDelete, handleDelete, isChanging}) => {
  return (
    <Modal
      visible={showDelete}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setShowDelete(false)}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <LottieView
            source={DeleteAnimation}
            autoPlay
            loop
            style={styles.lottieView}
          />
          <Text style={styles.title}>Are you sure?</Text>
          <Text style={styles.description}>You want to delete this item?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#4CAF50'}]}
              onPress={handleDelete}
              disabled={isChanging}>
              <Text style={styles.buttonText}>
                {isChanging ? 'Please wait...' : 'Delete'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#f44336'}]}
              onPress={() => setShowDelete(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    borderColor: '#125401',
    borderWidth: 2,
  },
  lottieView: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    width: '45%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default DeleteModal;
