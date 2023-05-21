import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Button,
  Dimensions,
  FlatList,
  Alert,
} from "react-native";
import HeaderLogged from "../components/headerLogged";
import { SelectList } from "react-native-dropdown-select-list";
import SelectDropdown from "react-native-select-dropdown";
import {Picker} from "@react-native-picker/picker";
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import ChooseDate from '../components/chooseDate.js'
import ChooseTime from '../components/chooseTime'
import User from '../api/user'
import Tutor from "../api/tutor";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Translate} from "../components/language";

const TeacherList = ({ navigation }) => {
  const dictionary = useSelector(state => state.language.dictionary)
  let userLanguage = useSelector(state => state.language.userLanguage)
 
  const listTutorNational = [dictionary["foreignTutor"]|| "Foreign Tutor", dictionary["vietNamTutor"]||"Vietnamese Tutor", dictionary["nativeTutor"]||"Native English Tutor"];
  const [selected, setSelected] = React.useState("");
  const [tutors, setTutors] = useState([]);
  const [date, setDate] = useState(new Date());

  const [load, setLoad] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentSpecialty, setCurrentSpecialty] = useState("All");
  const [tutorNational, setTutorNational] = useState(listTutorNational[0]);
  useEffect(()=>{
    console.log(listTutorNational)
    let item = listTutorNational.findIndex(item=>item == tutorNational);
    console.log(listTutorNational[item])
    if(item==-1)
    {
      setTutorNational(listTutorNational[0])
    }
    else
    {
      setTutorNational(listTutorNational[item])
      
    }

  },[userLanguage])
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const [maxSize,setMaxSize] = useState(0)
  const [listStatus, setListStatus] = useState(
      {
        // filters: {
        //     specialties: [],
        //     nationality: {},
        //     date: null,        
        //     tutoringTimeAvailable: [null,null]
        // },
        // search: "",
        // page: 1,
        // perPage: 12
    }
  )
  useEffect(() => {
    Tutor.getTutors(listStatus).then(v => {
      if(v.statusCode != 400 && v.statusCode != 500)
      {
          setTutors(v.rows)    
          setMaxSize(v.count)
      }
      else
      {
        console.log("res",v)
      }
    })
  }, []);


  let keywordText = [
    { key: 1, code:"All", value: "All" },
    { key: 2, code:"english-for-kids", value: "English for kids" },
    { key: 3, code:"business-english", value: "English for Business" },
    { key: 4, code:"conversational-english",  value: "Conversational" },
    { key: 5, code:"starters",  value: "STARTERS" },
    { key: 6, code:"movers",  value: "MOVERS" },
    { key: 7, code:"flyers",  value: "FLYERS" },
    { key: 8, code:"ket",  value: "KET" },
    { key: 9, code:"pet",  value: "PET" },
    { key: 10, code:"ielts",  value: "IELTS" },
    { key: 11, code:"toefl",  value: "TOEFL" },
    { key: 12, code:"toeic",  value: "TOEIC" },
  ];

  const print = (rating) => {
    return <>{[...Array(5)].map((_, i) => (
      <Icon
        key={i}
        size={18}
        name="star"
        style={{
          paddingRight:2,
          paddingTop:2,
          color: i + 1 <= roundToNearestHalf(rating) ? '#fadb14' : 'gray',
        }}
      />
    ))}
    </>
  };

  const printStar = (rating) => {
    if (rating == null)
      return <Text style={{ fontStyle: "italic" }}>No reviews yet</Text>;
    else return print(rating);
  };
  const handlePressHeart = (tutorId) =>{
    console.log("tutorId",tutorId)

    User.like({"tutorId": tutorId}).then((res)=>{
      if(res.statusCode == undefined || res.statusCode != 500)
      {
        setTutors(prevTutors => {
          const updatedItems = prevTutors.map(item => {
            if (item.id === tutorId) {
              return { ...item, isfavoritetutor: item.isfavoritetutor == "1" ? null : "1" };
            } else {
              return item;
            }
          });
          return updatedItems;
        });
      }
      else
      {
        Alert("Có lỗi xảy ra!")
      }
    })

  }
  function roundToNearestHalf(num) {
    return Math.round(num * 2) / 2;
  }

  const loadMore = async() => {
    if(tutors.length < maxSize)
    {
      console.log("load more")
      setListStatus(prevState=>({
          ...prevState,
          page: prevState.page + 1
      }))
      loadData(false)
    }
  }

  const loadData = async(refresh) =>
  {
      Tutor.getTutors(listStatus).then(v => {
        if(v.statusCode != 400 && v.statusCode != 500)
        {
            let newStatus = (v.rows.length > 0 ) ?
            { page: Math.floor(tutors.length / listStatus.perPage) + 1 } :
            { page: 1}

            let data = (v.rows.length > 0 ) ?
            ( refresh ? v.rows : [...tutors, ...v.rows]) :
            ( refresh ? [] : [...tutors])

            setListStatus(prevState=>{
              return {
                ...prevState, ...newStatus,
              }
            })    
            setTutors(data)    
            setMaxSize(v.count)
        }
        else
        {
          console.log("res",v)
        }
      })
  }

  console.log('tutor',tutors.length)
  console.log('maxSize',maxSize)
  console.log('listStatus',listStatus)

  const sortData = (data) =>{
    return data.sort((a, b) => {
      // sort by isFavoriteTutor
      if (a.isFavoriteTutor == "1" && b.isFavoriteTutor == null) {
        return -1; // a should come before b
      } else if (a.isFavoriteTutor == null && b.isFavoriteTutor == "1") {
        return 1; // b should come before a
      } else {
        // sort by rating
        return b.rating - a.rating; // highest rating should come first
      }
    })
  }
  const handlesearch = (val)=>{
    setSearch(val)
    Tutor.getTutors({search: val}).then(v => {
      if(v.statusCode != 400 && v.statusCode != 500)
      {
          setTutors(v.rows)    
          setMaxSize(v.count)
      }
      else
      {
        console.log("res",v)
      }
    })
  }

  // để làm sau
  const filterNational = (selectedItem) => {
    // console.log("selectedItem",selectedItem)
    
    // setTutors(prevTutors => {
    //   const updatedItems = prevTutors.filter(item => item.country)
    //   return updatedItems;
    // });
    // let status = {
    //   // search: search,
    //   page: 1,
    //   perPage: 20,
    //   filters: {
    //         specialties: ["All"],
    //         nationality: {
    //           isVietNamese: selectedItem == listTutorNational[1],
    //           isNative: selectedItem == listTutorNational[2]
    //         },
    //         // date: null,        
    //         // tutoringTimeAvailable: [null,null]
    //   },
    // }
    // status.filters.nationality.push(selectedItem)
    // Tutor.getTutors(status).then(v => {
    //   if(v.statusCode != 400 && v.statusCode != 500)
    //   {
    //       setTutors(v.rows)    
    //       setMaxSize(v.count)
    //   }
    //   else
    //   {
    //     console.log("res",v)
    //   }
    // })
  }

  const handleChooseSpecialty = (value) => {
    setCurrentSpecialty(keywordText.find(item=>item.code==value).value)
    if(value != "All")
    {
      setTutors(prevTutors => {
        const updatedItems = prevTutors.filter(item => item.specialties.indexOf(value) !== -1);
        return updatedItems;
      });
    }
    else
    {
      Tutor.getTutors({}).then(v => {
        if(v.statusCode != 400 && v.statusCode != 500)
        {
            setTutors(v.rows)    
            setMaxSize(v.count)
        }
        else
        {
          console.log("res",v)
        }
      })
    }
   
  }

  const reset = ()=>{
    setSearch("")
    setTutorNational(listTutorNational[0])
    setCurrentSpecialty("All")
    Tutor.getTutors({}).then(v => {
      if(v.statusCode != 400 && v.statusCode != 500)
      {
          setTutors(v.rows)    
          setMaxSize(v.count)
      }
      else
      {
        console.log("res",v)
      }
    })
  }
  let searchNational = dictionary["selectTutorNational"] || "Select tutor national"
  let searchName= dictionary["enterNameTutor"] || "Enter tutor name..."
  return (
    <View style={styles.container}>
      <HeaderLogged navigation={navigation}/>
      <ScrollView style={styles.mainView} nestedScrollEnabled={true}>
        <View style={styles.introLesson}>
          <Text style={styles.heading}><Translate tid={"comingLesson"} /></Text>
          <View style={styles.midIntro}>
            <Text style={styles.timeStart}>
              Fri, 10 Mar 23 23:00 - 23:25
              <Text style={{ color: "yellow" }}> <Translate tid={"startIn"} /> 18:00:00</Text>
            </Text>
            <View style={styles.joinRoom}>
              <Image
                style={styles.iconYoutube}
                source={require("../../assets/iconYoutube.png")}
              />
              <Text style={styles.joinRoom_Text}><Translate tid={"enterLessonRoom"} /></Text>
            </View>
          </View>
          <Text style={styles.totalTime}>
            <Translate tid={"totalTimeLesson"}/> 299 <Translate tid={"hours"}/> 10 <Translate tid={"minutes"}/>
          </Text>
        </View>
        <View style={styles.middle}>
          <Text style={styles.heading2}><Translate tid={"findATutor"}/></Text>
          <TextInput
            style={styles.input}
            label="Email"
            placeholder={searchName}
            value={search}
            onChangeText={handlesearch}
          />

          <SelectDropdown
            data={listTutorNational}
            defaultValue={tutorNational}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              filterNational(selectedItem)
            }}
            defaultButtonText={searchNational}
            buttonStyle={styles.selectInput}
            buttonTextStyle={styles.placeholderText}
            dropdownIconPosition={"right"}
            
          />

          {/* <Picker></Picker> */}

          <Text style={{ fontWeight: "bold" }}>
            <Translate tid={"selectTime"}/>
          </Text>

          {/* select a day  */}
          <ChooseDate value={date} setDate={setDate} />
                 
          {/* select time  */}
          <ChooseTime />
          <View style={styles.keyCourseBox}>
            {keywordText.map((i,y) => (
              <TouchableOpacity onPress={()=>handleChooseSpecialty(i.code)}>
                <Text key={y} style={i.value == currentSpecialty? styles.keywordCourseTutor: styles.keywordCourse}>
                  {i.value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={()=>reset()}>
              <Text style={styles.resetFilters}><Translate tid={"resetFilters"}/></Text>
          </TouchableOpacity>
          <View style={styles.strike} />

          <View style={styles.recommendedTutors}>
        <Text style={{fontSize:24,fontWeight:'bold',marginBottom:5}}><Translate tid={"recommendedTutor"}/></Text>
          {
            sortData(tutors).map((item,key) => {
              // console.log(item.avatar)
              return (
                    <View key={item.id} style={styles.tutorBox}>
                      <View style={styles.tutorInfoBox}>
                        <View style={styles.topTutorInfoBox}>
                          <View style={{flex:1}}></View>
                          <Image style={styles.avt} source={item.avatar !=null ?{uri: item.avatar}:require('../../assets/avatar_default.png')}>
                          </Image>
                          <View style={{flex:1, alignItems:"flex-end"}}>
                              <TouchableOpacity
                                style={{flex:1}}
                                onPress={()=>handlePressHeart(item.id)}
                              >
                                <Icon size={30} name={item.isfavoritetutor!=1?"heart-o":"heart"}
                                  color={item.isfavoritetutor!=1?"#0071F0":"#F04848"}
                                ></Icon>
                              </TouchableOpacity>
                          </View>
                        </View>
                        <View style={{paddingLeft:10}}>
                          <Text style={styles.tutorName}>{item.name}</Text>
                          <Text>{item.country}</Text>
                          <View style={{width:'50%',flexDirection:'row', justifyContent:"flex-start"}}>{printStar(item.rating)}</View>
                        </View>
                          <View style={styles.keyCourseBox}>
                            {item.specialties.split(",").map((i,y) => (
                              <Text key={y} style={styles.keywordCourseTutor}>{i}</Text>
                            ))}
                          </View>
                          <View style={{paddingLeft:10,paddingBottom:10}}>
                            <Text style={styles.description}>{item.bio.length>180?item.bio.substr(0,180)+"...":item.bio}</Text>
                          </View>
                        <TouchableOpacity
                            style={styles.book}
                            onPress={() => {
                              navigation.navigate("tutor",{
                                tutorId: item.userId,
                                tutorProps:item
                              });
                            }}
                          >
                            <Text><Translate tid={"book"}/></Text>
                        </TouchableOpacity>
                      </View>
                    </View>
            )})
          }
          </View>
        </View>
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
    // paddingLeft: 15,
    textAlign: "center",
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
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 25,
  },
  heading2: {
    fontSize: 35,
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
    width: "60%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 20,
    paddingLeft: 8,
    color: "gray",
  },
  selectInput: {
    height: 40,
    width: "50%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 20,
    paddingLeft: 8,
    color: "gray",
    backgroundColor: 'white',
  },
  placeholderText:{
    color: "gray",
    paddingLeft: -5,
    fontSize: 15,
    // alignSelf: 'flex-start',
  },
  keywordCourse: {
    backgroundColor: "lightgray",
    borderRadius: 25,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  activekeywordCourse: {
    backgroundColor: "#DDEAFF",
    color:"#0071F0",
    borderRadius: 25,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  keyCourseBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
    marginBottom: 15,
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
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    height: 550,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  tutorInfoBox: {
    height: 500,
    width: "90%",
  },
  topTutorInfoBox: {
    height: 100,
    flexDirection:'row',
    justifyContent:'space-around'
  },
  avt: {
    flex:1,
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  tutorName: {
    fontWeight: "bold",
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
    flexDirection: "row",
    alignSelf: "flex-end",
    marginTop: 50,
    justifyContent: "space-between",
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
  recommendedTutors:{
    flex:1
  }
});

export default TeacherList;
