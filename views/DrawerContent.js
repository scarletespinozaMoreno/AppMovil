//DRAWER ESQUINERO EN EL CUAL TENGO ALGUNOS ATAJOS "ACTIVIDADES", "RESERVA", "PROMOCIONES", ETC Y CERRAR SESION
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native'
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer'
import {
    Drawer
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../navigation/AuthProvider';


export function DrawerContent(props) {
    const { user, logout } = useContext(AuthContext);
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>

                    <Drawer.Section style={styles.bottomDrawerSection}>

                        

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name="account-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label='Perfil'
                            onPress={() => { props.navigation.navigate('Home') }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name="cash"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label='Promociones'
                            onPress={() => { props.navigation.navigate('Perfil') }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name="bed-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label='Habitaciones'
                            onPress={() => { props.navigation.navigate('Habitaciones') }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name="bike"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label='Actividades'
                            onPress={() => { props.navigation.navigate('Actividades') }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>

            {/*ESTO ES EL APARTADITO DE CERRAR CESION */}
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label='Cerrar Sesion'
                    onPress={() => { logout() }}

                />

            </Drawer.Section>

        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontFamily:'JosefinSans-Bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontFamily:'JosefinSans-Bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 25,
    },
    bottomDrawerSection: {
        marginBottom: 25,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },

});

