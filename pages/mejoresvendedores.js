import React, { useEffect } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Layout from '@/components/Layout'
import { gql, useQuery } from '@apollo/client';

const MEJORES_VENDEDORES = gql `
  query mejoresVendedores{
    mejoresVendedores{
      vendedor{
        nombre
        email
      }
      total
    }
  }
`

export default function mejoresvendedores() {

  //consultar a la base de datos
  const {data, loading, error, startPolling, stopPolling} = useQuery(MEJORES_VENDEDORES)

  useEffect(() => {
    startPolling(1000) //cuando detecta un cambio en la DB, espera un segundo y actualiza
    return() => {
      stopPolling()
    }
  }, [startPolling, stopPolling])

  if(loading) return 'Cargando...'
  const {mejoresVendedores} = data

  const vendedorGrafica = []
  mejoresVendedores.map((vendedor, index) => {
    vendedorGrafica[index] = {
      ...vendedor.vendedor[0],
      total: vendedor.total
    }
  })
  return (
    <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Mejores Vendedores</h1>
        <ResponsiveContainer width={600} height={500}>
        <BarChart
          width={600}
          height={500}
          data={vendedorGrafica}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          className='mt-10'
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#3182Ce"/>
        </BarChart>
      </ResponsiveContainer>
    </Layout>
    
  )
}
