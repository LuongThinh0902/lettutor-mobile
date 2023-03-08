import React from 'react';
import { Text, View, Image } from 'react-native';

const Header = (props) => {
  const { headerStyle, bgHeader, changeLanguage } = styles;

  return (
    <View style = {bgHeader}>     
      <Image 
        style={styles.logo}
        source={require('./assets/logoLet.png')}>
      </Image>
      <Text style = { headerStyle }>{props.headerText}</Text>
      <View >
        <Image
          style={changeLanguage}        
          source={require('./assets/usa.png')}>
        </Image>  
      </View>
    </View>
  );
};

const styles = {
  bgHeader: {
    flexDirection: 'row',
    marginTop: 0,
    backgroundColor: 'white',
    //justifyContent:'center',
    //alignItems:'center',
    elevation: 10,
    height: 100,
    shadowColor: '#000',
    shadowOffset:{width: 0, height:10},
    shadowOpacity: 0.5,
    position: 'relative',
    width: '100%',
  },
  headerStyle: {
    fontSize: 40,
    margin: 10,
    color: '#0077FF',
    fontWeight: 'bold',
  },
  logo:{
    resizeMode: 'contain',
    width: '50%',
    margin: 10,
  },
  changeLanguage:{
    borderWidth: 5,
    borderColor: 'gray',
    // alignSelf: 'flex-end',
    // margin: 30,
    // marginLeft: 5,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
};

export default Header;

