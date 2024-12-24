import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {screenHeight, screenWidth} from './utils';
import GradientScreen from './GradientScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import HeartRateChart from './Chart';
import CustomHeartRateChart from './Chart';

const Home = ({ navigation }) => {
  return (
    <ScrollView>
      <ImageBackground
        source={require('../assests/bglog.jpg')}
        style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 0,
          }}>
          {/* Left Corner Icon */}
          <View style={styles.avatarPlaceholder}>
            <Icon name="user-circle" size={48} color="#8394A840" />
          </View>

          {/* Right Corner Icon */}
          <View>
            <Icon1 name="menu" size={30} color="#8394A840" />
          </View>
        </View>
        <View>
          <Text style={{color: '#949BA7', fontSize: 24}}>Hello,</Text>
          <Text style={{color: '#38435E', fontWeight: 'bold', fontSize: 28}}>
            Robert Andersion 👋
          </Text>
        </View>
        <GradientScreen />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 100,
            marginTop: 0,
            marginBottom: 0,
            gap: 10,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              elevation: 4,
              width: '48%',
              height: 80,
              padding: 10,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, color: '#38435E'}}>Blood Group</Text>
              <View
                style={{
                  backgroundColor: '#FF7070',
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon2 name="bloodtype" color="white" size={10} />
              </View>
            </View>
            <Text style={{fontSize: 35, color: '#38435E'}}>B+</Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              elevation: 4,
              width: '48%',
              height: 80,
              padding: 10,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, color: '#38435E'}}>Weight</Text>
              <View
                style={{
                  backgroundColor: '#64BE93',
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="weight" color="white" size={10} />
              </View>
            </View>
            <Text style={{fontSize: 35, color: '#38435E'}}>
              77<Text style={{fontSize: 16}}>Kg</Text>
            </Text>
          </View>
        </View>
        <CustomHeartRateChart />
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 10,
  },
  avatarPlaceholder: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 30,
    backgroundColor: '8394A840',
  },
});

export default Home;
