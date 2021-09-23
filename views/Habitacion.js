//PANTALLA EN LA CUAL OBTENGO TODAS LAS HABITACIONES DE LA HOSTERIA(FIREBASE)
import React, { useContext, useEffect, Fragment } from 'react';
import { StyleSheet } from 'react-native';
import FirebaseContext from '../context/firebase/firebaseContext'
import ReservaContext from '../context/reserva/reservaContext'

import {useNavigation} from '@react-navigation/native'
import {
    Container,
    Separator,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Left,
    Body
} from 'native-base'

import globalStyles from '../styles/global'
import _ from 'lodash'

const Habitacion = () => {
    //context Firebase
    const { habitacion, obtenerProductos } = useContext(FirebaseContext);
    
    //context de pedido
    const{ seleccionarProducto }=useContext(ReservaContext);
    //hook para redireccionar
    const navigation=useNavigation();

    useEffect(() => {
        obtenerProductos();


    }, []);

    const mostrarHeading = (categoria, i) => {

        if (i > 0) {
            const categoriaAnterior = habitacion[i - 1].categoria
            if (categoriaAnterior !== categoria) {
                return (
                    <Separator style={styles.separador}>
                        <Text style={styles.separadorTexto}>
                            {categoria}
                        </Text>
                    </Separator>
                )
            }
        } else {
            return (
                <Separator style={styles.separador}>
                    <Text style={styles.separadorTexto}>
                        {categoria}
                    </Text>
                </Separator>
            )

        }

    }




    return (
        <Container styles={globalStyles.contenedor}>
            <Content style={{ backgroundColor: '#FFF' }}>
                <List>
                    {habitacion.map((habitaciones, i) => {
                        console.log(habitacion)
                        const { categoria, descripcion, imagen, nombre, precio, id } = habitaciones;
                        return (
                            <Fragment key={id}>
                                {mostrarHeading(categoria, i)}
                                <ListItem
                                onPress={()=>{

                                    //eliminar algunas propiedades
                                    const{ existencia,...habitaciones2}=habitaciones;
                                    navigation.navigate('DetalleHabitacion');

                                    seleccionarProducto(habitaciones2)
                                }}
                                >
                                    <Thumbnail //imagen
                                        large square
                                        source={{ uri: imagen }}
                                    />
                                    <Body>
                                        
                                        <Text
                                            note
                                            numberOfLines={10}
                                        >{descripcion}</Text>
                                        <Text style={{textAlign:'right',color: 'black', fontSize:22, fontFamily:'JosefinSans-Bold'}}>$ {precio}</Text>

                                    </Body>
                                </ListItem>

                            </Fragment>
                        )

                    })}
                </List>
            </Content>
        </Container>
    );
};

const styles= StyleSheet.create({
    separador:{
        backgroundColor:'#1a6199'
    },
    separadorTexto:{
        color:'#FFFFFF',
        fontFamily:'JosefinSans-Bold',
        textTransform:'uppercase'

    }
})

export default Habitacion