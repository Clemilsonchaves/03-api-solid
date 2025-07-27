import { Prisma, CheckIn } from '@prisma/client';
import { CheckInsRepository } from '../check-ins-repository';
import { randomUUID } from 'node:crypto';
import dayjs from 'dayjs';

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.items.find(item => item.id === id);
    return checkIn || null;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const ITEMS_PER_PAGE = 20;
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const userCheckIns = this.items
      .filter(checkIn => checkIn.user_id === userId)
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
      .slice(startIndex, endIndex);

    return userCheckIns;
  }

  async findByUserId(userId: string): Promise<CheckIn | null> {
    const checkIn = this.items.find(item => item.user_id === userId);
    return checkIn || null;
  }

  async countByUserId(userId: string): Promise<number> {
    return this.items.filter(item => item.user_id === userId).length;
  }

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfDay = dayjs(date).startOf('day');
    const endOfDay = dayjs(date).endOf('day');

    const checkIn = this.items.find(item => {
      return (
        item.user_id === userId &&
        dayjs(item.created_at).isAfter(startOfDay) &&
        dayjs(item.created_at).isBefore(endOfDay)
      );
    });
    return checkIn || null;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    };

    this.items.push(checkIn);
    return checkIn;
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex(item => item.id === checkIn.id);
    
    if (checkInIndex >= 0) {
        this.items[checkInIndex] = checkIn;
        return checkIn;
    }
    
    // Handle the case where check-in is not found
    throw new Error(`Check-in with id ${checkIn.id} not found`);
  }
}
