//PANTALLA FINAL DE LA RESERVA
import React,{useContext,useEffect,useState} from 'react';
import {View,StyleSheet} from 'react-native';
import { Container,Text,H1,H3,Button} from 'native-base';
import globalStyles from '../styles/global'
import { useNavigation,useTheme } from '@react-navigation/native'

import ReservaContext from '../context/reserva/reservaContext'
import firebase from '../firebase'
import Countdown from 'react-countdown';
import FormButton from '../components/FormButton';

const ProgresoDeReserva = () =>{

    const navigation = useNavigation();
    const { idpedido } =useContext(ReservaContext)

   
  

 
    //countdown muestra
   
    return (
        <Container style={globalStyles.contenedor}>
            <View style={[globalStyles.contenido,{marginTop:50}]}>
              

               
                
                    
                        <>
                        <H1 style={styles.textoCompleadto}>Reserva Lista</H1>
                        <H3 style ={styles.textoCompleadto}>Le esperamos en el Hostal!</H3>
                      

                        <FormButton buttonTitle="Comenzar nueva reserva" onPress={()=> 
                            navigation.navigate("Habitacion")} />
                      
                        </>

                    
                

            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    tiempo:{
        marginBottom: 20 ,
        fontSize:60,
        textAlign:'center',
        marginTop:30
    },
    textoCompleadto:{
        textAlign:'center',
        textTransform:'uppercase',
        marginBottom:20
    }
})

export default ProgresoDeReserva