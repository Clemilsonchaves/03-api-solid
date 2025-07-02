import  { FastifyInstance } from "fastify"
import { register } from "./controllers/register"

export async function appRoutes (app: FastifyInstance) {

    // Register the user route
    app.post('/users', register)
    

}



