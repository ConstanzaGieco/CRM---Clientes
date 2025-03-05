import { ApolloProvider } from "@apollo/client"
import client from "@/config/apollo"
import PedidoState from "@/context/pedidos/PedidoState"

//Habilitar apollo en todos los componentes de la app
const MyApp = ({Component, pageProps}) => {
    return(
        <ApolloProvider client={client}>
            <PedidoState>
                <Component {...pageProps} />  
            </PedidoState> 
        </ApolloProvider>
    )
}

export default MyApp