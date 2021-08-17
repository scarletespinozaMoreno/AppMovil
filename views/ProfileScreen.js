import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import FormButton from '../components/FormButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

import storage from '@react-native-firebase/storage';









const ProfileScreen = ({navigation,route}) => {

  const [loading, setLoading] = useState(true);
  const {user,logout}=useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState(null);

  const getUser = async() => {
    await firestore()
    .collection('usuarios')
    .doc(user.email)
    .get()
    .then((documentSnapShot)=>{
        if(documentSnapShot.exists){
            setUserData(documentSnapShot.data())
        }
  
  
    })
  
  }
  

  useEffect(() => {
    getUser();
    navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading]);
  



  return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', justifyContent:'center', alignItems:'center' }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <Image style={styles.photoURL} source={{uri: userData ? userData.photoURL || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}} />
        <Text style={styles.userName}>Nombres : {userData ? userData.name  || 'Llenar Nombre' : 'Llenar Nombre'}</Text>
        <Text style={styles.aboutUser}>Cedula: {userData ? userData.ci  || 'Llenar #Cedula' : 'Llenar #Cedula'}</Text>
        <Text style={styles.aboutUser}>Celular: {userData ? userData.cellphone || 'Llenar #Celular' : '#Celular'}</Text>
        <Text style={styles.aboutUser}>Direccion: {userData ? userData.direction  || 'Llenar Direccion' : 'Llenar Direccion'}</Text>
        <View style={styles.userBtnWrapper}>
          

          <FormButton  buttonTitle="Editar perfil"  onPress={() => { navigation.navigate('EditProfile')}}>
          

          </FormButton>
         
        </View>
       
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    
  },
  photoURL: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontFamily:'JosefinSans-Bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontFamily:'JosefinSans-Bold',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontFamily:'JosefinSans-Bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});