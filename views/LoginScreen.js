//PANTALLA PARA LOGIN SCREEN
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,

} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Icon } from 'react-native-elements'



const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { login } = useContext(AuthContext)


  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image
          source={require('../assets/favicon.jpg')}
          style={styles.logo}
        />

        <FormInput
          labelValue={email}
          placeholderText="Email"
          onChangeText={(userEmail) => setEmail(userEmail)}
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormInput
          labelValue={password}
          placeholderText="Contraseña"
          onChangeText={(userPassword) => setPassword(userPassword)}
          iconType="lock"
          secureTextEntry={true}
         

        />


        <FormButton
          buttonTitle="Iniciar Sesion"
          onPress={() => login(email, password)}
        />

        <TouchableOpacity style={styles.forgotButton} onPress={() => { }}>
          <Text style={styles.navButtonText}>Olvidaste tu contrasena?
          </Text>
        </TouchableOpacity>





        <TouchableOpacity style={styles.forgotButton}
          onPress={() => navigation.navigate('Signup')}
        >

          <Text style={styles.navButtonText}>No tienes cuenta? Crea una aqui
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>

  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
  },
  logo: {
    height: 160,
    width: 160,
    resizeMode: 'cover',
    borderRadius: 150,
    //margin: 'auto',


  },
  text: {

    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',

  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontFamily:'JosefinSans-Bold',
    color: '#2e64e5',

  },
});