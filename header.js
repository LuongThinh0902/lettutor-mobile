import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

// const Header = (props) => {
//   const { headerStyle, bgHeader, changeLanguage } = styles;
const Header = () => {

  // const chooseLanguage = {}
  const showListLanguage = () => {
  }
    return (
    <View style = {styles.bgHeader}>    
        <Image 
          style={styles.logo}
          source={require('./assets/logoLet.png')}>
        </Image>
      {/* <Text style = { headerStyle }>{props.headerText}</Text> */}
        <Image
          style={styles.iconLanguage}
          onClick = {showListLanguage}      
          source={require('./assets/usa.png')}>
        </Image>  
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
  // headerStyle: {
  //   fontSize: 40,
  //   margin: 10,
  //   color: '#0077FF',
  //   fontWeight: 'bold',
  // },
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

