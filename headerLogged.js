import React, { useState } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const Header = () => {
    // const [language, setLanguage] = React.useState({
    // value: '',
    // list: [
    //     { _id: 1, name: 'English' },
    //     { _id: 2, name: 'Vietnamese' },
    //     ],
    // selectedList: [],
    // error: '',
    // });
  // const chooseLanguage = {}
  const showListLanguage = () => {
  }
    return (
    <View style = {styles.bgHeader}>    
        <Image 
          style={styles.logo}
          source={require('./assets/logoLet.png')}>
        </Image>
        <View style={styles.rightHeader}>            
            <Image
                style={styles.iconLanguage}
                onClick = {showListLanguage}      
                source={require('./assets/usa.png')}>
            </Image>  

            <View style={styles.menu}>

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

