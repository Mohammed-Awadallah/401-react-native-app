import react from "react";
import { StyleSheet, Text , View } from "react-native";
import {MaterialIcons} from '@expo/vector-icons';


export default function Footer(){
    return(
        <View style={styles.footer}>
            <View>
                <Text style = {styles.footerText}>
                Mohammed Awadallah ASAC 2022
                </Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    footer : {
        width : '100%',
        height : '40%',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
    } , 

    footerText :{
        fontWeight : 'bold',
        fontSize : 20,  
        color : '#333',
        letterSpacing : 1,

    } , 

})