
import React, {Component} from "react" 
import { View,  Modal, Text,Image,StyleSheet} from "react-native" 
const Popup= ({show,title})=>{
    return (
        <View style={show?styles.centeredView:styles.centerViewNotShow}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={show}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{title}</Text>
              </View>
            </View>
          </Modal>
           
        </View>
      );
    };
    
const styles = StyleSheet.create({
    centerViewNotShow:{

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    image:{
        width:65,
        height:65
    },
    modalText: {
    marginBottom: 15,
    textAlign: "center"
    }
});
export default Popup
