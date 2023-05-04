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

const Schedule = ({ route, navigation }) => {
  const { user } = useSelector(state=>{
    return {
      user : state.user.data
    }
  })
  useEffect(()=>{
    User.bookingList().then(res=>{
        console.log("res",res)
        // if(res.)
    })
  },[])

  const handleEditRequest = ()=>{
    console.log("handleEditRequest")
  }
  const handleCancelLession=() =>{
    console.log("handleCancelLession")
  }

  console.log("user",user)
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.mainView}>
        <Image style={{height:64,width:64}} source={require('../../assets/iconSchedule.png')}></Image>
        <Text style={styles.heading}>Schedules</Text>
        <Text style={styles.content}>Here is a list of the sessions you have booked</Text>
        <Text style={styles.content}>You can track when the meeting starts, join the meeting with one click or can cancel the meeting before 2 hours</Text>
        <View style={{width:"100%"}}>
            <Text style={styles.heading}>Lastest book</Text>
            <View style={{flexDirection:'row',flex:1}}>
                <Text style={styles.content}>Name</Text>
                <Text style={{color:"#1890ff"}}> _Everybody 5 - Unit 4 - Lesson 3.pdf</Text>
                <Text> Page</Text>
                <Text> 1 </Text>
            </View>
            <View style={{flexDirection:'row',flex:1}}>
                <Text style={styles.content}>Description</Text>
            </View>
        </View>
        <View style={{height:1,backgroundColor:"#f9f9f9",width:"100%",marginVertical:10}}></View>
        <View style={{width:"100%",padding:15, backgroundColor:"rgb(241, 241, 241)"}}>
            <Text style={{fontWeight:'bold',fontSize:19}}>
                Thu, 04 May 2023
            </Text>
            <Text>
                1 lesson
            </Text>
            <View style={{backgroundColor:"white",padding:10,width:"100%",marginBottom:15,marginTop:15}}>
                <View style={{flexDirection:"row",width:"100%"}}>
                    <View style={{flex:1,paddingLeft:20}}>
                        <Image source={{uri:user.avatar}} style={{height:60,width:60,borderRadius:30}}></Image>
                    </View>
                    <View style={{flex:4, alignContent:"flex-start"}}>
                        <Text style={{padding:2}}>Keegan</Text>
                        <Text style={{padding:2}}>Aruban</Text>
                        <Text style={{padding:2, color:"blue"}}>Direct Message</Text>

                    </View>
                </View>
            </View>
            <View style={{backgroundColor:"white",padding:15,width:"100%",marginBottom:15}}>
                <View style={{flexDirection:"row",width:"100%",marginBottom:10}}>
                    <View style={{flex:2}}>
                        <Text style={{fontSize:18,fontWeight:'500'}}>
                            16:30 - 16:55
                        </Text>
                    </View>
                    <View style={{flex:2, justifyContent:"flex-end",flexDirection:"row"}}>
                        <TouchableOpacity
                        onPress={()=>handleCancelLession()}
                        >
                        <View style={{flex:2, alignContent:"flex-start",flexDirection:"row",padding:2,borderColor:"red",borderWidth:1}}>
                            <Icon name="close" color="red" size={20} style={{padding:3}}>
                            </Icon>
                            <Text style={{padding:5,color:"red"}}>Cancel</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{width:"100%", borderColor:"#f9f9f9",borderWidth:2,padding:15}}>
                    <View style={{width:"100%", borderColor:"#f9f9f9",borderWidth:2,padding:2}}>
                        <View style={{flex:2,flexDirection:"row",padding:10,marginBottom:10,backgroundColor:"#f9f9f9"}}>
                            <View style={{flex:2}}>
                                <Text>
                                    Request for lesson
                                </Text>
                                </View>
                            <View style={{flex:2, justifyContent:"flex-end"}}>
                                <TouchableOpacity onPress={()=>handleEditRequest()}>
                                    <Text style={{padding:2,color:"rgb(0, 113, 240)"}}>Edit Request</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flex:2, alignContent:"flex-start"}}>
                            <Text style={{padding:5}}>Currently there are no requests for this class. 
                            Please write down any requests for the teacher.</Text>
                        </View>
                    </View>

                </View>
            </View>
            <View style={{width:"100%",flexDirection:"row",justifyContent:"flex-end"}}>
                <Button onPress={()=>console.log("Go to meeting")} title="Go to meeting"></Button>
            </View>

        </View>

        <View style={styles.bottom}></View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor:"white"
  },
  mainView: {
    width: "100%",
    paddingHorizontal:10,
    marginTop: 30,
  },
 
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
    padding: 5,
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

export default Schedule;
