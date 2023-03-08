import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Your login logic goes here
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.banner}> */}
        <Image
          style={styles.avt}
          source={require('./assets/banner.png')}>
        </Image>
      {/* </View> */}
      <Text style={styles.heading}>Say hello to your English tutors</Text>
      <Text style={styles.title}>Become fluent faster through one on one video chat lessons tailored to your goals.</Text>
      
      <Text style={styles.labelInput}>EMAIL</Text>
      <TextInput
        style={styles.input}
        label="Email"
        placeholder="mail@example.com"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.labelInput}>PASSWORD</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Text style={styles.forgotPass}>
        Forgot Password?
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.continue}>
        Or continue with
      </Text>

      <View style={styles.boxIcon}>      
        <Image 
          style={styles.icon}
          source={require('./assets/iconFb.png')}>
        </Image>              
        <Image 
          style={styles.icon}
          source={require('./assets/iconGg.png')}>
        </Image>
 
        <Image 
          style={styles.icon}
          source={require('./assets/iconPhone.png')}>
        </Image>
   
      </View>
      <Text>
        Not a member yet? Sign up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  avt:{
    // resizeMode: 'center',
    // height: 100,
    width: 400,
    height: 400,
    marginVertical: 50,
    // //height: 500,
    // alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#0077FF',
    // alignSelf: 'center',
  },
  title:{
    // alignSelf: 'center',
    width: '100%',
    marginBottom: 15,
  },
  labelInput:{
    alignSelf: 'flex-start',
    color: 'gray',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    paddingLeft: 8,
  },
  forgotPass:{
    fontSize: 20,
    alignSelf: 'flex-start',
    color: 'blue',
  },
  button: {
    backgroundColor: '#0077FF',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 15,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  continue:{
    marginVertical: 30,
  },
  boxIcon:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: 'yellow',
  },
  // boxIcon2:{
  //   height: 100,
  // },
  icon: {
    width: 30,
    // borderWidth: 2,
    // borderColor:'#0077FF',
    marginHorizontal: 10,
    resizeMode: 'contain',
    borderRadius: 50,
    marginBottom: 30,
  }
});

export default Login;