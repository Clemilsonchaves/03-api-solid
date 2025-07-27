import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase

describe("Create Gym Use Case", () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new CreateGymUseCase(gymsRepository);
    });

    it("should be able to create a gym", async () => {
        const { gym } = await sut.execute({
            title: "JavaScript Gym",
            description: "A gym for JavaScript enthusiasts",
            phone: null,
            latitude: -23.5505,
            longitude: -46.6333
        });

        expect(gym.id).toEqual(expect.any(String));
        expect(gym.title).toEqual("JavaScript Gym");
        expect(gym.description).toEqual("A gym for JavaScript enthusiasts");
       
    });
});