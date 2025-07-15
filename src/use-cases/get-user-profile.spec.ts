import { describe, it, expect, beforeEach } from 'vitest';
import { hash, compare } from 'bcryptjs';
import { RegisterUseCase } from './register';
import { AuthenticateUseCase } from './authenticate';
import { GetUserProfileUseCase } from './get-user-profile';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let usersRepository: InMemoryUsersRepository;
let registerSut: RegisterUseCase;
let authenticateSut: AuthenticateUseCase;
let getUserProfileSut: GetUserProfileUseCase;

describe('User Profile Use Cases', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    registerSut = new RegisterUseCase(usersRepository);
    authenticateSut = new AuthenticateUseCase(usersRepository);
    getUserProfileSut = new GetUserProfileUseCase(usersRepository);
  });

  describe('Register Use Case', () => {
    it('should hash user password upon registration', async () => {
      const { user } = await registerSut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456'
      });

      const isPasswordHashed = await compare('123456', user.password_hash);
      expect(isPasswordHashed).toBe(true);
    });
  });

  describe('Authenticate Use Case', () => {
    it('should be able to authenticate', async () => {
      const email = 'johnn@gmail.com';
      const password = '123456';
      const hashedPassword = await hash(password, 6);

      await usersRepository.create({
        name: 'John Doe',
        email,
        password_hash: hashedPassword
      });

      const { user } = await authenticateSut.execute({
        email,
        password
      });

      expect(user.id).toEqual(expect.any(String));
      expect(user.email).toBe(email);
    });

    it('should not authenticate with wrong password', async () => {
      const email = 'johnn@gmail.com';
      const password = '123456';
      const hashedPassword = await hash(password, 6);

      await usersRepository.create({
        name: 'John Doe',
        email,
        password_hash: hashedPassword
      });

      await expect(
        authenticateSut.execute({
          email,
          password: 'wrong-password'
        })
      ).rejects.toBeInstanceOf(Error);
    });
  });

  describe('Get User Profile Use Case', () => {
    it('should get user profile by id', async () => {
      const { user } = await registerSut.execute({
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        password: 'abcdef'
      });

      const profile = await getUserProfileSut.execute({ userId: user.id });

      expect(profile.user.id).toBe(user.id);
      expect(profile.user.email).toBe('janedoe@example.com');
      expect(profile.user.name).toBe('Jane Doe');
    });

    it('should throw error if user does not exist', async () => {
      await expect(
        getUserProfileSut.execute({ userId: 'non-existent-id' })
      ).rejects.toBeInstanceOf(Error);
    });
  });
});