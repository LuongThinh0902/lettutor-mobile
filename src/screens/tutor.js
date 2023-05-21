import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  Alert
} from "react-native";
import Header from "../components/header";
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import Util from "../utils";
import User from '../api/user'
import mTutor from '../api/tutor'
import { useSelector } from "react-redux";
import { Translate} from "../components/language";

const Tutor = ({ route, navigation }) => {
  const dictionary = useSelector(state => state.language.dictionary)
  const { tutorId, tutorProps } = route.params
  const { user } = useSelector(state=>{
    return {
      user : state.user.data
    }
  })
  console.log("id",tutorId)
  console.log("user",user)
  const [tutor, setTutor] = useState({})
  const [schedule, setShedule] = useState([])
  const [feedback, setFeedback] = useState([])
  const [currentDateSchedule,setCurrentDateSchedule] = useState(Util.formatDate(new Date()))
  const [liked,setLiked] = useState(tutorProps.isfavoritetutor==1)
  // const [ loading, setLoading] = useEffect(false)
  useEffect(()=>{
    mTutor.getDetailTutor(tutorId).then(res=>{
      setTutor(res)
    })
    mTutor.getFeedback(tutorId,{
      page:1,
      perPage:12
    }).then(res=>{
      if(res.message=="Success")
      {
        setFeedback(res.data.rows)
      }
    })
    console.log( Util.formatDate(currentDateSchedule), Util.stringToTimestamp(Util.formatDate(currentDateSchedule) +" 00:00:00"))
    mTutor.getSchedule(tutorId,{
      startTimestamp: Util.stringToTimestamp(Util.formatDate(currentDateSchedule) +" 00:00:00"),
      endTimestamp:Util.stringToTimestamp(Util.formatDate(currentDateSchedule) +" 18:25:00")
    }).then(res=>{
      if(res.message=="Get schedules successful")
      {
        setShedule(res.scheduleOfTutor)
      }
    })
   
  },[])
  const handlePressHeart = (tutorId) =>{
    console.log("tutorId",tutorId)
    User.like({"tutorId": tutorId}).then((res)=>{
        if(res.statusCode == undefined || res.statusCode != 500)
        {
          setLiked(prev=>!prev)
        }
        else
        {
          Alert.alert("Có lỗi xảy ra!")
        }
    })
  }

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
 
  function roundToNearestHalf(num) {
    return Math.round(num * 2) / 2;
  }

  // lấy ngày tiếp theo hoặc ngày trước đó
  const getNextDaySchedule = (num)=> {
    const {prevDay, nextDay } = Util.getPrevNextDays(currentDateSchedule)
    setCurrentDateSchedule(prev=> {
      if (num === -1) {
         return prevDay
      } else {
        return nextDay
      }
    })
  }

  // lấy lại danh sách lịch học khi thời gian thay đổi
  useEffect(()=>{
    console.log("currentDateSchedule",currentDateSchedule)
    mTutor.getSchedule(tutorId,{
      startTimestamp: Util.stringToTimestamp(Util.formatDate(currentDateSchedule) +" 00:00:00"),
      endTimestamp:Util.stringToTimestamp(Util.formatDate(currentDateSchedule) +" 18:25:00")
    }).then(res=>{
      if(res.message=="Get schedules successful")
      {
        setShedule(res.scheduleOfTutor)
      }
    })

  },[currentDateSchedule])

  console.log("tutor",tutor)
  console.log("schedule",schedule)
  console.log("feedback",feedback)


  const keywordText = [
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
  const [modalVisible, setModalVisible] = useState(false);
  const [modalBookVisible, setModalBookVisible] = useState(false);
  const [currentBookedSchedule, setCurrentBookedSchedule] = useState();

  const handleBook = (id)=>{
    console.log("id",id)
    let foundSchedule = schedule.find(item => item.id == id)
    setCurrentBookedSchedule(foundSchedule)
    setModalBookVisible(true)
  }

  const handleBookSchedule = (id)=>{
    console.log("idSchedule",id)
    let data = {
      scheduleDetailIds:[currentBookedSchedule.id],
      note:note,
      // tutorId:currentBookedSchedule.tutorId
    }
    User.booking(data).then((res)=>{
        if(res.statusCode == undefined || res.statusCode != 500 || res.statusCode != 400)
        {
          Alert.alert(res.message)
        }
        else
        {
          Alert.alert(res.message)
        }
    })

  }
  const [note, setNote] = useState("")
  let txtCancel = dictionary["cancel"] || "Cancel"
  let txtBook = dictionary["book"] || "Book"

  return (
    <View style={styles.container}>
      <Header />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{flexDirection:"row",marginBottom:10}}>
              <View style={{flex:4,alignItems:"flex-start",justifyContent:"center"}}>
                  <Text style={styles.heading}>Others review</Text>
              </View>
              <View style={{flex:1,alignItems:"flex-end",justifyContent:"center"}}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Icon size={20} name="close" style={styles.textStyle}></Icon>
                </Pressable>
              </View>
            </View>
            <View style={styles.strike} />
            <ScrollView style={{padding:0,width:"100%"}}>
              <View style={{height:'100%',width:"100%",paddingTop:10}}>
                {feedback.map((item)=> {
                  return (
                          <View key={item.id} style={{flexDirection:'row',paddingBottom:10}}>
                                <View style={{flex:1,padding:5}}>
                                  <Image style={styles.avtFeedback} source={{uri:item.firstInfo.avatar}}/>
                                </View>
                                <View style={{flex:5,padding:5}}>   
                                  <View style={{flexDirection:'row'}}>
                                    <Text>{item.firstInfo.name}</Text>
                                    <Text style={{paddingLeft:15,opacity:0.5}}>{Util.getTimeAgo(item.createdAt)}</Text>
                                  </View>
                                  <View style={{width:'50%',flexDirection:'row', justifyContent:"flex-start",marginTop:3,marginBottom:5}}>{printStar(item.rating)}
                                  </View>
                                  {item.content!=""?
                                  <Text style={{fontSize:16,fontWeight:'bold'}}>
                                    {item.content}
                                  </Text>
                                  :
                                  <></>}
                              </View> 
                          </View>
                  )
                })}
                <></>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <ScrollView style={styles.mainView}>
        <View style={styles.info}>
          <View style={styles.topInfo}>
            <Image style={styles.avt} source={{uri:tutorProps.avatar}} />
            <View style={styles.topRight}>
              <Text style={{ fontSize: 30 }}>{tutorProps.name}</Text>
              <View style={{width:'50%',flexDirection:'row', justifyContent:"flex-start"}}>{printStar(tutorProps.rating)}
                <Text style={{marginLeft:5}}>({tutor.totalFeedback})</Text>
              </View>
              <Text>{tutorProps.country}</Text>
              <View></View>
            </View>
          </View>
          <Text
            style={{ color: "gray" }}
          >
            {tutorProps.bio}
          </Text>
          <View style={styles.iconBox}>
            <View style={{alignItems:"center"}}>
                <TouchableOpacity onPress={()=>handlePressHeart(tutorProps.id)}>
                  <Icon size={30} name={!liked?"heart-o":"heart"}
                                  color={!liked?"#0071F0":"#F04848"}
                  ></Icon>
                </TouchableOpacity>
                <Text style={{color:!liked?"#0071F0":"#F04848"}}><Translate tid={"favorite"}/></Text>
            </View>
            <View style={{alignItems:"center"}}>
                <TouchableOpacity onPress={()=>{}}>
                      <Icon size={30} name="warning"
                                      color="#0071F0"
                  ></Icon>
                </TouchableOpacity>
                <Text style={{color:"#0071F0"}}><Translate tid={"report"}/></Text>
            </View>
            <View style={{alignItems:"center"}}>
                <TouchableOpacity onPress={()=>{setModalVisible(true)}}>
                      <Icon size={30} name="star-o" color="#0071F0"
                    ></Icon>
                </TouchableOpacity>
                <Text style={{color:"#0071F0"}}><Translate tid={"reviews"}/></Text>
            </View>
          </View>
          <View style={styles.video}>
            <Video
                source={{ uri: tutorProps.video}}
                style={{ flex: 1 , aspectRatio: 16/9, }}
                controls={true}
              />
          </View>
        </View>
        <Text style={styles.heading}><Translate tid={"languages"} /></Text>
        <View style={styles.list}>
          <Text style={styles.languages}>{tutorProps.language}</Text>
        </View>

        <Text style={styles.heading}><Translate tid={"specialties"}/></Text>
        <View style={styles.list}>
          {tutorProps.specialties.split(",").map((item)=>{
            let value = keywordText.find(i=>i.code==item).value
            return (
                <Text key={value} style={styles.languages}>{value}</Text>
            )
          })
          }
        </View>

        <Text style={styles.heading}><Translate tid={"interests"}/></Text>
        <Text style={styles.content}>{tutorProps.interests}</Text>

        <Text style={styles.heading}><Translate tid={"teachingExperience"}/></Text>
        <Text style={styles.content}>{tutorProps.experience}</Text>

        <Text style={styles.heading}><Translate tid={"schedules"}/></Text>

        <View style={{width:"100%",flexDirection:'row',marginTop:10}}>
          {/* {
            !Util.isToday(Util.formatDate(currentDateSchedule))
            ?
            <View style={{flex:2,marginRight:!Util.isToday(Util.formatDate(currentDateSchedule))?22:0}}>
            <Button 
              color="#1890ff"
              title="Today"
              onPress={()=>setCurrentDateSchedule(new Date())}
            >
            </Button>
          </View>
          :<></>
          } */}
          <View style={{flexDirection:'row',justifyContent:"flex-start",flex:5,paddingLeft:20}}>
            <View style={{flex:3}}>
                <Text style={{paddingTop:5, fontSize:18}}>
                  {Util.formatDateEnglish(currentDateSchedule)}
              </Text>
            </View>
            <View style={{flex:2,flexDirection:'row',justifyContent:"flex-start"}}>
              <View style={{marginRight:50}}>
                <Icon name="angle-left" size={30} onPress={()=>getNextDaySchedule(-1)}>
                </Icon>
              </View>
              <View  >
                <Icon name="angle-right" size={30} onPress={()=>getNextDaySchedule(1)}></Icon>
              </View>
            </View>
          </View>
        </View>
        <ScrollView style={{width:"100%",marginTop:10}}>
              {schedule.sort((a, b) => {
                  // Tách giờ, phút ra khỏi chuỗi startTime của đối tượng
                  const [aHour, aMinute] = a.startTime.split(":");
                  const [bHour, bMinute] = b.startTime.split(":");

                  // So sánh theo thứ tự giờ, nếu giờ bằng nhau thì so sánh theo phút
                  if (aHour < bHour) return -1;
                  if (aHour > bHour) return 1;
                  if (aMinute < bMinute) return -1;
                  if (aMinute > bMinute) return 1;
                  return 0;
                }).map((item)=>{
                return (
                  <View style={{flexDirection:"row",width:"100%",justifyContent:"flex-start",marginBottom:5}}>
                    <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                      <Text>
                          {item.startTime} - {item.endTime}
                      </Text>
                    </View>
                    <View style={{flex:2,alignItems:"center"}}>
                    <Text  
                          disabled={item.isBooked}
                          onPress={()=>handleBook(item.id)}
                          style={{...styles.bookSchedule,
                          backgroundColor:item.isBooked?"transparent":"#1890ff",
                          color:item.isBooked?"green":"white"}}>{item.isBooked?dictionary["booked"]:dictionary["book"]}</Text>
                    </View>
                  </View>
                )
              })
              }
          </ScrollView>
          <Modal
              animationType="slide"
              transparent={true}
              visible={modalBookVisible}
              onRequestClose={() => {
                // Alert.alert('Modal has been closed.');
                setModalBookVisible(!modalBookVisible);
              }}>
              <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{flexDirection:"row",marginBottom:10}}>
                  <View style={{flex:4,alignItems:"flex-start",justifyContent:"center"}}>
                      <Text style={{...styles.heading,fontWeight:"bold"}}><Translate tid={"bookingDetails"}/></Text>
                  </View>
                  <View style={{flex:1,alignItems:"flex-end",justifyContent:"center"}}>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalBookVisible(!modalBookVisible)}>
                      <Icon size={20} name="close" style={styles.textStyle}></Icon>
                    </Pressable>
                  </View>
                </View>
                <View style={styles.strike} />
                  <View style={{width:"100%",borderColor:"#f9f9f9",borderWidth:1,marginTop:10}}>
                    <Text style={{fontSize:17,fontWeight:'bold',backgroundColor:"#fafafa"}}><Translate tid={"bookingTime"}/></Text>
                    <Text style={{marginTop:5,
                      backgroundColor:"rgb(238, 234, 255)",
                      justifyContent:"center",
                      margin:2,
                      padding:5,
                      color:"rgb(119, 102, 199)",
                      alignContent:"center"

                      }}>
                       {currentBookedSchedule?.startTime} - {currentBookedSchedule?.endTime} {Util.formatDateEnglish(currentDateSchedule)} 
                    </Text>
                  </View>
                  <View style={{borderColor:"#f9f9f9",borderWidth:2,backgroundColor:"#fafafa",marginTop:10}}>
                    <View style={{flexDirection:'row', width:"100%",marginBottom:10}}>  
                        <Text style={{flex:2,marginRight:20,fontSize:17,fontWeight:'bold',paddingLeft:5}}><Translate tid={"balance"}/></Text>
                        <Text style={{flex:3,color:"rgb(119, 102, 199)",alignSelf:"flex-end"}}>{dictionary["youHave"]} {user?.walletInfo?.amount/100000} {dictionary["lessonsLeft"]}</Text>
                    </View>
                    <View style={{flexDirection:'row', width:"100%"}}>
                        <Text style={{flex:2,marginRight:20,fontSize:17,fontWeight:'bold',paddingLeft:5}}><Translate tid={"price"}/></Text>
                        <Text style={{flex:3,color:"rgb(119, 102, 199)",alignSelf:"flex-end"}}> 1 {dictionary["lesson"]}</Text>
                    </View>
                  </View>
                  <View style={{...styles.strikeNote,marginVertical:5}} />
              
                  <View style={{width:"100%",marginTop:10,backgroundColor:"#fafafa",padding:10,borderWidth:1,borderColor:"#f9f9f9"}}>
                      <Text style={{fontSize:17,fontWeight:'bold',paddingBottom:10}}><Translate tid={"notes"}/></Text>
                      <View style={{borderWidth:1,borderColor:"black",opacity:0.3}}>
                          <TextInput 
                            textAlignVertical="top"
                            editable
                            multiline
                            numberOfLines={4}
                            onChangeText={text => setNote(text)}
                            value={note}
                            style={{padding: 10}}
                          />
                      </View>
                      
                  </View>
                  <View style={{flexDirection:'row',justifyContent:"flex-end",alignItems:"center",width:"100%",padding:5}}> 
                    <View style={{marginRight:20,borderRadius:10}} >
                        <Button onPress={()=>setModalBookVisible(false)} title={txtCancel}></Button>
                    </View>
                    <View style={{borderRadius:10}}>
                        <Button  onPress={()=>handleBookSchedule(currentBookedSchedule)} title={txtBook}></Button>
                    </View>
                  </View>
              </View>
        </View>
      </Modal>
        <View style={styles.bottom}></View>

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
  video:{
    paddingVertical:10,
    paddingHorizontal:10,
    height: 200,
    width:'100%',
    justifyContent:"center"
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
  avtFeedback: {
    height: 45,
    width: 45,
    borderRadius: 25,
  },
  avt: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  iconBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal:10,
    marginTop:5
  },
  heading: {
    fontSize: 18,
    marginTop: 10,
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
    marginVertical: 5,
    fontSize: 12,
  },
  bookSchedule: {
    borderRadius: 25,
    marginHorizontal: 10,
    padding: 10,
    marginVertical: 5,
    fontSize: 14,
  },
  content: {
    marginHorizontal: 10,
    padding: 10,
    color: "gray",
  },
  bottom:{
    margin:10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginVertical:30,
    height:"80%"
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding:5,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
  },
  strike: {
    width: "100%",
    backgroundColor: "lightgray",
    height: 2,
  },
  strikeNote:{
    width: "100%",
    backgroundColor: "lightgray",
    height: 1,
  }
});

export default Tutor;
