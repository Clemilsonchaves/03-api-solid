import { GymsRepository } from '@/repositories/gyms-repository';
import { Gym } from '@prisma/client';

interface FetchNearbyGymsUseCaseRequest {
   userLatitude: number;
   userLongitude: number;
}

interface FetchNearbyGymsUseCaseResponse {
    gyms: Gym[]; // Replace 'any' with the actual type of gyms if available
}
export class FetchNearbyGymsUseCase {
    constructor(
        private gymsRepository: GymsRepository
    ) {}

    async execute({
        userLatitude,
        userLongitude,
    }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
        const gyms = await this.gymsRepository.findManyNearby(
            userLatitude,
            userLongitude
        );

        return {
            gyms
        };
    }
}