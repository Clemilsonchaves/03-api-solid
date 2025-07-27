import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository {
   findById(checkInId: string): Promise<CheckIn | null>;
   findByUserId(userId: string, page: number): unknown;
   create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
   findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
   countByUserId(userId: string): Promise<number>
   findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
   save(checkIn: CheckIn): Promise<CheckIn>;
}