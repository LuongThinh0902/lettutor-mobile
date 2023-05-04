import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator
} from "react-native";
import Header from "../components/header";
import { useEffect } from "react";
import User from "../api/user.js";
import { useDispatch, useSelector } from "react-redux";

const Login = ({ navigation }) => {

  const [username, setUsername] = useState("student@lettutor.com");
  const [password, setPassword] = useState("123456");
  const [msg,setMsg] = useState("");
  const [loading,setLoading] = useState(false);


  const dispatch = useDispatch();
  useEffect(()=>{
  },[])
  const login= async() => {

    if( username== "")
    {
      setMsg("Tài khoản không hợp lệ")
      setTimeout(() => setMsg(""), 3000);
    }
    else if( password == "")
    {
      setMsg("Mật khẩu không hợp lệ")
      setTimeout(() => setMsg(""), 3000);
    }
    else
    {
        setLoading(true)
        let res = await User.login(username,password);
        setLoading(false)
        console.log("login",login)
        if(res.statusCode != 400)
        {
          await dispatch.user.login(res.user);
          navigation.navigate("teacherList");
        }
        else
        {
          setMsg(res.message)
          setTimeout(() => setMsg(""), 3000);
        }
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      {loading?
      <View style={{flex:1,justifyContent:'center'}}>
          <ActivityIndicator animating size="large" color="#52c41a"/>
      </View>
      :
      <ScrollView style={styles.mainView}>

        <Image
          style={styles.banner}
          source={require("../../assets/banner.png")}
        ></Image>

        <Text style={styles.heading}>Say hello to your English tutors</Text>
        <Text style={styles.title}>
          Become fluent faster through one on one video chat lessons tailored to
          your goals.
        </Text>

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
       {msg?
        <View style={styles.errorContainer}>
                <Text style={styles.error}>{msg ?? " " }</Text>
        </View>
        :
        <></>}
        <TouchableOpacity
          onPress={() => navigation.navigate("forgotPassword")}
        >
            <Text style={styles.forgotPass}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={login}
        >
            <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <Text style={styles.text}>Or continue with</Text>

        <View style={styles.boxIcon}>
          <Image
            style={styles.icon}
            source={require("../../assets/iconFb.png")}
          ></Image>
          <Image
            style={styles.icon}
            source={require("../../assets/iconGg.png")}
          ></Image>
          <Image
            style={styles.icon}
            source={require("../../assets/iconPhone.png")}
          ></Image>
        </View>
        <View style={{flexDirection:'row',justifyContent:"center"}}>
            <Text style={styles.text}>Not a member yet? </Text>
            <TouchableOpacity onPress={()=>navigation.navigate("signUp")} ><Text style={{color:"blue"}}>Sign up</Text></TouchableOpacity>
        </View>
      </ScrollView>
      }
    </View>
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
    borderRadius: 4,
    marginTop: 15,
    width: "100%",
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
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
});

export default Login;
