import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
        .status(400)
        .send({
            message: "Validation error",
            issues: error.format()
        });
    }

    if (env.NODE_ENV === "production" && error.message === "User already exists") {
        return reply.status(409).send({ 
            message: "User already exists"
        });

    }


    return reply.status(500).send({
        message: "Internal server error", 
        error: error.message
    })

})
      
   
  
