import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { beforeEach, describe, expect, it } from "vitest";


 
let ckeckInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        ckeckInsRepository = new InMemoryCheckInsRepository();
        sut = new CheckInUseCase(ckeckInsRepository);
    });

    it('should get user profile by id', async () => {
        // Criar o usuário primeiro
      const { checkIn } = await sut.execute({
            userId: 'user-id',
            gymId: 'gym-id'
        });

        expect(checkIn.id).toEqual(expect.any(String))
        ;
       

      
        
    });

   
});


