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
import TeacherList from "./teacherList";
import Header from "./header";

const Tutor = () => {
  // onLayout = (event) => {
  //   const { height } = event.nativeEvent.layout;
  //   if (height > MAX_HEIGHT) {
  //     this.setState({ showMore: true });
  //   }
  // };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.mainView}>
        <View style={styles.info}>
          <View style={styles.topInfo}>
            <Image style={styles.avt} source={require("./assets/Baldo.jpg")} />
            <View style={styles.topRight}>
              <Text style={{ fontSize: 30 }}>April Baldo</Text>
              <View></View>
              <View></View>
            </View>
          </View>
          <Text
            // style={[styles.text, this.props.style]}
            // numberOfLines={showMore ? maxLine : 0}
            // ellipsizeMode="tail"
            // onLayout={(event) => this.onLayout(event)}
            style={{ color: "gray" }}
          >
            Hello! My name is April Baldo, you can just call me Teacher April. I
            am an English teacher and currently teaching in senior high school.
            I have been teaching grammar and literature for almost 10 years. I
            am fond of reading and teaching literature as one way of knowing
            one’s beliefs and culture. I am friendly and full of positivity. I
            love teaching because I know each student has something to bring on.
            Molding them to become an individual is a great success.
          </Text>
          <View style={styles.iconBox}>
            <Text>Favorite</Text>
            <Text>Report</Text>
            <Text>Reviews</Text>
          </View>
          <View style={styles.video}></View>
        </View>
        <Text style={styles.heading}>Languages</Text>
        <View style={styles.list}>
          <Text style={styles.languages}>English</Text>
          <Text style={styles.languages}>Japanese</Text>
        </View>

        <Text style={styles.heading}>Specialties</Text>
        <View style={styles.list}>
          <Text style={styles.languages}>English for Business</Text>
          <Text style={styles.languages}>IELTS</Text>
          <Text style={styles.languages}>PET</Text>
          <Text style={styles.languages}>KET</Text>
        </View>

        <Text style={styles.heading}>Interests</Text>
        <Text style={styles.content}>Fighting</Text>
        <Text style={styles.heading}>Teaching experience</Text>
        <Text style={styles.content}>7 years of English tutor</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: 'center',
    alignItems: "center",
  },
  mainView: {
    width: "90%",
    marginTop: 30,
  },
  info: {},
  topInfo: {
    flexDirection: "row",
    height: 100,
    marginBottom: 20,
  },
  topRight: {
    marginLeft: 20,
  },
  avt: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  iconBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 18,
    marginTop: 20,
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 15,
  },
  languages: {
    color: "blue",
    backgroundColor: "lightblue",
    borderRadius: 25,
    marginHorizontal: 10,
    padding: 10,
    marginVertical: 10,
    fontSize: 12,
  },
  content: {
    color: "gray",
  },
});

export default Tutor;
