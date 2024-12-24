import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import Animated, {
  withTiming,
  Easing,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const bubbleScale = useSharedValue(0);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! How can I help you today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'HealthBot',
          avatar: 'https://placeimg.com/140/140/tech', // You can replace this with a healthcare bot avatar
        },
      },
    ]);
  }, []);

  const onSend = (newMessages = []) => {
    setMessages(GiftedChat.append(messages, newMessages));
    setTyping(true);

    // Simulate bot typing after a delay
    setTimeout(() => {
      setTyping(false);
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [
          {
            _id: Math.random(),
            text: 'I am here to assist with healthcare-related queries.',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'HealthBot',
              avatar:
                'https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
          },
        ]),
      );

      // Animate the bubble scale to 1 after sending the message
      bubbleScale.value = withTiming(1, {duration: 300, easing: Easing.ease});
    }, 1000);
  };

  // Animated style for the bubble scale
  const animatedBubbleStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: bubbleScale.value}],
    };
  });

  return (
    <View style={{flex: 1}}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Back pressed')}>
          <Icon name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Healthcare Chatbot</Text>
      </View>

      {/* Chat Component */}
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1,
        }}
        renderBubble={props => {
          return (
            <Animated.View style={[animatedBubbleStyle]}>
              {props.currentMessage.user._id === 2 ? (
                <View style={styles.bubbleContainer}>
                  {/* <TouchableOpacity style={styles.avatar}>
                    <Icon name="arrow-back" size={30} color="#000" />
                  </TouchableOpacity> */}
                  <Text style={styles.bubble}>{props.currentMessage.text}</Text>
                </View>
              ) : (
                <Text style={styles.userBubble}>
                  {props.currentMessage.text}
                </Text>
              )}
            </Animated.View>
          );
        }}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>Bot is typing...</Text>
          </View>
        )}
        isTyping={typing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  bubbleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 20,
    paddingHorizontal: 15    
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  bubble: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 20,
    maxWidth: '80%',
    color: '#fff',
    fontSize: 16,
  },
  userBubble: {
    backgroundColor: 'lightblue',
    padding: 12,
    borderRadius: 20,
    maxWidth: '80%',
    marginBottom: 10,
    marginRight: 10,
    alignSelf: 'flex-end',
    color: '#000',
    fontSize: 16,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 18,
    color: '#4CAF50',
    marginTop: 10,
  },
});
