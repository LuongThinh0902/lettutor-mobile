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
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from "react-redux";
import { Translate} from "../components/language";

const Menu = ({ navigation }) => {
    
    const { user } = useSelector(state=>{
    return {
        user : state.user.data
    }
    })
  return (
    <View style={styles.container}>
      <HeaderLogged navigation={navigation}/>
      <ScrollView style={styles.mainView} nestedScrollEnabled={true}>

        <TouchableOpacity onPress={()=>console.log("Thông tin cá nhân")}>
            <View style={styles.viewMenu}>
                <View style={styles.viewLeftItemMenu}>
                    <Image style={styles.viewRigthItemMenu} 
                        source={{uri:"https://sandbox.api.lettutor.com/avatar/f569c202-7bbf-4620-af77-ecc1419a6b28avatar1682612948658.jpg"}}>
                    </Image>
                </View>
                <View style={{flex:5,justifyContent:"center",alignContent:'flex-start'}}>
                    <Text style={styles.text}>{user.name}</Text>
                </View>
            </View>
        </TouchableOpacity>

        <TouchableOpacity>
            <View style={styles.viewMenu}>
                <View style={styles.viewLeftItemMenu}>
                    <IconMaterial name="bookmark-plus" size={50} color="#0071F0">
                    </IconMaterial>
                </View>
                <View style={styles.viewRightItemMenuIcon}>
                    <Text style={styles.text}><Translate tid={"buyLessons"}/></Text>
                </View>
            </View>
        </TouchableOpacity>

        <TouchableOpacity>
            <View style={styles.viewMenu}>
                <View style={styles.viewLeftItemMenu}>
                    <IconMaterial name="bookmark-plus" size={50} color="#0071F0">
                    </IconMaterial>
                </View>
                <View style={styles.viewRightItemMenuIcon}>
                    <Text style={styles.text}><Translate tid={"changePW"}/></Text>
                </View>
            </View>
        </TouchableOpacity>

        <TouchableOpacity>
            <View style={styles.viewMenu}>
                <View style={styles.viewLeftItemMenu}>
                    <IconMaterial name="bookmark-plus" size={50} color="#0071F0">
                    </IconMaterial>
                </View>
                <View style={styles.viewRightItemMenuIcon}>
                    <Text style={styles.text}><Translate tid={"tutor"}/></Text>
                </View>
            </View>
        </TouchableOpacity>

        <TouchableOpacity>
            <View style={styles.viewMenu}>
                <View style={styles.viewLeftItemMenu}>
                    <IconMaterial name="bookmark-plus" size={50} color="#0071F0">
                    </IconMaterial>
                </View>
                <View style={styles.viewRightItemMenuIcon}>
                    <Text onPress={()=>navigation.navigate("schedule")} style={styles.text}><Translate tid={"schedule"}/></Text>
                </View>
            </View>
        </TouchableOpacity>

        <TouchableOpacity>
            <View style={styles.viewMenu}>
                <View style={styles.viewLeftItemMenu}>
                    <IconMaterial name="bookmark-plus" size={50} color="#0071F0">
                    </IconMaterial>
                </View>
                <View style={styles.viewRightItemMenuIcon}>
                    <Text style={styles.text}><Translate tid={"history"}/></Text>
                </View>
            </View>
        </TouchableOpacity>

        <TouchableOpacity>
            <View style={styles.viewMenu}>
                <View style={styles.viewLeftItemMenu}>
                    <IconMaterial name="bookmark-plus" size={50} color="#0071F0">
                    </IconMaterial>
                </View>
                <View style={styles.viewRightItemMenuIcon}>
                    <Text style={styles.text}><Translate tid={"courses"}/></Text>
                </View>
            </View>
        </TouchableOpacity>

        <TouchableOpacity>
            <View style={styles.viewMenu}>
                <View style={styles.viewLeftItemMenu}>
                    <IconMaterial name="bookmark-plus" size={50} color="#0071F0">
                    </IconMaterial>
                </View>
                <View style={styles.viewRightItemMenuIcon}>
                    <Text style={styles.text}><Translate tid={"myCourses"}/></Text>
                </View>
            </View>
        </TouchableOpacity>

        <TouchableOpacity>
            <View style={styles.viewMenu}>
                <View style={styles.viewLeftItemMenu}>
                    <IconMaterial name="bookmark-plus" size={50} color="#0071F0">
                    </IconMaterial>
                </View>
                <View style={styles.viewRightItemMenuIcon}>
                    <Text style={styles.text}><Translate tid={"becomeATutor"}/></Text>
                </View>
            </View>
        </TouchableOpacity>

        <TouchableOpacity>
            <View style={styles.viewMenu}>
                <View style={styles.viewLeftItemMenu}>
                    <IconMaterial name="bookmark-plus" size={50} color="#0071F0">
                    </IconMaterial>
                </View>
                <View style={styles.viewRightItemMenuIcon}>
                    <Text style={styles.text}><Translate tid={"logout"}/></Text>
                </View>
            </View>
        </TouchableOpacity>

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
  text:{
    fontSize:17,
    fontWeight:'bold',
    alignSelf:'flex-start'
  },
  viewMenu:{
    paddingLeft:25, flexDirection:'row',marginVertical:10, alignContent:'center'
  },
  viewLeftItemMenu:{
    flex:1,marginRight:0
  },
  viewRigthItemMenu:{height:40,width:40,borderRadius:30},
  viewRightItemMenuIcon:{flex:5,justifyContent:"center",alignContent:'flex-start'}
  
});

export default Menu;
