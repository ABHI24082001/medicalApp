import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Dimensions } from 'react-native';
import { primarycolor } from './utils';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SwipeButton = ({ onSwipeSuccess }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        // Prevent swiping past the right boundary
        if (gestureState.dx > 0 && gestureState.dx <= SCREEN_WIDTH * 0.6) {
          Animated.event([null, { dx: pan.x }], { useNativeDriver: false })(e, gestureState);
        }
      },
      onPanResponderRelease: (e, { dx }) => {
        // If swipe distance is enough, trigger success
        if (dx > SCREEN_WIDTH * 0.4) {
          Animated.spring(pan, {
            toValue: { x: SCREEN_WIDTH * 0.55, y: 0 },
            useNativeDriver: false,
          }).start(() => {
            onSwipeSuccess();
          });
        } else {
          // If not enough swipe, return to original position
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.swipeButtonContainer}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.circle, { transform: [{ translateX: pan.x }] }]}
        >
          <Text style={styles.arrowText}>{'>>'}</Text>
        </Animated.View>
        <Text style={styles.swipeText}>Book Now</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  swipeButtonContainer: {
    width: '100%',
    height: 50,
    backgroundColor: primarycolor,
    borderRadius: 30,
    justifyContent: 'center',
    position: 'relative',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 5,
    top: 5,
  },
  arrowText: {
    color: '#4A90E2',
    fontWeight: 'bold',
    fontSize: 18,
  },
  swipeText: {
    color: '#fff',
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight:20
  },
});

export default SwipeButton;
