import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { usersRepository } from "../repositories/users-repository";
// import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(private usersRepository: usersRepository) {}

    async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatch = await compare(password, user.password_hash);

        if (!doesPasswordMatch) {
            throw new InvalidCredentialsError();
        }

        return { user };
    }
}

export class InvalidCredentialsError extends Error {
    constructor() {
        super('Invalid credentials.');
    }
}

