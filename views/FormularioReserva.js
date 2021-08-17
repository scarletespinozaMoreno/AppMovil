import React, { useState,useContext,useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import ReservaContext from '../context/reserva/reservaContext'
import {
    Container,Footer,FooterTab, Content, Input, Grid, Col, Form, Icon, Button, Body, Text, H1, Card, CardItem
} from 'native-base'
import globalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'


const FormularioReserva = () => {

    //state para cantidades
    const [cantidad, guardarCantidad] = useState(1)
    const [total,guardarTotal]= useState('0')

    //context
    const {habitaciones,guardarReserva}= useContext(ReservaContext)
    const { precio } = habitaciones;

    //redireccionar
    const navigation = useNavigation();

    //confirmar si la reserva es correcta
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

    //en cuanto el componente carga, calcular la cantidad a pagar
    useEffect(()=>{
        calcularTotal();
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

    return (
        <Container>
            <Content>
                <Form>
                    <Text style={globalStyles.titulo}>Numero de Personas</Text>
                    <Grid>
                        <Col>
                            <Button
                                props
                                style={{ height: 80, justifyContent: 'center' }}
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
                                props
                                style={{ height: 80, justifyContent: 'center' }}
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
                    onPress={()=> confirmarReserva()}
                    >
                        <Text style = {globalStyles.botonTexto}>Agregar a la Reserva</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
};

export default FormularioReserva