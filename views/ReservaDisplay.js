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

const ReservaDisplay = ({ habitacion }) => {
    const desde = moment(habitacion.startDate.toDate()).format('LL')
    const hasta = moment(habitacion.endDate.toDate()).format('LL')

    return (





        <Card>
            <CardItem>
                <Body>
                    <H1 style={globalStyles.titulo}>Reservas actuales</H1>
                    <H2>{habitacion.nombre}</H2>
                    <Image style={globalStyles.imagen} source={{ uri: habitacion.imagen }} />

                    <Text style={globalStyles.textp} >Desde: {desde}</Text>
                    <Text style={globalStyles.textp}>Hasta: {hasta}</Text>
                    <Text style={globalStyles.textp}>Precio pagado: {habitacion.precio}</Text>

                </Body>
            </CardItem>
        </Card>

     










    )

}

export default ReservaDisplay