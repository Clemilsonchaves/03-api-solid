import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new SearchGymsUseCase(gymsRepository);
    });

    it("should be able to search for gyms", async () => {
        await gymsRepository.create({
            name: 'JavaScript Gym',
            title: 'JavaScript Gym',
            description: 'Description 01',
            phone: '123456789',
            latitude: 0,
            longitude: 0,
            location: 'Downtown Area', // or whatever location string is appropriate
        });

        await gymsRepository.create({
            name: 'TypeScript Gym',
            title: 'TypeScript Gym',
            description: 'Description 02',
            phone: '987654321',
            latitude: 1,
            longitude: 1,
            location: 'Tech District',
        });

        await gymsRepository.create({
            name: 'Python Gym',
            title: 'Python Gym',
            description: 'Description 03',
            phone: '555555555',
            latitude: 2,
            longitude: 2,
            location: 'University Area',
        });

        const { gyms } = await sut.execute({
            query: 'JavaScript',
            page: 1,
        });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual(expect.arrayContaining([
            expect.objectContaining({ title: 'JavaScript Gym' }),
        ]));
    });
});
