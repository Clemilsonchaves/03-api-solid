import { Gym, Prisma } from "@prisma/client";

export interface findManyNearby {
    latitude: number;
    longitude: number;
}

export interface GymsRepository {
    findById(userId: string): Promise<Gym | null>;
    create(data: Prisma.GymCreateInput): Promise<Gym>;
    searchMany(query: string, page: number): Promise<Gym[]>;
    findManyNearby(userLatitude: number, userLongitude: number): Promise<Gym[]>;
}

