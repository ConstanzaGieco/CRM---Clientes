import React, {useState, useEffect, useContext} from 'react'
import PedidoContext from './PedidoContext'

export default function ProductoResumen({producto}) {

    //context de pedidos
    const pedidocontext = useContext(PedidoContext)
    const {cantidadProductos, actualizarTotal} = pedidocontext

    const [cantidad, setCantidad] = useState(0)
    useEffect(() => {
        actualizarCantidad()
        actualizarTotal()
    }, [cantidad])

    const actualizarCantidad = () => {
        const nuevoProducto = {...producto, cantidad: Number(cantidad)}
        cantidadProductos(nuevoProducto)
    }

    const {nombre, precio} = producto

    return (
        <div className='md:flex md:justify-between md:items-center mt-5'>
            <div className='md:w-2/4 mb-2 md:mb-0'>
                <p className='text-sm'>{nombre}</p>
                <p>$ {precio}</p>
            </div>
            <input 
                type='number'
                placeholder='Cantidad'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4 bg-white'
                onChange={e => setCantidad(e.target.value)}
                value={cantidad}
            />
        </div>
    )
}
