import express from 'express'

import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'

const PORT = Number(process.env.PORT) || 8080;

(async () => {
    const app = express()

    // GQL Server
    const server = new ApolloServer({
        typeDefs: `
        type Query{
            hello:String
            sayHi(name:String):String
        }`,
        resolvers: {
            Query:{
                    hello:()=>"Hello World!!",
                    sayHi:(_,{name})=>`Hi ${name}`
            }
        }
    })

    // Start GQL Server
    await server.start()

    app.use(express.json())
    app.use('/graphql', expressMiddleware(server))

    app.get('/', (req, res) => {
        return res.json({ greet: "Hello World!!" })
    })

    app.listen(PORT, () => {
        console.log("app is listning on PORT: " + PORT)
    })


})()

