import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';

const ChooseTime = (props) => {
    
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  
    const handleDateChange = (event, date) => {
      if (Platform.OS === 'android') {
        setDatePickerVisibility(false);
      }
      if (date) {
      }
    };
  
    const handlePress = () => {
      setDatePickerVisibility(true);
    };
    const handleCancel= () => {
      setDatePickerVisibility(false);
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Start time"
            value={startTime}
            style={styles.input}
            onChange={setStartTime}
          />
          <Text style={{marginRight:10}}>{"-->"}</Text>
          <TextInput
            placeholder="End time"
            value={endTime}
            style={styles.input}
            onChange={setEndTime}
          />
        </View>
        
        
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop:5
  },
  icon: {
    marginLeft: 10,
    marginRight: 20,
  },
  inputGroup:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 40,
    width: "60%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 20,
    paddingLeft: 8,
    color: "gray",
  },
  input: {
    height: 40,
    width: "50%",
    paddingLeft:8,
    color: "gray",
  },
});

export default ChooseTime;
