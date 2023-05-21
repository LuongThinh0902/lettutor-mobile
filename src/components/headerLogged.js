import React, { useState } from 'react';
import { Text, View, Image, StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'

const Header = (props) => {
  const { navigation } = props
  let userLanguage = useSelector(state => state.language.userLanguage)
  let userLanguageChange= useDispatch().language.userLanguageChange
  const toggleLanguage = () => {
    if(userLanguage=="en")
    {
      userLanguageChange("vi")
    }
    else
    {
      userLanguageChange("en")
    }
  }
  const navigate = () =>{
    console.log("navigation",navigation.getState())
    if(navigation.getState().routes[navigation.getState().routes.length-1].name !="menu")
    {
      navigation.navigate("menu")
    }
    else
    {
      navigation.goBack();
    }
  }

  return (
    <View style = {styles.bgHeader}>    
        <Image 
          style={styles.logo}
          source={require('../../assets/logoLet.png')}>
        </Image>
        <View style={styles.rightHeader}>            
            <TouchableOpacity 
                onPress={()=>toggleLanguage()}>  
                <Image
                style={styles.iconLanguage}
                source={userLanguage=="en"?require('../../assets/usa.png'):require('../../assets/vn.png')}>
                </Image>      
            </TouchableOpacity>

            <View style={styles.menu}>
              <TouchableOpacity 
              onPress = {()=>navigate()}      
              >
                <Icon name="bars"
                        size={20}
                  >
                </Icon>  
              </TouchableOpacity>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bgHeader: {
    flexDirection: 'row',
    marginTop: 0,
    backgroundColor: 'white',
    elevation: 10,
    height: 100,
    shadowColor: '#000',
    shadowOffset:{width: 0, height:10},
    shadowOpacity: 0.5,
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo:{
    resizeMode: 'contain',
    width: '45%',
    marginLeft: 20,
  },
  rightHeader:{
    flexDirection: 'row',
  },
  iconLanguage:{
    borderWidth: 12,
    borderColor: 'lightgray',
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 20,
  },
  menu:{
    borderWidth: 12,
    borderColor: 'lightgray',
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 20,
  },
});

export default Header;

