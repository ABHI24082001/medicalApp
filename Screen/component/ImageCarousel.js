import React, { useRef, useEffect, useState } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const images = [
  { id: '1', uri: 'https://img.freepik.com/free-vector/flat-hospital-webinar-template_23-2149613072.jpg?t=st=1731564450~exp=1731568050~hmac=bc89612f7657551115996576aa95cf6c2f0e89cccddd2234b79aa7a2ae7c7222&w=1060' },
  { id: '2', uri: 'https://img.freepik.com/free-vector/gradient-hospital-template-design_23-2149642770.jpg?t=st=1731564535~exp=1731568135~hmac=ba1dada7ef4b72aaa12b9054cc982f7ecf375687e3cd8f23eae48360e9f85c70&w=996' },
  { id: '3', uri: 'https://img.freepik.com/free-vector/gradient-hospital-social-media-promo-template_23-2149612760.jpg?t=st=1731564579~exp=1731568179~hmac=c5db7661bdb775fafcf42ebba15f7e8658321270f64f8757e4527453d731b4f9&w=1060' },
];

const ImageCarousel = () => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play function
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      scrollViewRef.current.scrollTo({ x: SCREEN_WIDTH * nextIndex, animated: true });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
          setCurrentIndex(index);
        }}
      >
        {images.map((item) => (
          <Image key={item.id} source={{ uri: item.uri }} style={styles.image} />
        ))}
      </ScrollView>

      {/* Dot indicators */}
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex && styles.activeDot, // Active dot is black
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    alignItems: 'center',
    
  },
  image: {
    width: SCREEN_WIDTH,
    height: 200,
    resizeMode: 'cover',  
  },
  dotsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10, // Positioning the dots at the bottom of the carousel
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    margin: 5,
    borderRadius: 4, // To make the dot circular
    backgroundColor: '#fff', // Inactive dots are white
  },
  activeDot: {
    backgroundColor: '#000', // Active dot is black
  },
});

export default ImageCarousel;
