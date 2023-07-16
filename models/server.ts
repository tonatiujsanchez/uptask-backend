import express, { Application } from "express"

import { dbConnection } from '../config/db'
import { projectsRoutes, usersRoutes } from "../routes"


class Server {

    private app: Application
    private port: string
    private paths = {
        users: '/api/users',
        projects: '/api/projects',
    }

    constructor() {
        this.app = express()
        this.port =  process.env.PORT || '4000'

        // db
        this.dbConnection()

        // middlewares
        this.middlewares()

        // Routes
        this.routes()
    }



    async dbConnection() {
        await dbConnection()
    }

    middlewares() {
        // CORS
        // this.app.use( cors() )

        // Body parser
        this.app.use( express.json() )

        // public dir
        this.app.use( express.static('public') )
    }

    routes() {
        this.app.use(this.paths.users, usersRoutes)
        this.app.use(this.paths.projects, projectsRoutes)
        
        this.app.use('/hola', (req, res) => {
            res.send('Hola mundo!! 👾')
        })
    }


    listen() {
        this.app.listen( this.port, ()=> {
            console.log(`Servidor corriendo en el puerto ${ this.port }`)
        })
    }
}


export default Server
