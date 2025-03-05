import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import Cliente from "@/components/Cliente";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";

const OBTENER_CLIENTES_USUARIO = gql `
  query obtenerClientesVendedor{
    obtenerClientesVendedor{
      id
      nombre
      apellido
      empresa
      email
    }
  }
`

export default function Home() {

  const router = useRouter()

  //consultar apollo
  const {data, loading, error} = useQuery(OBTENER_CLIENTES_USUARIO)

  if(loading) return 'Cargando...'
  //Si no hay info (siempre post loading, xq al principio data es undefined)
  if(!data.obtenerClientesVendedor){
      return router.push('/login')
  }
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
        <Link href='/nuevocliente' className="bg-blue-950 py-2 px-5 mt-3 inline-block text-white rounded shadow-md text-sm uppercase mb-3 font-bold hover:bg-gray-800 w-full lg:w-auto">Nuevo Cliente</Link>
        <div className="overflow-x-scroll">
          <table className="table-auto shadow-md mt-10 w-full">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/5 py-2">Nombre</th>
                <th className="w-1/5 py-2">Empresa</th>
                <th className="w-1/5 py-2">Email</th>
                <th className="w-1/5 py-2">Eliminar</th>
                <th className="w-1/5 py-2">Editar</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.obtenerClientesVendedor.map(cliente => (
                <Cliente key={cliente.id} cliente={cliente}/>
              ))}
              </tbody>
          </table>
        </div>
      </Layout>
    </div>
  );
}
