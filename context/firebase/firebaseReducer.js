import { OBTENER_PRODUCTOS_EXITO } from '../../types'
import { OBTENER_PROMOCIONES_EXITO } from '../../types'
import { OBTENER_ACTIVIDADES_EXITO } from '../../types'
import { OBTENER_HISTORIAL } from '../../types'
//reducer en el cual puedo hacer funcional los multiples metodos del codigo
export default (state,action)=>{
    switch(action.type) {
        case OBTENER_PRODUCTOS_EXITO:
            return{
                ...state,
                habitacion:action.payload
            }
        case OBTENER_PROMOCIONES_EXITO:
            return {
                ...state,
                promocion:action.payload
            }
        case OBTENER_ACTIVIDADES_EXITO:
            return{
                ...state,
                actividad:action.payload
            }
        case OBTENER_HISTORIAL:
                return{
                    ...state,
                    historial:action.payload
                }
        default:
            return state;
    }
}