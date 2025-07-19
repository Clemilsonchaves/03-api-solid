import { Prisma, CheckIn } from '@prisma/client';
import { CheckInsRepository } from '../check-ins-repository';
import { randomUUID } from 'node:crypto';
import dayjs from 'dayjs';

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items:  CheckIn[] = [];

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfDay = dayjs(date).startOf('date');
    
    
    const endOfDay = dayjs(date).endOf('date');
    
    const checkIn = this.items.find(
      (item) => 
        item.user_id === userId &&
        item.created_at.getTime() >= startOfDay.toDate().getTime() &&
        item.created_at.getTime() <= endOfDay.toDate().getTime()
    );

    return checkIn || null;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
        id: randomUUID(),
        user_id: data.user_id,
        gym_id: data.gym_id,
        created_at: new Date(),
        validated_at: data.validated_at ? new Date(data.validated_at) : null,

    };

    this.items.push(checkIn);
    return checkIn ;
  }

}