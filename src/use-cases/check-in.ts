import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

export class MaxNumberOfCheckInsError extends Error {
    constructor() {
        super('Max number of check-ins reached');
    }
}

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number;
}

interface CheckInUseCaseResponse {
    checkin: CheckIn
}

export class CheckInUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository
    ) {}

    async execute({ 
        userId, 
        gymId
    }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const gym = await this.gymsRepository.findById(gymId);

        if (!gym) {
            throw new ResourceNotFoundError("Gym");
        }

        // Verificar se já existe um check-in hoje
        const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
            userId, 
            new Date()
        );

        if (checkInOnSameDate) {
            throw new MaxNumberOfCheckInsError();
        }

        const checkin = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId,
        });

        return { 
            checkin };
    }
}

