import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
// import SelectList from 'react-native-dropdown-select-list';
import SelectDropdown from "react-native-select-dropdown";

const TeacherList = () => {
  const [selected, setSelected] = React.useState("");
  const listTutorNational = [
    { key: "1", value: "Foreign Tutor" },
    { key: "2", value: "Vietnamese Tutor" },
    { key: "3", value: "Native English Tutor" },
  ];
  const keywordText = [
    { key: 1, value: "All" },
    { key: 2, value: "English for kids" },
    { key: 3, value: "English for Business" },
    { key: 4, value: "Conversational" },
    { key: 5, value: "STARTERS" },
    { key: 6, value: "MOVERS" },
    { key: 7, value: "FLYERS" },
    { key: 8, value: "KET" },
    { key: 9, value: "PET" },
    { key: 10, value: "IELTS" },
    { key: 11, value: "TOEFL" },
    { key: 12, value: "TOEIC" },
  ];

  const tutorInfo = [
    {
      key: 1,
      name: "Keegan",
      nationality: "Viet Nam",
      rateQuality: 5,
      liked: true,
      skill: [
        keywordText[2].value,
        keywordText[3].value,
        keywordText[2].value,
        keywordText[9].value,
        keywordText[11].value,
      ],
      description:
        "I am passionate about running and fitness, I often compete in trail/mountain running events and I love pushing myself. I am training to one day take part in ultra-endurance events. I also enjoy watching rugby on the weekends, reading and watching podcasts on Youtube. My most memorable life experience would be living in and traveling around Southeast Asia.",
    },
    {
      key: 2,
      name: "Adelia Rice",
      img: null,
      nationality: null,
      rateQuality: null,
      liked: 0,
      skill: ["", "", "", "", ""],
      description: "Recusandae dignissimos ut commodi et iste qui eum quos.",
    },
    {
      key: 3,
      name: "Allison Murray",
      img: null,
      nationality: null,
      rateQuality: null,
      liked: 0,
      skill: ["", "", "", "", ""],
      description: "Odit est ratione et dolorem tenetur illum.",
    },
    {
      key: 4,
      name: "Ana Lubowitz",
      img: null,
      nationality: null,
      rateQuality: null,
      liked: 0,
      skill: ["", ""],
      description: "Debitis distinctio minus qui accusantium voluptatum.",
    },
    {
      key: 5,
      name: "Angus Dickinson",
      img: null,
      nationality: null,
      rateQuality: null,
      liked: 0,
      skill: ["", "", "", "", ""],
      description: "Enim expedita explicabo saepe perferendis est et.",
    },
    {
      key: 6,
      name: "April Baldo",
      img: null,
      nationality: "Philippines (the)",
      rateQuality: 5,
      liked: 0,
      skill: [
        keywordText[3].value,
        keywordText[10].value,
        keywordText[9].value,
        keywordText[8].value,
      ],
      description:
        "Hello! My name is April Baldo, you can just call me Teacher April. I am an English teacher and currently teaching in senior high school. I have been teaching grammar and literature for almost 10 years. I am fond of reading and teaching literature as one way of knowing one’s beliefs and culture. I am friendly and full of positivity. I love teaching because I know each student has something to bring on. Molding them to become an individual is a great success.",
    },
    {
      key: 7,
      name: "Bradley Zieme",
      img: null,
      nationality: null,
      rateQuality: null,
      liked: 0,
      skill: ["", ""],
      description: "Asperiores cupiditate sint et neque quasi.",
    },
    {
      key: 8,
      name: "Cassandre Balistreri",
      img: null,
      nationality: null,
      rateQuality: null,
      liked: 0,
      skill: ["", "", ""],
      description: "Est et vel.",
    },
    {
      key: 9,
      name: "Chad Ankunding",
      img: null,
      nationality: null,
      rateQuality: null,
      liked: 0,
      skill: ["", "", "", ""],
      description: "Rem neque quidem aliquam magni quasi et.",
    },
    {
      key: 10,
      name: "Damon Carroll",
      img: null,
      nationality: null,
      rateQuality: null,
      liked: 0,
      skill: ["", "", ""],
      description:
        "Tenetur sit dolorem qui aspernatur suscipit fugit sequi facere.",
    },
    {
      key: 11,
      name: "Dangelo Wehner",
      img: null,
      nationality: null,
      rateQuality: null,
      liked: 0,
      skill: ["", "", ""],
      description: "Quibusdam nam sint in aut et eius.",
    },
    {
      key: 12,
      name: "David Nikolaus",
      img: null,
      nationality: null,
      rateQuality: null,
      liked: 0,
      skill: ["", "", "", ""],
      description: "Ut autem possimus ipsum esse.",
    },
  ];

  const print = (liked) => {
    for (let i = 0; i < liked; i++)
      <View
        style={{ backgroundColor: "yellow", width: 10, height: 10 }}
      ></View>;
  };

  const printStar = (liked) => {
    if (liked == null)
      return <Text style={{ fontStyle: "italic" }}>No reviews yet</Text>;
    else return print(liked);
  };

  return (
    <View style={styles.container}>
      <View style={styles.introLesson}>
        <Text style={styles.heading}>Upcoming lesson</Text>
        <View style={styles.midIntro}>
          <Text style={styles.timeStart}>
            Fri, 10 Mar 23 23:00 - 23:25
            <Text style={{ color: "yellow" }}>(starts in 18:00:00)</Text>
          </Text>
          <View style={styles.joinRoom}>
            <Image
              style={styles.iconYoutube}
              source={require("./assets/iconYoutube.png")}
            />
            <Text style={styles.joinRoom_Text}>Enter lesson room</Text>
          </View>
        </View>
        <Text style={styles.totalTime}>
          Total lesson time is 299 hours 10 minutes
        </Text>
      </View>

      <View style={styles.middle}>
        <Text style={styles.heading2}>Find a tutor</Text>
        <TextInput
          style={styles.input}
          label="Email"
          placeholder="Enter tutor name..."
          // value={username}
          // onChangeText={setUsername}
        />

        {/* <SelectList
        style={styles.input}
        placeholder="Select tutor national"
        // data={listTutorNational}
        // setSelected={setSelected}

        // value={password}
        // onChangeText={setPassword}
        // secureTextEntry={true}
      /> */}
        {/* <SelectList
        data={listTutorNational}
        setSelected={setSelected}
      /> */}

        {/* <SelectDropdown
      style={styles.selectTutor}
	      data={countries}
	      onSelect={(selectedItem, index) => {
		      console.log(selectedItem, index)}}
	      buttonTextAfterSelection={(selectedItem, index) => {
		      // text represented after item is selected
		      // if data array is an array of objects then return selectedItem.property to render after item is selected
		      return selectedItem
	        }}
	        rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item
	}}
/> */}
        <Text>Select available tutoring time:</Text>
        {/* select a day  */}
        {/* select time  */}
        <View style={styles.keyCourseBox}>
          {keywordText.map((i) => (
            <Text key={i.key} style={styles.keywordCourse}>
              {i.value}
            </Text>
          ))}
        </View>
        <Text style={styles.resetFilters}>Reset filters</Text>
        <View style={styles.strike} />

        <View style={styles.recommendedTutors}>
          {tutorInfo.map((index) => (
            <View key={index.key} style={styles.tutorBox}>
              <View style={styles.tutorInfoBox}>
                <View style={styles.topTutorInfoBox}></View>
                <Text style={styles.tutorName}>{index.name}</Text>
                <Text>{index.nationality}</Text>
                {/* <View>{printStar(index.liked)}</View> */}
                <View style={styles.keyCourseBox}>
                  {index.skill.map((i) => (
                    <Text style={styles.keywordCourseTutor}>{i}</Text>
                  ))}
                </View>
                <Text>{index.description}</Text>
                <View style={styles.book}>
                  <Text>Book</Text>
                </View>
              </View>
            </View>
          ))}
          <View style={styles.pageBox}>
            <View style={styles.page}></View>
            <Text style={styles.page}>1</Text>
            <Text style={styles.page}>2</Text>
            <Text style={styles.page}>3</Text>
            <Text style={styles.page}>4</Text>
            <Text style={styles.page}>5</Text>
            <View style={styles.page}></View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  introLesson: {
    width: "100%",
    backgroundColor: "blue",
    // justifyContent: 'center',
    alignItems: "center",
    flex: 1,
  },
  heading: {
    fontSize: 30,
    marginBottom: 15,
    color: "white",
    // alignSelf: 'center',
    marginTop: 45,
  },
  midIntro: {
    flexDirection: "row",
    justifyContent: "center",
    // alignItems: 'center',
    marginVertical: 10,
  },
  timeStart: {
    flex: 1,
    color: "white",
  },
  joinRoom: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  iconYoutube: {
    width: 20,
    height: 20,
    marginRight: 5,
    marginLeft: -10,
  },
  joinRoom_Text: {
    color: "#0077FF",
    marginTop: -2,
  },
  totalTime: {
    color: "white",
    paddingBottom: 35,
  },
  middle: {
    width: "90%",
    marginVertical: 25,
  },
  heading2: {
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 0,
  },
  selectTutor: {
    backgroundColor: "white",
    borderColor: "black",
    borderEndWidth: 1,
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
  keyCourseBox: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  keywordCourse: {
    backgroundColor: "lightgray",
    borderRadius: 25,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  keywordCourseTutor: {
    backgroundColor: "lightblue",
    borderRadius: 25,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    color: "blue",
  },
  book: {
    alignSelf: "flex-end",
    borderWidth: 1,
    borderColor: "#0077FF",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
    position: "absolute",
    bottom: 0,
  },
  resetFilters: {
    borderColor: "#0077FF",
    borderWidth: 1,
    borderRadius: 25,
    color: "#0077FF",
    fontSize: 18,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 10,
    // flexDirection: 'row',
    alignSelf: "flex-start",
  },
  strike: {
    width: "100%",
    backgroundColor: "lightgray",
    height: 1,
    marginVertical: 10,
  },
  tutorBox: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 25,
    shadowColor: "gray",
    // shadowRadius: 25,
    // shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 0.2,
    // elevation: 10,
    width: "100%",
    height: 500,
    marginTop: 20,
    justifyContent: "center",
  },
  tutorInfoBox: {
    marginHorizontal: 15,
    height: 450,
  },
  topTutorInfoBox: {
    height: 100,
  },
  tutorName: {
    fontSize: 30,
  },
  labelInput: {
    alignSelf: "flex-start",
    color: "gray",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0077FF",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 4,
    marginTop: 15,
    width: "100%",
  },
  boxIcon: {
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: 'yellow',
  },
  // boxIcon2:{
  //   height: 100,
  // },
  icon: {
    width: 30,
    marginHorizontal: 10,
    resizeMode: "contain",
    marginBottom: 30,
  },
  pageBox: {
    // position: "absolute",
    // bottom: 0,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 50,
    justifyContent: 'space-between',
    height: 30,
    width: 270,
  },
  page: {
    // alignSelf: 'center',
    // justifyContent: 'center',
    // padding: 10,
    borderWidth: 1,
    width: 30,
  },
});

export default TeacherList;
