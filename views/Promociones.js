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

const Promociones = () => {
    //context Firebase
    const { promocion, obtenerPromociones } = useContext(FirebaseContext);
    


    useEffect(() => {
        obtenerPromociones();


    }, []);

    const mostrarHeading = (categoria, i) => {

        if (i > 0) {
            const categoriaAnterior = promocion[i - 1].categoria
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
                    {promocion.map((promociones, i) => {
                        //console.log(habitacion)
                        const { Cantidad,Descripcion,Duracion,Imagen,Titulo,f_final,f_inicial } = promociones;
                        return (
                            <Fragment >
                                {mostrarHeading(Duracion, i)}
                                <ListItem
                        
                                >
                                    <Thumbnail //imagen
                                        large square
                                        source={{ uri: Imagen }}
                                    />
                                    <Body>
                                        <Text>{Titulo}</Text>
                                        <Text
                                            note
                                            numberOfLines={10}
                                        >{Descripcion}</Text>

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

export default Promociones