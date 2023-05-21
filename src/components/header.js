import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Header = () => {

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
    return (
    <View style = {styles.bgHeader}>    
        <Image 
          style={styles.logo}
          source={require('../../assets/logoLet.png')}>
        </Image>
        <TouchableOpacity 
            onPress={()=>toggleLanguage()}>  
            <Image
            style={styles.iconLanguage}
            source={userLanguage=="en"?require('../../assets/usa.png'):require('../../assets/vn.png')}>
            </Image>      
        </TouchableOpacity>
       
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
  iconLanguage:{
    borderWidth: 12,
    borderColor: 'lightgray',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
});

export default Header;

