import React from 'react';
import LoginScreen from '../views/LoginScreen'
//importar state de context
import FirebaseState from '../context/firebase/firebaseState'
import ReservaState from '../context/reserva/reservaState'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerContent } from '../views/DrawerContent'
import MainTabScreen from '../views/MainTabScreen';


const Drawer = createDrawerNavigator();


const DrawerNav = () => {
    return (
        <FirebaseState>
            <ReservaState>
                <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
                    <Drawer.Screen name="HomeStack" component={MainTabScreen} />
                    <Drawer.Screen name="Notifications" component={LoginScreen} />
                </Drawer.Navigator>
            </ReservaState>
        </FirebaseState>






    )
}

export default DrawerNav;