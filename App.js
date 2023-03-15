import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
//import Header from '../../src/components/header';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './login1.js';
import Header from './header';
import HeaderLogged from './headerLogged';
import TeacherList from './teacherList';
import DetailTutor from './detailTutor.js';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Header headerText={''}/> */}
      <HeaderLogged/>
      <ScrollView>
        <TeacherList/>
        {/* <Login/> */}
        {/* <DetailTutor/> */}
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
