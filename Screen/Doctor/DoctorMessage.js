import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const App = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://plus.unsplash.com/premium_photo-1681996359725-06262b082c27?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Chat</Text>
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>1 New</Text>
        </View>
      </View>
      <View style={styles.messageLeft}>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Outdoors-man-portrait_%28cropped%29.jpg',
          }}
          style={styles.profileImage}
        />
        <View style={styles.messageBubble}>
          <Text style={styles.messageText}>Medicine Order</Text>
        </View>
      </View>
      <View style={styles.messageRight}>
        <View style={styles.messageBubble}>
          <Text style={styles.messageText}>Have with issue Other issue..</Text>
        </View>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1576669801775-ff43c5ab079d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.footer}>
        <AntDesign name="message1" size={24} color="#25D366" />
        <TextInput
          placeholder="Send Message..."
          style={styles.input}
          placeholderTextColor={'#000'}
        />
        <TouchableOpacity onPress={() => console.log('Message sent!')}>
          <Icon name="paper-plane" size={24} color="#25D366" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  newBadge: {
    backgroundColor: '#4A4A4A',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  messageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 80,
    marginLeft: 16,
  },
  messageRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginRight: 16,
    alignSelf: 'flex-end',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  messageBubble: {
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 8,
    marginRight: 8,
  },
  messageText: {
    color: '#4A4A4A',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  input: {
    flex: 1,
    marginHorizontal: 16,
    padding: 8,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 20,
    color: '#000',
  },
});

export default App;
