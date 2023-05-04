import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import DateTimePicker from '@react-native-community/datetimepicker';

const ChooseDate = (props) => {
    const { date ,setDate} = props
    const [selectedDate, setSelectedDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  
    const handleDateChange = (event, date) => {
      if (Platform.OS === 'android') {
        setDatePickerVisibility(false);
      }
      if (date) {
        console.log(date)
        setSelectedDate(date);
        setDate(date)
      }
    };
  
    const handlePress = () => {
      setDatePickerVisibility(true);
    };
    const handleCancel= () => {
      setSelectedDate("")
      setDatePickerVisibility(false);
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Select a day"
            value={selectedDate ? selectedDate.toDateString() : ''}
            style={styles.input}
            editable={false}
          />
          <TouchableOpacity onPress={handlePress}>
              <Icon style={styles.icon} name="calendar" size={20} />
          </TouchableOpacity>
        </View>
        
        {isDatePickerVisible && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="spinner"
            onCancel={handleCancel}
            onChange={handleDateChange}
        />
        )}
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
    justifyContent: 'space-between',
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
    width: "60%",
    paddingLeft: 8,
    color: "gray",
  },
});

export default ChooseDate;
