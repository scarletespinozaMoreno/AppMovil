//PANTALLA PREVIA A LA RESERVA
import React, { useState,useContext,useEffect } from 'react';
import { Alert, StyleSheet,View,TouchableOpacity } from 'react-native';
import ReservaContext from '../context/reserva/reservaContext'
import {
    Container,List,ListItem,Thumbnail,Footer,FooterTab, Content, Input, Grid, Col, Form, Icon, Button, Body, Text, H1, Card, CardItem,H2
} from 'native-base'
import globalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'

import moment from 'moment'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';


const FormularioReserva = () => {

    //state para cantidades
    const [cantidad, guardarCantidad] = useState(1)
    const [total,guardarTotal]= useState('0')

    //context

    const { user, logout } = useContext(AuthContext);
    const { habitaciones,pedidoRealizado,reserva} = useContext(ReservaContext);
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
  
    //redireccionar
    const navigation = useNavigation();



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

    //confirmar si la reserva es correcta
    /*
    const confirmarReserva = ()=>{
        Alert.alert(
            'Deseas confirmar tu reserva?',
            'Un reserva confirmada ya no se podra modificar',
            [
                {
                    text:'Confirmar',
                    onPress: ()=>{
                        //almacenar la reserva a la reserva principal
                        const reserva = { 
                            ...habitaciones,
                            cantidad,
                            total
                        }
                        guardarReserva(reserva)
                        //navegar hacia el resumen
                        navigation.navigate('ResumenReserva')
                    },
                },
                {
                    text:'Cancelar',
                    style:'cancel'
                }
            ]
        )
    }
    */

    //en cuanto el componente carga, calcular la cantidad a pagar
    useEffect(()=>{
        calcularTotal();
        getUser();
    },[cantidad]);

    //calcula el valor de la reserva
    const calcularTotal = ()=> {
        const totalPagar = precio * cantidad
        guardarTotal(totalPagar);
    }


    //decrementarUno
    const decrementarUno = () => {
        if (cantidad > 1) {
            const nuevaCantidad = parseInt(cantidad) - 1;
            guardarCantidad(nuevaCantidad)

        }
    }

    //incremento en 1 la cantidad
    const incrementarUno = () => {
        const nuevaCantidad = parseInt(cantidad) + 1;
        guardarCantidad(nuevaCantidad)
    }


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


    return (
        <Container>
            <Content>

            <Text style={globalStyles.titulo}>Elija su metodo de pago</Text>
                            <Picker
                                    
                                    selectedValue={metodoPago}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setMetodoPago(itemValue)
                                    }>
                                    <Picker.Item label="Efectivo" value="efectivo" />
                                    <Picker.Item label="Tarjeta De Credito" value="tCredito" />
                                    <Picker.Item label="Tarjeta De Debito" value="tDebito" />
                                </Picker>
                                <Text style={globalStyles.titulo}>Elija su llegada y salida</Text>
                            <ListItem>
                                <View style={styles.container}>
                                    <Text style={{color:'black', fontSize:12}}>Dia de llegada: {diaLlegadaString}</Text>
                                    <TouchableOpacity style={styles.button} onPress={showDatePicker}>
                                        <Text style={styles.text}>Llegada</Text>
                                    </TouchableOpacity>
                                    <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                    />
                                </View>
                            </ListItem>

                            <ListItem>
                                <View style={styles.container}>
                                    <Text style={{color:'black', fontSize:12}}>Dia de salida: {diaSalidaString}</Text>
                                    <TouchableOpacity style={styles.button} onPress={showDatePickerSalida}>
                                        <Text style={styles.text}>Salida</Text>
                                    </TouchableOpacity>
                                    <DateTimePickerModal
                                    isVisible={isDatePickerVisibleSalida}
                                    mode="date"
                                    onConfirm={handleConfirmSalida}
                                    onCancel={hideDatePickerSalida}
                                    />
                                </View>
                            </ListItem>

                <Form>
                    <Text style={globalStyles.titulo}>Numero de Personas</Text>
                    <Grid>
                        <Col>
                            <Button
                                
                                props
                                style={{ height: 60, alignContent: 'center',backgroundColor:"#1a6199" }}
                                onPress={() => decrementarUno()}
                            >

                                <Icon
                                    style={{ fontSize: 40 }}
                                    name="remove" />
                            </Button>
                        </Col>
                        <Col>
                            <Input
                                style={{ textAlign: 'center', fontSize: 20 }}
                                value={cantidad.toString()}
                                keyboardType="numeric"
                                onChangeText={cantidad => guardarCantidad(cantidad)}
                            />

                        </Col>

                        <Col>
                            <Button
                                color="#1a6199"
                                props
                                style={{ height: 60, alignContent: 'center',backgroundColor:"#1a6199" }}
                                onPress={() => incrementarUno()}
                            >
                                <Icon
                                    style={{ fontSize: 40 }}
                                    name="add" />
                            </Button>
                        </Col>
                    </Grid>
                    <Text
                    style={globalStyles.cantidad}>
                        Subtotal: ${total}
                    </Text>
                </Form>
            </Content>
            <Footer>
                <FooterTab>
                    <Button 
                    style={globalStyles.boton}
                    onPress={()=> handleUpdate()}
                    >
                        <Text style = {globalStyles.botonTexto}>Hacer la reserva</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
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


export default FormularioReserva