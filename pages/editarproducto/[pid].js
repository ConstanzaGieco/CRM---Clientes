import React from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { Formik } from 'formik'
import { useQuery, gql, useMutation } from '@apollo/client'
import * as Yup from 'yup'
import Swal from 'sweetalert2'

const OBTENER_PRODUCTO = gql `
    query obtenerProducto($id: ID!){
        obtenerProducto(id: $id){
            nombre
            precio
            existencia
        }
    }
`

const ACTUALIZAR_PRODUCTO = gql `
    mutation actualizarProducto($id: ID!, $input: ProductoInput){
        actualizarProducto(id: $id, input: $input){
            id
            nombre
            existencia
            precio
        }
    }
`

export default function EditarProducto() {

    const router = useRouter()
    const {query: {pid: id}} = router

    //consultar para obtener producto
    const {data, loading, error} = useQuery(OBTENER_PRODUCTO,{
        variables: {
            id
        }
    })

    //actualizar producto
    const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO)

    //schema validacion
    const schemaValidacion = Yup.object({
        nombre: Yup.string().required('El nombre del producto es obligatorio'),
        existencia: Yup.number().required('Agrega la cantidad disponible').positive('No se aceptan números negativos').integer('La existencia debe ser de números enteros'),
        precio: Yup.number().required('El precio es obligatorio').positive('No se aceptan números negativos')})

    if(loading) return 'Cargando...'

    if(!data) { 
        return 'Acción no permitida';
    }

    //Modificar cliente en la base de datos
    const actualizarInfoProducto = async valores => {
        const {nombre, precio, existencia} = valores
        try {
            const {data} = await actualizarProducto({
                variables:{
                    id,
                    input: {
                        nombre,
                        precio,
                        existencia
                    }
                }
            })
            //mostrar alerta
            Swal.fire({
                title: "Actualizado!",
                text: "El producto se actualizó correctamente",
                icon: "success"
            });
            //redireccionar
            router.push('/productos')
        } catch (error) {
            console.log(error)
        }
    }

    const {obtenerProducto} = data

    return (
        <Layout>
            <h1 className='text-2xl text-gray-800 font-light'>Editar Producto</h1>
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <Formik
                        enableReinitialize
                        initialValues={obtenerProducto}
                        validationSchema={ schemaValidacion }
                        onSubmit={ valores => {
                            actualizarInfoProducto(valores)
                        }}
                    >
                        {props => {
                            return (
                            <form className='bg-white shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={props.handleSubmit}>
                                <div className='mb-4'>
                                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>
                                        Nombre
                                    </label>
                                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='nombre' type='text' placeholder='Nombre producto' onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.nombre}>
                                    </input>
                                </div>
                                {props.touched.nombre && props.errors.nombre ? (
                                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                        <p className='font-bold'>Error</p>
                                        <p>{props.errors.nombre}</p>
                                    </div>
                                ) : null }
                                <div className='mb-4'>
                                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='existencia'>
                                        Cantidad Disponible
                                    </label>
                                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='existencia' type='number' placeholder='Cantidad disponible' onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.existencia}>
                                    </input>
                                </div>
                                {props.touched.existencia && props.errors.existencia ? (
                                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                        <p className='font-bold'>Error</p>
                                        <p>{props.errors.existencia}</p>
                                    </div>
                                ) : null }
                                <div className='mb-4'>
                                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='precio'>
                                        Precio
                                    </label>
                                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='precio' type='number' placeholder='Precio producto' onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.precio}>
                                    </input>
                                </div>
                                {props.touched.precio && props.errors.precio ? (
                                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                        <p className='font-bold'>Error</p>
                                        <p>{props.errors.precio}</p>
                                    </div>
                                ) : null }
                                <input type='submit' className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900' value='Guardar cambios'></input>
                            </form>
                        )}}
                        
                    </Formik>
                </div>
            </div>
        </Layout>
    )
}
