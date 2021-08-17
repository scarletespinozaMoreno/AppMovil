import {
    SELECCIONAR_PRODUCTO,
    CONFIRMAR_ORDENAR_RESERVA,
    MOSTRAR_RESUMEN,
    ELIMINAR_PRODUCTO,
    PEDIDO_ORDENADO
} from '../../types'


export default (state,action)=>{
    switch(action.type) {
        case SELECCIONAR_PRODUCTO:
            return{
                ...state,
                habitaciones: action.payload

            }
        case CONFIRMAR_ORDENAR_RESERVA:
            return{
                ...state,
                reserva:[...state.reserva, action.payload]

            }
        case MOSTRAR_RESUMEN:
            return{
                ...state,
                total:action.payload

            }

            case ELIMINAR_PRODUCTO:
                return{
                    ...state,
                   reserva:state.reserva.filter( articulo => articulo.id !==action.payload)
    
                }
            case PEDIDO_ORDENADO:
                return {
                    ...state,
                    reserva:[],
                    total:0,
                    idpedido: action.payload
                }
                
        default:
            return state;
    }
}