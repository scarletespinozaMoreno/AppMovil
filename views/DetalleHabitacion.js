//PANTALLA EN EL CUAL TENGO EL DETALLE DE LA HABITACION QUE ESCOJO
import React, { useContext } from 'react';
import { Image } from 'react-native';
import ReservaContext from '../context/reserva/reservaContext'
import {
    Container, Content, Footer, FooterTab, Button, Body, Text, H1, Card, CardItem
} from 'native-base'
import globalStyles from '../styles/global'
import {useNavigation} from '@react-navigation/native'



const DetalleHabitacion = () => {
    //pedido context
    const { habitaciones } = useContext(ReservaContext);
    const { nombre, imagen, descripcion, precio,categoria } = habitaciones;

    //redireccionar
    const navigation = useNavigation();

    return (
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>{categoria}</H1>
                <Card>
                    <CardItem>
                        <Body>
                            <Image style={globalStyles.imagen} source={{ uri: imagen }} />

                            <Text style={{marginTop:20}}>{descripcion}</Text>
                            <Text style={globalStyles.cantidad}>Precio: $ {precio}</Text>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
            <Footer>
                <FooterTab>
                    <Button 
                    style={globalStyles.boton}
                    onPress = {()=>navigation.navigate('FormularioReserva')}
                    >
                        <Text style = {globalStyles.botonTexto}>Ordernar Producto</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
};

export default DetalleHabitacion