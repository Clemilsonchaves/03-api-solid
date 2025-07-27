import { Gym, Prisma } from "@prisma/client";
import { GymsRepository  } from "../gyms-repository";
import { randomUUID } from "node:crypto";

export class InMemoryGymsRepository implements GymsRepository {
    public items: Gym[] = [];

    async findById(id: string): Promise<Gym | null> {
        const gym = this.items.find(item => item.id === id);

        if (!gym) {
            return null;
        }
        
        return gym;
    }
    async create(data: Prisma.GymCreateInput): Promise<Gym> {
        const gym: Gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(Number(data.latitude)),
            longitude: new Prisma.Decimal(Number(data.longitude)),
            created_at: new Date(),
            name: "",
            location: "",
            updated_at: new Date()
        };

        this.items.push(gym);
        return gym;
    }

    async searchMany(query: string, page: number): Promise<Gym[]> {
        const itemsPerPage = 20;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return this.items
            .filter(gym => gym.title.toLowerCase().includes(query.toLowerCase()))
            .slice(startIndex, endIndex);
    }

    async findManyNearby(userLatitude: number, userLongitude: number): Promise<Gym[]> {
        const items = this.items.filter((item) => {
            // Type guard: ensure latitude and longitude are numbers
            if (typeof item.latitude !== 'number' || typeof item.longitude !== 'number') {
                return false; // Skip items with invalid coordinates
            }

            // Simple distance calculation for testing purposes
            // In a real implementation, you'd use proper geolocation algorithms
            const distance = Math.sqrt(
                Math.pow(item.latitude - userLatitude, 2) +
                Math.pow(item.longitude - userLongitude, 2)
            );
            
            // Assuming nearby means within 10 units of distance
            return distance <= 10;
        });

        // If pagination is needed, you can add it here. For now, return all nearby items.
        return items;
    }
}