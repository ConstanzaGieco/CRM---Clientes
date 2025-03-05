import React, {useReducer} from "react";
import PedidoContext from "./PedidoContext";
import PedidoReducer from "./PedidoReducer";
import { SELECCIONAR_CLIENTE, SELECCIONAR_PRODUCTO, CANTIDAD_PRODUCTOS, ACTUALIZAR_TOTAL } from "@/types";

const PedidoState = ({children}) => {

    //state de pedidos
    const initialState = {
        cliente: {},
        productos: [],
        total: 0
    }

    const [state, dispatch] = useReducer(PedidoReducer, initialState)
    
    //modifica el cliente
    const agregarCliente = cliente => {
        dispatch({
            type: SELECCIONAR_CLIENTE,
            payload: cliente
        })
    }

    //modifica los productos
    const agregarProducto = productosSeleccionados => {
        let nuevoState
        if(state.productos.length > 0){
            //resolver el problema con react select, de que si se agrega un nuevo producto, se borra la variable "cantidad" del primero
            nuevoState = productosSeleccionados.map(producto => {
                const nuevoObjeto = state.productos.find(productoState => productoState.id === producto.id)
                return {...producto, ...nuevoObjeto}
            })
        } else{
            nuevoState = productosSeleccionados
        }
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: nuevoState
        })
    }

    //modifica las cant de los productos
    const cantidadProductos = nuevoProducto => {
        dispatch({
            type: CANTIDAD_PRODUCTOS,
            payload: nuevoProducto
        })
    }

    //actualizar el total
    const actualizarTotal = () => {
        dispatch({
            type: ACTUALIZAR_TOTAL
        })
    }

    return(
        <PedidoContext.Provider
            value={{
                productos: state.productos,
                total: state.total,
                cliente: state.cliente,
                agregarCliente,
                agregarProducto,
                cantidadProductos,
                actualizarTotal
            }}
        >
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState