import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInUseCase } from "./validate-check-in";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate Check-in Use Case", () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new ValidateCheckInUseCase(checkInsRepository);
    });

    it("should be able to validate the check-in", async () => {
        // Arrange
        const createdCheckIn = await checkInsRepository.create({
            user_id: 'user-01',
            gym_id: 'gym-01',
        });

        // Act
        const { checkIn } = await sut.execute({
            checkInId: createdCheckIn.id,
        });

        // Assert
        expect(checkIn.validated_at).toEqual(expect.any(Date));
        expect(checkIn.id).toBe(createdCheckIn.id);
        expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
    });
});