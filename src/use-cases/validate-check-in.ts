import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/check-ins-repository';
import dayjs from 'dayjs';
import { LateCheckInValidationError } from './errors/late-check-in-validation-error';

interface ValidateCheckInUseCaseRequest {
    checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
    checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
    constructor(private checkInsRepository: CheckInsRepository) {}

    async execute({
        checkInId,
    }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
        const checkIn = await this.checkInsRepository.findById(checkInId);

        if (!checkIn) {
            throw new Error('Check-in not found.');
        }

        if (checkIn.validated_at !== null) {
            throw new Error('Check-in already validated.');

        }

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
             'minute'
            );

        if (distanceInMinutesFromCheckInCreation > 20) {
            throw new LateCheckInValidationError();
        }

        checkIn.validated_at = new Date();

        await this.checkInsRepository.save(checkIn);

        return {
            checkIn,
        };
    }
}

