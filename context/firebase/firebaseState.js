import React, { useReducer } from 'react';

import firebase from '../../firebase'
import FirebaseReducer from './firebaseReducer'
import FirebaseContext from "./firebaseContext"

import _ from 'lodash'

import { OBTENER_PRODUCTOS_EXITO } from '../../types'
import { OBTENER_PROMOCIONES_EXITO } from '../../types'
import { OBTENER_ACTIVIDADES_EXITO } from '../../types'

const FirebaseState = props => {
    
    //crear state inicial
    const initialState = {
        habitacion: [],
        promocion:[],
        actividad:[]
    }

    //useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(FirebaseReducer, initialState)

    //Funcion que se ejecuta para traer los productos
    const obtenerProductos = () => {
      
        //consultar firebase
        firebase.db
            .collection('productos')
            .where('existencia', '==', true) //traer solo los q tengan existencia true
            .onSnapshot(manejarSnapshot);
        function manejarSnapshot(snapshot){
            let habitaciones = snapshot.docs.map(doc =>{
                return{
                    id: doc.id,
                    ...doc.data()
                }
            });
            //ordenar por categorias con lodash
            habitaciones=_.sortBy(habitaciones,'categoria')
            


            //Tenemos resultados de la base de datos
            dispatch({
                type: OBTENER_PRODUCTOS_EXITO,
                payload: habitaciones
    
            });
        }
    }

      //Funcion que se ejecuta para traer los productos
      const obtenerPromociones = () => {
      
        //consultar firebase
        firebase.db
            .collection('Promociones')
            .onSnapshot(manejarSnapshot);
        function manejarSnapshot(snapshot){
            let promociones = snapshot.docs.map(doc =>{
                return{
                    id: doc.id,
                    ...doc.data()
                }
            });
            //ordenar por categorias con lodash
            promociones=_.sortBy(promociones,'Duracion')
            


            //Tenemos resultados de la base de datos
            dispatch({
                type: OBTENER_PROMOCIONES_EXITO,
                payload: promociones
    
            });
        }
    }

    //Funcion que se ejecuta para traer los activiades
    const obtenerActividades = () => {
      
        //consultar firebase
        firebase.db
            .collection('Actividades')
            .onSnapshot(manejarSnapshot);
        function manejarSnapshot(snapshot){
            let actividades = snapshot.docs.map(doc =>{
                return{
                    id: doc.id,
                    ...doc.data()
                }
            });
            //ordenar por categorias con lodash
            actividadess=_.sortBy(actividades,'Duracion')
            


            //Tenemos resultados de la base de datos
            dispatch({
                type: OBTENER_ACTIVIDADES_EXITO,
                payload: actividades
    
            });
        }
    }

    return (
        <FirebaseContext.Provider
            value={{
                habitacion: state.habitacion,
                promocion:state.promocion,
                actividad:state.actividad,
                firebase,
                obtenerProductos,
                obtenerPromociones,
                obtenerActividades
            }}
        >
            {props.children}
        </FirebaseContext.Provider>

    )


}

export default FirebaseState



