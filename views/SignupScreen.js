//PANTALLA EN LA CUAL CREO UN USUARIO(rEGISTRO)
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"



const SignupScreen= ({navigation}) => {
  const [email,setEmail]=useState();
  const [password,setPassword]= useState();
  const [confirmPassword,setConfirmPassword]=useState();

  const{register}=useContext(AuthContext)
  return (
    <KeyboardAwareScrollView>
    <View style={styles.container}>
    <Text style={styles.text}>Crear una cuenta</Text>
    
    <FormInput 
    labelValue={email}
    placeholderText="Email"
    onChangeText={(userEmail)=> setEmail(userEmail)}
    iconType="user"
    keyboardType="email-address"
    autoCapitalize="none"
    autoCorrect={false}
    />

<FormInput 
    labelValue={password}
    placeholderText="Contraseña"
    onChangeText={(userPassword)=> setPassword(userPassword)}
    iconType="lock"
    secureTextEntry={true}
    />
  <FormInput 
    labelValue={confirmPassword}
    placeholderText="Confirmar Contraseña"
    onChangeText={(userPassword)=> setConfirmPassword(userPassword)}
    iconType="lock"
    secureTextEntry={true}
    />


  <FormButton
    buttonTitle="Crear Cuenta"
    onPress={()=>register(email,password)}
 />
  <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity 
        onPress={() => alert('Terms Clicked!')}
        >
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
          Privacy Policy
        </Text>
      </View>


    


 
  <TouchableOpacity style={styles.forgotButton} onPress={()=>navigation.navigate('Login') }>
    <Text style={styles.navButtonText}>Tienes una cuenta? Logueate
    </Text>
  </TouchableOpacity>
    </View>

    </KeyboardAwareScrollView>
    
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontFamily:'JosefinSans-Bold',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontFamily:'JosefinSans-Bold',
    color: '#2e64e5',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontFamily:'JosefinSans-Bold',
    color: 'grey',
  },
});