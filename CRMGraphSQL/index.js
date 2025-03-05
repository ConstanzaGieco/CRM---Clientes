const {ApolloServer, gql} = require('apollo-server')
const typeDefs = require('./db/schema')
const resolvers = require('./db/resolvers')
const jwt = require('jsonwebtoken')
require('dotenv').config({path: 'variables.env'})
const conectarDB = require('./config/db')

//problema de cors
const cors = require('cors')

//conectar a la db
conectarDB()

//crear el servidor
const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors:{
        origin: ['http://localhost:3001', 'http://localhost:3000']
    },
    context: ({req}) => {
        const token = req.headers['authorization'] || ''
        if(token){
            try {
                const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA );
                console.log(usuario)
                return{
                    usuario
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
})

//arrancar el servidor
server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`servidor listo en la URL ${url}`);
}).catch(err => {
    console.error("Error al iniciar el servidor Apollo", err);
});