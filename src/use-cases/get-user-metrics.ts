import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "generated/prisma";


interface GetUserMetricsUseCaseRequest {
    userId: string;
    page: number;
}

interface GetUserMetricsUseCaseResponse {
    checkIns: CheckIn[];
}

export class GetUserMetricsUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository
    ) {}

    async execute({
        userId,
        
    }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
        const checkIns = await this.checkInsRepository.countByUserId(userId) as unknown as CheckIn[];

        return { 
            checkIns 
        };
    }
}