import React, {useContext} from 'react'
import PedidoContext from '@/context/pedidos/PedidoContext'
import ProductoResumen from '@/context/pedidos/ProductoResumen'

export default function ResumenPedido() {

    //context de pedidos
    const pedidocontext = useContext(PedidoContext)
    const {productos} = pedidocontext

    return (
        <>
            <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>3.- Ajusta las cantidad del producto</p>
            {productos.length > 0 ? (
                <>
                    {productos.map(producto => (
                        <ProductoResumen
                            key={producto.id}
                            producto={producto}
                        />
                    ))}
                </>
            ) : (
                <p className='mt-5 text-sm'>Aún no hay productos</p>
            )}
        </>
    )
}
