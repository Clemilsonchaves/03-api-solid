import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export  async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });


    const {  email, password } = authenticateBodySchema.parse(request.body);

    try {

        const authenticateUseCase = makeAuthenticateUseCase();
 
      await authenticateUseCase.execute({
    
        email,
        password,
      })

      
    } catch (err) {
      if (err instanceof Error && err.message === "User already exists with this email") {
        return reply.status(409).send({
          message: "User already exists with this email",
        });
      }
      console.error(err);
      return reply.status(500).send({
        message: "Internal server error",
      });
    }
  
  

    return reply.status(201).send();
}
  