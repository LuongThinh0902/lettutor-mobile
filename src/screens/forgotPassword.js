import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Header from "../components/header";
import User from "../api/user.js";
import GestureRecognizer from 'react-native-swipe-gestures';
import Popup from "../components/popup";

const ForgotPassword = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [msg,setMsg] = useState("");
  const [success,setSuccess] = useState(false);

  const [loading,setLoading] = useState(false);
  const [showPopup,setShowPopup] = useState(false);


  const handleClick= async() => {

    let reg= "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"
    if( !email.match(reg))
    {
      setMsg("Địa chỉ email không hợp lệ")
      setTimeout(() => setMsg(""), 3000);
    }
    else
    {
        setLoading(true)
        let res = await User.forgotPassword({email: email});
        setLoading(false)
        if(res.statusCode == undefined || res.statusCode!= 400)
        {
          setSuccess(true)
          setMsg(res.message)
          setTimeout(() => navigation.navigate("login"), 1500);
        }
        else
        {
          setSuccess(false)
          setMsg(res.message)
          setTimeout(() => setMsg(""), 1500);
        }
    }
  }
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  return (
    <GestureRecognizer
        onSwipeLeft={() => navigation.navigate("login")}
        config={config}
        style={{flex:1}}
        >
      <View style={styles.container}>
          <Header />
          {loading?
          <View style={{flex:1,justifyContent:'center'}}>
                  <ActivityIndicator animating size="large" color="#52c41a"/>
          </View>
          : 
          <View style={styles.mainView}>
            <View style={{flex:1}}></View>
            <View style={{flex:4}}>
              <Text style={styles.heading}>Reset Password</Text>
              <Text style={styles.title}>
              Please enter your email address to search for your account.
              </Text>

              <Text style={styles.labelInput}>EMAIL</Text>
              <TextInput
                style={styles.input}
                label="email"
                value={email}
                onChangeText={setEmail}
              />

              <View style={{alignItems:"center"}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleClick}
                >
                  <Text style={styles.buttonText}>Send reset link</Text>
                </TouchableOpacity>
              </View>
              {msg?
              <View style={{alignItems:"center"}}>
                  <Text style={success?styles.success:styles.error}>{msg ?? " " }</Text>
              </View>
              :
              <></>}
            </View>
          </View>
          }
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mainView: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 30,
    flex:1
  },
  banner: {
    width: 350,
    height: 350,
    marginVertical: 50,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#0077FF",
    alignSelf: "center",
    textAlign: "center",
  },
  title: {
    alignSelf: "center",
    width: "100%",
    marginBottom: 15,
    fontSize: 20,
    textAlign: "center",
  },
  labelInput: {
    alignSelf: "flex-start",
    color: "gray",
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    paddingLeft: 8,
  },
  forgotPass: {
    fontSize: 20,
    alignSelf: "flex-start",
    color: "blue",
  },
  button: {
    backgroundColor: "#0077FF",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 15,
    width: "50%",
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
  },
  text: {
    alignSelf: "center",
  },
  boxIcon: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "center",
    marginTop: 30,
  },
  icon: {
    width: 30,
    marginHorizontal: 10,
    resizeMode: "contain",
    marginBottom: 30,
  },
  errorContainer:{
    marginTop: 20,
    borderColor: 'transparent' 
  },
  error: {
    color: "red",
    bottom: 6,
  },
  success: {
    color: "blue",
    bottom: 6,
  },
});

export default ForgotPassword;
