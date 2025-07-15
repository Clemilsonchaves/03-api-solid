import { prisma } from "@/lib/prisma";

import { Prisma, User } from "@prisma/client"
import { usersRepository } from "../users-repository";

export class PrismaUsersRepository implements usersRepository{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findById(_id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
        data,
     });
        
     return user;
    }
}