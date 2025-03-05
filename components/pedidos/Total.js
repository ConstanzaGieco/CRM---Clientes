import React, {useContext} from 'react'
import PedidoContext from '@/context/pedidos/PedidoContext'

export default function Total() {

    //context de pedidos
    const pedidocontext = useContext(PedidoContext)
    const {total} = pedidocontext

    return (
        <div className='flex items-center mt-5 justify-between p-3 bg-white'>
            <h2 className='text-gray-800 text-lg'>Total a pagar: </h2>
            <p className='text-gray-800 mt-0'>$ {total}</p>
        </div>
    )
}
