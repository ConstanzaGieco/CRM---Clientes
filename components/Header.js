import { useQuery, gql } from "@apollo/client"
import { useRouter } from "next/router"

const OBTENER_VENDEDOR = gql `
    query obtenerUsuario{
        obtenerUsuario{
            id
            nombre
            apellido
        }
    }
`

export default function Header() {

    const router = useRouter()

    //query de apollo
    const {data, loading, error} = useQuery(OBTENER_VENDEDOR)

    //proteger que no accedamos a data antes de tener resultados
    if(loading) return null

    //Si no hay info
    if(!data){
        return router.push('/login')
    }
    const {nombre, apellido} = data.obtenerUsuario

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        router.push('/login')
    }
    
    return (
        <div className="sm:flex justify-between mb-6">
            <p className="mr-2 mb-5 lg:mb-0">Hola: {nombre} {apellido}</p>
            <button type="button" className="bg-blue-950 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 shadow-md text-white cursor-pointer" onClick={() => cerrarSesion()}>Cerrar sesión</button>
        </div>
    )
}
