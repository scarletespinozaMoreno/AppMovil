import React, { useContext, useEffect, Fragment } from 'react';
import { StyleSheet } from 'react-native';
import FirebaseContext from '../context/firebase/firebaseContext'

import {
    Container,
    Separator,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Body
} from 'native-base'

import globalStyles from '../styles/global'
//import _ from 'lodash'

const Actividades = () => {
    //context Firebase
    const { actividad, obtenerActividades } = useContext(FirebaseContext);
    


    useEffect(() => {
        obtenerActividades();


    }, []);

    const mostrarHeading = (categoria, i) => {

        if (i > 0) {
            const categoriaAnterior = actividad[i - 1].categoria
            if (categoriaAnterior !== categoria) {
                return (
                    <Separator style={styles.separador}>
                        <Text style={styles.separadorTexto}>
                            Duracion: 
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
            <Content style={{ backgroundColor: '#fff' }}>
                <List>
                    {actividad.map((actividades, i) => {
                        //console.log(habitacion)
                        const { Capacidad,Descripcion,Duracion,Hora,Imagen,Titulo,fechaInicio } = actividadess;
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
        color:'#fff',
        fontFamily:'JosefinSans-Bold',
        textTransform:'uppercase'

    }
})

export default Actividades
