import React, { useState } from 'react'
import Layout from '@/components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'

const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario($input: AutenticarInput){
        autenticarUsuario(input: $input){
            token
        }
    }
`

export default function Login() {

    //mutation para crear nuevos usuarios
    const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO)

    const [mensaje, guardarMensaje] = useState(null)
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('El email no es válido').required('El email no puede ir vacío'),
            password: Yup.string().required('El password es obligatorio')
        }),
        onSubmit: async valores => {
            const {email, password} = valores
            try {
                const {data} = await autenticarUsuario({
                    variables: {
                        input: {
                            email,
                            password
                        }
                    }
                })
                guardarMensaje('Autenticando...')
                //guardar el token
                setTimeout(() => {
                    const {token} = data.autenticarUsuario
                    localStorage.setItem('token', token)
                }, 1000)
                //redireccionar a clientes
                setTimeout(() => {
                    guardarMensaje(null)
                    router.push('/')
                }, 2000)

            } catch (error) {
                guardarMensaje(error.message.replace('GraphQL error: ', ''))
                setTimeout(() => {
                    guardarMensaje(null)
                }, 3000)
            }
        }
    })

    const mostrarMensaje = () => {
        return(
            <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
                <p>{mensaje}</p>
            </div>
        )
    }

    return (
        <>
            <Layout>
                <h1 className='text-center text-2xl font-light text-white'>Login</h1>
                {mensaje && mostrarMensaje()}
                <div className='flex justify-center mt-5'>
                    <div className='w-full max-w-sm'>
                        <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                                    Email
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='email' type='email' placeholder='Email usuario' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}>
                                </input>
                            </div>
                            {formik.touched.email && formik.errors.email ? (
                                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                        <p className='font-bold'>Error</p>
                                        <p>{formik.errors.email}</p>
                                    </div>
                                ) : null }
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                                    Password
                                </label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='password' type='password' placeholder='Password usuario' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}>
                                </input>
                            </div>
                            {formik.touched.password && formik.errors.password ? (
                                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                        <p className='font-bold'>Error</p>
                                        <p>{formik.errors.password}</p>
                                    </div>
                                ) : null }
                            <input type='submit' className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900' value='Iniciar sesión'/>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}
