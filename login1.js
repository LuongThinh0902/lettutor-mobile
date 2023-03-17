import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Header from "./header";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.mainView}>

        <Image
          style={styles.banner}
          source={require("./assets/banner.png")}
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
        <Text style={styles.forgotPass}>Forgot Password?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("teacherList");
          }}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <Text style={styles.text}>Or continue with</Text>

        <View style={styles.boxIcon}>
          <Image
            style={styles.icon}
            source={require("./assets/iconFb.png")}
          ></Image>
          <Image
            style={styles.icon}
            source={require("./assets/iconGg.png")}
          ></Image>
          <Image
            style={styles.icon}
            source={require("./assets/iconPhone.png")}
          ></Image>
        </View>
        <Text style={styles.text}>Not a member yet? Sign up</Text>
      </ScrollView>
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
});

export default Login;
