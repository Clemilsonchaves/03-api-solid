import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export  async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });


    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
      
      const registerUseCase = makeRegisterUseCase();

      await registerUseCase.execute({
        name,
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
  