import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Header from "../components/header";
import { useEffect } from "react";
import User from "../api/user.js";
import { useDispatch, useSelector } from "react-redux";

const SignUp = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg,setMsg] = useState("");
  const [loading,setLoading] = useState(false);


  const dispatch = useDispatch();
  useEffect(()=>{
  },[])
  const signUp = async() => {

    let reg= "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"
    if( !email.match(reg))
    {
      setMsg("Địa chỉ email không hợp lệ")
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
        let data = {
            email:email,
            password:password,
            source:null
        }
        let res = await User.register(data);
        setLoading(false)
        if(res.statusCode != 400)
        {
            setMsg("Đăng ký thành công!")
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

        <Text style={styles.heading}>Start learning with LetTutor</Text>
        <Text style={styles.title}>
        Become fluent faster through one on one video chat lessons tailored to your goals.
        </Text>

        <Text style={styles.labelInput}>EMAIL</Text>
        <TextInput
          style={styles.input}
          label="Email"
          placeholder="mail@example.com"
          value={email}
          onChangeText={setEmail}
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
          style={styles.button}
          onPress={signUp}
        >
          <Text style={styles.buttonText}>SIGN UP</Text>
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
            <Text style={styles.text}>Already have an account? </Text>
            <TouchableOpacity onPress={()=>navigation.navigate("login")} ><Text style={{color:"blue"}}>Log in</Text></TouchableOpacity>
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

export default SignUp;
