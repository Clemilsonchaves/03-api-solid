import { User } from "@prisma/client";
import { usersRepository } from "../repositories/users-repository";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileUseCaseRequest {
   userId: string;
}

interface GetUserProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {
    constructor(private usersRepository: usersRepository) {}

    async execute({ 
        userId
     }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new ResourceNotFoundError("User"); 
        }

        // No password comparison needed in get-user-profile use case

        return { user };
    }
}


