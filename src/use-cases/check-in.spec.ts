import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CheckInUseCase, MaxNumberOfCheckInsError } from "./check-in";
import { beforeEach, describe, expect, it } from "vitest";
import { Decimal } from "@prisma/client/runtime/library";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check-In Use Case', () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository();
        sut = new CheckInUseCase(checkInsRepository, gymsRepository);

        // Criar a academia uma vez no beforeEach
        gymsRepository.items.push({
            id: 'gym-01',
            title: 'Gym 01',
            description: 'Description of Gym 01',
            latitude: new Decimal(0),
            longitude: new Decimal(0),
            name: "",
            location: "",
            created_at: new Date(),
            updated_at: new Date()
        });
    });

    it('should be able to check in', async () => {
        const response = await sut.execute({
            userId: 'user-id',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0
        });

        expect(response.checkin.id).toEqual(expect.any(String));
    });

    it('should not be able to check in twice in the same day', async () => {
        // Primeiro check-in
        await sut.execute({
            userId: 'user-id',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0
        });

        // Segundo check-in (deve falhar)
        await expect(() => sut.execute({
            userId: 'user-id',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0
        })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
    });
});