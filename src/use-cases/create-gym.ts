import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface CreateGymUseCaseRequest {
    title: string;
    description: string | null;
    phone: string | null;
    latitude: number;
    longitude: number;
}

interface CreateGymUseCaseResponse {  // Fixed typo: "UserCase" → "UseCase"
    gym: Gym
}

export class CreateGymUseCase {
    constructor(private gymsRepository: GymsRepository) {}

    async execute({
        title,
        description,
        latitude,
        longitude
    }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {  // Now using the corrected interface
        const gym = await this.gymsRepository.create({
            title,
            description,
            latitude,
            longitude,
            name: "",
            location: ""
        });

        return { gym };
    }
}

