import React, {use, useEffect, useState, useContext} from 'react'
import Select from 'react-select'
import { gql, useQuery } from '@apollo/client'
import PedidoContext from '@/context/pedidos/PedidoContext'

const OBTENER_PRODUCTOS = gql `
    query obtenerProductos{
        obtenerProductos{
            id
            nombre
            precio
            existencia
        }
    }
`

export default function AsignarProductos() {

    //state del componente
    const [productos, setProductos] = useState([])
    //context de pedidos
    const pedidocontext = useContext(PedidoContext)
    const {agregarProducto} = pedidocontext

    //consulta a la base de datos
    const {data, loading, error} = useQuery(OBTENER_PRODUCTOS)
    
    useEffect(() => {
        //funcion para pasar a PedidoState.js
        agregarProducto(productos)
    }, [productos])

    const seleccionarProducto = producto => {
        setProductos(producto)
    }

    if(loading) return null
    const{obtenerProductos} = data

    return (
        <>
            <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>2.- Selecciona o busca los productos</p>
            <Select className='mt-3'
                options={obtenerProductos}
                onChange={opcion => seleccionarProducto(opcion)}
                isMulti={true}
                getOptionValue={opciones => opciones.id}
                getOptionLabel={opciones => `${opciones.nombre} - ${opciones.existencia} Disponibles`}
                placeholder='Busque o seleccione el producto'
                noOptionsMessage={() => 'No hay resultados'}
            />
        </>
    )
}
