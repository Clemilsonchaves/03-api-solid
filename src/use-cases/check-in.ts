import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";



interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
}

interface CheckInUseCaseResponse {
    checkin: CheckIn
}

export class CheckInUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
    ) {}

    async execute({ 
        userId, 
        gymId
    }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const checkin = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId,
        });

        return { 
            checkin };
    }
}

