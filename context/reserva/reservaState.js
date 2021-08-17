import React,{ useReducer } from'react';

import ReservaReducer from './reservaReducer'
import ReservaContext from './reservaContext'

import{
    SELECCIONAR_PRODUCTO,
    CONFIRMAR_ORDENAR_RESERVA,
    MOSTRAR_RESUMEN,
    ELIMINAR_PRODUCTO,
    PEDIDO_ORDENADO
} from '../../types'

const ReservaState = props =>
{
   
    //crear state inicial
    const initialState={
        reserva:[],
        producto:null,
        total:0,
        idpedido: '',

    }

    //useReducer con dispatch para ejecutar las funciones
    const [ state,dispatch ]= useReducer(ReservaReducer,initialState)
   
   //seleccionar el producto que el usuario desea ordenar
   const seleccionarProducto= habitaciones=>{
       dispatch({
           type:SELECCIONAR_PRODUCTO,
           payload:habitaciones
       })

   }

   //cuando el usuario confirma una reserva
   const guardarReserva = reserva =>
   {
       dispatch({
           type:CONFIRMAR_ORDENAR_RESERVA,
           payload:reserva

   })

   }

   //muestra el total a pagar
   const mostrarResumen = total =>{
       dispatch({
            type:MOSTRAR_RESUMEN,
            payload:total
       })
   }

   //elimina un articulo del carrito
   const eliminarProducto = id => {
       dispatch({
           type:ELIMINAR_PRODUCTO,
           payload:id

       })

   }

   const pedidoRealizado = id =>{
       dispatch ({
           type: PEDIDO_ORDENADO,
           payload: id
       })
   }


    return (
        <ReservaContext.Provider
        value={{
            reserva: state.reserva,
            habitaciones:state.habitaciones,
            total:state.total,
            idpedido:state.idpedido,
            seleccionarProducto,
            guardarReserva,
            mostrarResumen,
            eliminarProducto,
            pedidoRealizado
        }}
        >
            {props.children}
        </ReservaContext.Provider>

    )
    

}

export default ReservaState



