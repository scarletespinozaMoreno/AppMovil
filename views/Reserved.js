//PANTALLA PARA VER LAS RESERVAS ANTERIORES
import React from 'react';
import { Image } from 'react-native';
import { withRouter } from 'react-router-dom';
import moment from 'moment'
import 'moment/locale/es'
import globalStyles from '../styles/global'
import {
    Container, Content, List,
    ListItem, Thumbnail, Text, Left, Body, Button, H1, H2, Footer, FooterTab, Card, CardItem, H3, H4, H5
} from 'native-base'

export const habitacionContext = React.createContext()

const ReservaDisplay= ({ habitacion2 }) => {
    const desde = moment(habitacion2.startDate.toDate()).format('LL')
    const hasta = moment(habitacion2.endDate.toDate()).format('LL')

    return (

        <Card>
            <CardItem>
                <Body>
                    <H1 style={globalStyles.titulo}>Reservas pasadas</H1>
                    <H2>{habitacion2.nombre}</H2>
                    <Image style={globalStyles.imagen} source={{ uri: habitacion2.imagen }} />

                    <Text style={globalStyles.textp} >Desde: {desde}</Text>
                    <Text style={globalStyles.textp}>Hasta: {hasta}</Text>
                    <Text style={globalStyles.textp}>Precio pagado: {habitacion2.precio}</Text>

                </Body>
            </CardItem>
        </Card>
    )
}
export default ReservaDisplay