import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const DetailTutor = () => {

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          style={styles.iconCourse}
          source={require("./assets/iconCourse.png")}
        />
        <View style={styles.rightIcon}>
          <Text style={styles.headingTop}>Discover Courses</Text>

          <View style={styles.searchBox}>
            <TextInput
              style={styles.searchInput}
              placeholder="Course"
              // value={password}
              // onChangeText={setPassword}
              // secureTextEntry={true}
            />
            <View style={styles.searchButtonBox}>
              <Image
                style={styles.searchButton}
                source={require("./assets/iconSearch.png")}
              />
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.description}>
        LiveTutor has built the most quality, methodical and scientific courses
        in the fields of life for those who are in need of improving their
        knowledge of the fields.
      </Text>
      {/* select*3  */}

      <View style={styles.middle}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
    marginHorizontal: 10,
    // width: '90%',
  },
  top: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  iconCourse: {
    width: 100,
    height: 100,
  },
  rightIcon: {
    marginLeft: 25,
    flexDirection: "column",
    justifyContent: "center",
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    height: 100,
  },
  searchInput: {
    height: 32,
    width: "100%",
    borderColor: "lightgray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
  },
  searchButton: {
    resizeMode: "contain",
    borderWidth: 1,
    borderLeftWidth: 0,
    padding: 15,
    borderColor: "lightgray",
  },
  headingTop: {
    fontSize: 28,
    fontWeight: "bold",
    flex: 1,
  },
  description: {
    alignSelf: "flex-start",
    marginVertical: 20,
  },
});

export default DetailTutor;
