import Layout from "@/components/Layout";
import { gql, useQuery } from "@apollo/client";
import Producto from "@/components/Producto";
import Link from "next/link";

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

export default function Productos() {

  //consultar los productos
  const {data, loading, error} = useQuery(OBTENER_PRODUCTOS)

  if(loading) return 'Cargando...'
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Productos</h1>
        <Link href='/nuevoproducto' className="bg-blue-950 py-2 px-5 mt-3 inline-block text-white rounded shadow-md text-sm uppercase mb-3 font-bold hover:bg-gray-800">Nuevo Producto</Link>
        <table className="table-auto shadow-md mt-10 w-full">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Exitencia</th>
              <th className="w-1/5 py-2">Precio</th>
              <th className="w-1/5 py-2">Eliminar</th>
              <th className="w-1/5 py-2">Editar</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.obtenerProductos.map(producto => (
              <Producto key={producto.id} producto={producto}/>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
}