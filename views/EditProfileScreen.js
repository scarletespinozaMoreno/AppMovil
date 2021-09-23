//PANTALLA EN EL CUAL ESTA PROGRAMADA A LO QUE EDITAR PERFIL SE REFIERE
import React, { useEffect, useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';


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

import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const EditProfileScreen = () => {

 

  const { user, logout } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);


//metodo para renderInner
renderInner = () =>(
  <View style={styles.panel}>
  <View style={{alignItems: 'center'}}>
    <Text style={styles.panelTitle}>Sube una foto</Text>
    <Text style={styles.panelSubtitle}>Elige tu foto de perfil</Text>
  </View>
  <TouchableOpacity style={styles.panelButton}  onPress={takePhotoFromCamera}>
    <Text style={styles.panelButtonTitle} >Tomate una foto </Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary} >
    <Text style={styles.panelButtonTitle} >Elige de tu galeria</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={styles.panelButton}
    onPress={() => this.bs.current.snapTo(1)}>
    <Text style={styles.panelButtonTitle}>Cancelar</Text>
  </TouchableOpacity>
</View>
  
);



//metodo para renderHeader
 renderHeader = ()=>(
  <View style={styles.header}>
  <View style={styles.panelHeader}>
    <View style={styles.panelHandle} />
  </View>
</View>
  
);




//metodo consigue el usuario
  const getUser = async () => {
    const currentUser = await firestore()
      .collection('usuarios')
      .doc(user.email)
      .get()
      .then((documentSnapShot) => {
        if (documentSnapShot.exists) {
          console.log('User data', documentSnapShot.data())
          setUserData(documentSnapShot.data())
        }
      })

  }

  const handleUpdate = async () => {
    let imgUrl = await uploadImage();

    if (imgUrl == null && userData.photoURL) {
      imgUrl = userData.photoURL;
    }
    firestore()
      .collection('usuarios')
      .doc(user.email)
      .update({
        name: userData.name,
        cellphone: userData.cellphone,
        ci: userData.ci,
        direction: userData.direction,
        photoURL: imgUrl
      })
      .then(() => {
        console.log("User update");
        Alert.alert(
          'Perfil actualizado',
          'Tu perfil ha sido actualizado'
        )
      })
  }

  //subir la foto a fb
  const uploadImage = async () => {
    if( image == null ) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null)

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  };

  //funcion toma foto de camara
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  }
 
  //funciona elige foto de galeria
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  }







  useEffect(() => {
    getUser();
  }, []);







  bs = React.createRef();
  fall = new Animated.Value(1);

  return (

    
      <View style={styles.container}>
        <KeyboardAwareScrollView>
        <BottomSheet
          ref={this.bs}
          snapPoints={[330,0]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          initialSnap={1}
          callbackNode={this.fall}
          enabledGestureInteraction={true}
         />
          

        <Animated.View style={{ margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
     }}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => this.bs.current.snapTo(0)} >
              <View style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: "center"
              }}>
                <ImageBackground
                  source={{
                    uri: userData ? userData.photoURL || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}
                  style={{ height: 100, width: 100 }}
                  imageStyle={{borderRadius:15}}
                >
                  <View style={{
                    flex:1,
                    justifyContent:'center',
                    alignItems:'center'
                  }}>
                    <Icon name="camera" size={35} color="fff" style={{
                      opacity:0.7,
                      alignItems:'center',
                      justifyContent:'center',
                      borderWidth:1,
                      borderColor:'fff',
                      borderRadius:10
                    }}/>
                  </View>

                </ImageBackground>
              </View>
            </TouchableOpacity>
            
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#333333" size={20} />
          <TextInput
            placeholder="Nombres"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.name : ''}
            onChangeText={(txt) => setUserData({ ...userData, name: txt })}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <Ionicons name="ios-clipboard-outline" color="#333333" size={20} />
          <TextInput
            multiline
            numberOfLines={3}
            placeholder="Cedula"
            placeholderTextColor="#666666"
            value={userData ? userData.ci : ''}
            onChangeText={(txt) => setUserData({ ...userData, ci: txt })}
            autoCorrect={true}
            style={[styles.textInput, { height: 40 }]}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" color="#333333" size={20} />
          <TextInput
            placeholder="Telefono"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            value={userData ? userData.cellphone : ''}
            onChangeText={(txt) => setUserData({ ...userData, cellphone: txt })}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="globe" color="#333333" size={20} />
          <TextInput
            placeholder="Direccion domiciliaria"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.direction : ''}
            onChangeText={(txt) => setUserData({ ...userData, direction: txt })}
            style={styles.textInput}
          />
        </View>

        <FormButton buttonTitle="Actualizar Datos" onPress={handleUpdate} />
            </View>
        </Animated.View>
        </KeyboardAwareScrollView>
      </View>

     
   
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    width: '100%',
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#2e64e5',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontFamily:'JosefinSans-Bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#333333',
    fontFamily:'JosefinSans-Bold'
  },
});