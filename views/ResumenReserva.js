//PANTALLA PARA VER EL RESUMEN DE MI RESERVA(ANTES DE CONFIRMAR LA RESERVA)
import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, View,TouchableOpacity } from 'react-native';
import ReservaContext from '../context/reserva/reservaContext'
import {
    Container, Content, List,
    ListItem, Thumbnail, Text, Left, Body, Button, H1, H2, Footer, FooterTab
} from 'native-base'
import globalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import FirebaseContext from '../context/firebase/firebaseContext'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';
import DatePicker, {registerLocale}from "react-datepicker";
import moment from 'moment'





const ResumenReserva = () => {

    const { user, logout } = useContext(AuthContext);
    const { habitaciones } = useContext(ReservaContext);
    const { nombre, imagen, descripcion, precio, categoria, existencia } = habitaciones;
    const [userData, setUserData] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisibleSalida, setDatePickerVisibilitySalida] = useState(false);
    //const [dateIn, setDateIn] = useState(null);
    //const [dateOut, setDateOut] = useState(null);
    const options = ['Efectivo', 'Tarjete de credito', 'Tarjeta de debito']
    const [metodoPago, setMetodoPago] = useState();
    const [diaLlegada,setDiaLlegada] = useState(null)
    const [diaSalida,setDiaSalida] = useState(null)
    const[diaLlegadaString,setDiaLlegadaString]=useState(null)
    const[diaSalidaString,setDiaSalidaString]=useState(null)


  

    const showDatePickerSalida = () => {
        setDatePickerVisibilitySalida(true);
    };

    const hideDatePickerSalida = () => {
        setDatePickerVisibilitySalida(false);
        
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
        
    };


    const handleConfirm = (date) => {
        setDatePickerVisibility(false);
        setDiaLlegada(moment(date).toDate());
        setDiaLlegadaString(moment(date).format('MMMM, do YYY HH:mm'));
        
    };
    const handleConfirmSalida = (date) => {
        setDatePickerVisibilitySalida(false);
        setDiaSalida(moment(date).toDate());
        setDiaSalidaString(moment(date).format('MMMM, do YYY HH:mm'));
        
    };


    //metodo obtener usuario
    const getUser = async () => {
        await firestore()
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




    //subir reserva
    const handleUpdate = async () => {
        await firestore()
            .collection('usuarios')
            .doc(user.email)
            .collection("reservas")
            .add({
                diasFuera: "",
                endDate: diaSalida,
                existencia: true,
                id: nombre,
                imagen: imagen,
                nombre: categoria,
                precio: precio,
                startDate: diaLlegada,
                total: total,
                metodoPago:metodoPago



            })
            .then(() => {
                pedidoRealizado(reserva.id)
                navigation.navigate("ProgresoDeReserva")



            })
    }


    const navigation = useNavigation();
    //funcion elimina un producto de la reserva
    const confirmarEliminacion = id => {
        Alert.alert(
            'Deseas eliminar este servicio?',
            'Una vez eliminado no se puede recuperar',
            [
                {
                    text: "Confirmar",
                    onPress: () => {
                        //eliminar del state
                        eliminarProducto(id);

                    }
                },
                { text: 'Cancelar', style: 'cancel' }
            ]
        )

    }

    //funcion que redireccion a progreso reserva

    /* const progresoReserva = () => {
         
         Alert.alert(
             'Revisa tu Reserva',
             'Una vez que realizas tu reserva, no podras cambiarlo',
             [
                 {
                     text: "Confirmar",
                     onPress: async () => {
 
                         //crear el objeto
                         const reservaObj = {
                             diasFuera: "",
                             endDate: "",
                             existencia: true,
                             id: nombre,
                             imagen: imagen,
                             nombre: categoria,
                             precio: precio,
                             startDate: "",
                             total: total
                         }
                         try {
                             const reserva = await firebase.db.collection('usuarios').doc(user.email).collection("reservas").add({reservaObj})
                             pedidoRealizado(reserva.id)
 
                             //redireccionar a progreso
                             navigation.navigate('ProgresoDeReserva')
                         }
                         catch (error) {
                             console.log(error)
                         }
 
 
 
                         //escribir el pedido a firebase
 
 
                         navigation.navigate('ProgresoDeReserva')
                     }
                 },
                 { text: 'Revisar', style: 'cancel' }
             ]
         )
     }*/


    //contextPedido
    const { reserva, total, mostrarResumen, eliminarProducto, pedidoRealizado } = useContext(ReservaContext);

    useEffect(() => {
        getUser();
        calcularTotal();
    }, [reserva]);

    const calcularTotal = () => {
        let nuevoTotal = 0;
        nuevoTotal = reserva.reduce((nuevoTotal, articulo) =>
            nuevoTotal + articulo.total, 0);
        mostrarResumen(nuevoTotal)

    }

    return (
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>Resumen Pedido</H1>
                {reserva.map((habitaciones, i) => {
                    const { cantidad, nombre, imagen, id, precio } = habitaciones
                    return (
                        <List key={id + i}>
                            <ListItem
                                thumbnail>
                                <Left>
                                    <Thumbnail large square source={{ uri: imagen }} />
                                </Left>
                                <Body>
                                    <Text>{nombre}</Text>
                                    <Text>Cantidad: {cantidad}</Text>
                                    <Text>Precio: ${precio}</Text>
                                    <Button
                                        onPress={() => confirmarEliminacion(id)}
                                        full
                                        danger
                                        style={{ marginTop: 20 }}
                                    >
                                        <Text
                                            style={[globalStyles.botonTexto, { color: "#FFF" }]}
                                        >Eliminar
                                        </Text>
                                    </Button>

                                </Body>

                            </ListItem>
                           
                        </List>
                    )
                })}

                <Text style={globalStyles.cantidad}>Total a Pagar: ${total}</Text>

            </Content>

            <Footer>
                <FooterTab>
                    <Button

                        onPress={() => handleUpdate()}
                        style={[globalStyles.boton, { marginTop: 0 }]}
                        full

                    >
                        <Text
                            style={globalStyles.botonTexto}>
                            Ordenar Reserva
                        </Text>
                    </Button>

                </FooterTab>
            </Footer>


        </Container >
    );
};

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ffffff"
    },
    button:{
        width:250,
        height:50,
        backgroundColor:"#1a6199",
        borderRadius:30,
        justifyContent:'center',
        marginTop:15

    },
    text:{
        fontSize:18,
        color:'white',
        textAlign:'center'
    }
})

export default ResumenReserva