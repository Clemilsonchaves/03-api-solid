import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInsHistory } from "./fetch-user-check-ins-history";
import { beforeEach, describe, expect, it } from "vitest";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistory;

describe("Fetch User Check-in History Use Case", () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new FetchUserCheckInsHistory(checkInsRepository);
    });

    it("should be able to fetch user check-ins history", async () => {
        await checkInsRepository.create({
            user_id: 'user-01',
            gym_id: 'gym-01',
        });

        await checkInsRepository.create({
            user_id: 'user-01',
            gym_id: 'gym-02',
        });

        const { checkIns } = await sut.execute({
            userId: 'user-01',
            page: 1,
        });

        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    user_id: 'user-01',
                    gym_id: 'gym-01',
                }),
                expect.objectContaining({
                    user_id: 'user-01',
                    gym_id: 'gym-02',
                }),
            ])
        );
    });
});
