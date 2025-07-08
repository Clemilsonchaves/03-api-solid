import { hash } from "bcryptjs";
import { usersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { UserAleadyExistsError } from "./erros/user-already-exists-erro";

interface RegisterUserCaseRequest {
   name: string;
    email: string;
    password: string;
}

interface RegisterUserCaseResponse {
    user: User
}

const usersRepository = {
  create: async (data: { name: string; email: string; password_hash: string }) => ({
    id: 'user-1',
    name: data.name,
    email: data.email,
    password_hash: data.password_hash, // Use the actual hashed password passed in
    created_at: new Date(),
    updated_at: new Date(),
  }),
  findByEmail: async () => null,
};

export class RegisterUseCase {


    constructor(private usersRepository: usersRepository) { 
        
    }

    async execute({ name, email, password }: RegisterUserCaseRequest): Promise<RegisterUserCaseResponse> {
        const password_hash = await hash(password, 6);

        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAleadyExistsError();
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash,
        });

        return {
             user,
        } 
    }
}

