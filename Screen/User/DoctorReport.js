import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
  Share,
} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  useShadowColorFromDataset: false,
};

// Sample data
const data1 = [
  {name: 'Upcoming', population: 40, color: '#FF6F61'},
  {name: 'Cancel', population: 30, color: '#000'},
  {name: 'Complete', population: 30, color: '#6A5ACD'},
];

const data2 = [
  {name: 'Weekly', population: 20, color: '#2E8B57'},
  {name: 'Monthly', population: 50, color: '#B0C4DE'},
  {name: 'Annually', population: 30, color: '#FFA500'},
];

const data3 = [
  {name: 'In Progress', population: 35, color: '#32CD32'},
  {name: 'Delayed', population: 40, color: '#FFD700'},
  {name: 'Completed', population: 25, color: '#FF6347'},
];

const AllDoctorReport = ({navigation}) => {
  const [chartData, setChartData] = useState(data1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChangeData = value => {
    if (value === 'data1') setChartData(data1);
    else if (value === 'data2') setChartData(data2);
    else if (value === 'data3') setChartData(data3);
  };

  const handleDownloadReport = () => {
    setIsModalVisible(true);
  };

  const handleConfirmDownload = () => {
    setIsModalVisible(false);
    alert('Report Downloaded!');
  };

  const handleCancelDownload = () => {
    setIsModalVisible(false);
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this report overview!',
        url: 'https://www.example.com',
      });

      if (result.action === Share.sharedAction) {
        console.log('Report shared successfully');
      } else {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing the report:', error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#71bd85', '#007a21']}
        start={{x: 1, y: 1}}
        end={{x: 1, y: 0}}
        style={styles.gradientContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.adminText}> Doctor Reports </Text>
      </LinearGradient>
      {/* 
      <Dropdown
        style={[styles.dropdown, {borderColor: '#000'}]} // Ensures border color is black
        placeholder="Select Report"
        data={[
          {label: 'All Bookings', value: 'data1'},
          {label: 'Appointment Bookings', value: 'data2'},
          {label: 'Progress Status', value: 'data3'},
        ]}
        placeholderStyle={[styles.dropdownText, {color: '#000'}]} // Placeholder text color is black
        selectedTextStyle={[styles.dropdownText, {color: '#000'}]}
        itemTextStyle={[styles.dropdownText, {color: '#000'}]}
        value="data1"
        onChange={item => handleChangeData(item.value)}
      /> */}

      <Dropdown
        style={styles.dropdown}
        placeholder="All Report"
        data={[
          {label: 'All Bookings', value: 'data1'},
          {label: 'Appointment Bookings', value: 'data2'},
          {label: 'Progress Status', value: 'data3'},
        ]}
        placeholderStyle={styles.dropdownText}
        selectedTextStyle={styles.dropdownText}
        itemTextStyle={styles.dropdownText}
        labelField="label"
        valueField="value"
        value="data1"
        onChange={item => handleChangeData(item.value)}
      />
      <ScrollView style={styles.chartSection}>
        <ChartWithActions title="Appointment Overview" data={chartData} />
      </ScrollView>

      <TouchableOpacity
        style={styles.downloadButton}
        onPress={handleDownloadReport}>
        <Text style={styles.downloadButtonText}>Download Report</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCancelDownload}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Download Report</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to download the report?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleCancelDownload}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleConfirmDownload}>
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ChartWithActions = ({title, data}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDownloadReport = () => {
    setIsModalVisible(true);
  };

  const handleConfirmDownload = () => {
    setIsModalVisible(false); // Close modal and proceed with download logic
    alert('Report Downloaded!');
    // Implement actual download logic here
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this report overview!',
        url: 'https://healinindia.gov.in/',
      });

      if (result.action === Share.sharedAction) {
        console.log('Report shared successfully');
      }
    } catch (error) {
      console.error('Error sharing the report:', error);
    }
  };

  const handleCancelDownload = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      <PieChart
        data={data}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="10"
        center={[10, 10]}
        absolute
      />
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleDownloadReport}>
          <MaterialIcons name="download" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <MaterialIcons name="share" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCancelDownload}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Download Report</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to download the report?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleCancelDownload}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleConfirmDownload}>
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  gradientContainer: {
    paddingBottom: 40,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 13,
    alignItems: 'center',
  },
  locationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  adminText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginTop: 20,
    marginLeft: 20,
  },
  dropdown: {
    margin: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#00450f',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  dropdownText: {
    color: '#000',
    fontSize: 16,
  },
  chartSection: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    padding: 10,
    backgroundColor: '#029622',
    borderRadius: 8,
  },
  downloadButton: {
    margin: 20,
    paddingVertical: 14,
    backgroundColor: '#02c42c',
    borderRadius: 8,
    alignItems: 'center',
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#029622',
    borderRadius: 8,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AllDoctorReport;
