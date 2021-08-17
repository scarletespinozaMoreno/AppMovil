
import {
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
  Text
} from 'react-native';
import React ,{useState, useEffect, useContext,useReducer} from 'react'
//import {auth,db} from '../firebase/firebase.js'
import ReservaDisplay from './ReservaDisplay.js';
import Reserved from './Reserved';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';


import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormButton from '../components/FormButton';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';


import storage from '@react-native-firebase/storage';

import FirebaseReducer from '../context/firebase/firebaseReducer'

import {
    Container,
    Separator,
    Content,
    List,
    ListItem,
    Thumbnail,
    Body
} from 'native-base'

import globalStyles from '../styles/global'
import FirebaseContext from '../context/firebase/firebaseContext.js';
//import _ from 'lodash'

const Historial = ({navigation}) => {

 // var id = auth.currentUser.email;//mail para el id
  const [loading, setLoading] = useState(true);
  const [habitaciones, setHabitaciones] = React.useState([])
  const [habitaciones2, setHabitaciones2] = React.useState([])
  const { user, logout } = useContext(AuthContext);
 

  React.useEffect(() => {
    const obtenerDatos = async () => {
         try {
            const snapshot = await firestore().collection('usuarios').doc(user.email).collection("reservas").where("existencia", "==", true).get()
            const snapshot2 = await firestore().collection('usuarios').doc(user.email).collection("reservas").where("existencia", "==", false).get()//datos con existncia igual true
           // console.log("data",snapshot)
            const arrayData=snapshot.docs.map((doc) => (
                {
                ...doc.data()
            }))
            const arrayData2=snapshot2.docs.map((doc) => (
              {
              ...doc.data()
          }))
          setHabitaciones(arrayData)
          setHabitaciones2(arrayData2)
        } catch (error) {
          console.log(error)
        }
      }
       obtenerDatos()  
       navigation.addListener("focus", () => setLoading(!loading));
}

// eslint-disable-next-line react-hooks/exhaustive-deps
, [ navigation, loading ])











    return (
      <Container styles={globalStyles.contenedor}>
         <Content style={{ backgroundColor: '#FFF' }}>
      <List>

              {habitaciones.map((habitacion,index)=> {
                  return <ReservaDisplay
                  key={index}
                  habitacion={habitacion}/>;               
          })}
      
      </List>
      <List>

              {habitaciones2.map((habitacion2,index)=> {
                  return <Reserved
                  key={index}
                  habitacion2={habitacion2}/>;               
          })}
      
      </List>
      </Content>
      </Container>
    
    );
};


export default Historial