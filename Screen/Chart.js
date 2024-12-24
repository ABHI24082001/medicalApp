// HeartRateChart.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome'
import {GiftedChat} from 'react-native-gifted-chat'

const HeartRateChart = () => {
  const [messages, setMessages] = useState([]);

  React.useEffect(() => {
    setMessages([
        {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        },
    ]);
}, []);

const onSend = (newMessages = []) => {
    setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages)
    );
};
  return (
    <View style={styles.cardContainer}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Heart Rate</Text>
        <View style={styles.icon}>
          <Icon name='heartbeat' style={{ fontSize: 22, color: '#FF7070' }}/>
        </View>
      </View>

      {/* Line Chart */}
      <LineChart
        data={{
          labels: ["1", "2", "3", "4"],
          datasets: [
            {
              data: [75, 80, 65, 90],
              color: (opacity = 1) => `rgba(34, 202, 236, ${opacity})`, // Blue line
            },
          ],
        }}
        width={Dimensions.get("window").width * 0.85} // chart width
        height={90}
        withDots={false} // Disable individual data point dots
        withInnerLines={false} // Disable grid lines
        withOuterLines={false} // Disable outer grid lines
        withShadow={false}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: () => `rgba(0, 0, 0, 0.5)`,
          strokeWidth: 2, // thickness of line
        }}
        style={styles.chartStyle}
      />

      {/* Heart Rate Value Section */}
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
      <View style={styles.heartRateContainer}>
        <Text style={styles.heartRateValue}>97</Text>
        <Text style={styles.bpmText}>bpm</Text>
      </View>

      {/* Last measured info */}
      <Text style={styles.lastMeasured}>Last measured: 2 hours ago</Text></View>

    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    marginTop:0,
    width: Dimensions.get('window').width *0.94,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    backgroundColor: '#FFEBEB',
    borderRadius: 50,
    padding: 5,
  },
  chartStyle: {
    marginVertical: 10,
  },
  heartRateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
  },
  heartRateValue: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
  },
  bpmText: {
    fontSize: 20,
    color: '#666',
    marginLeft: 5,
  },
  lastMeasured: {
    marginTop: 5,
    fontSize: 12,
    color: '#999',
  },
});

export default HeartRateChart;
