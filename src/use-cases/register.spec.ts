import { describe, it, expect, beforeEach } from 'vitest';
import { hash, compare } from 'bcryptjs';
import { RegisterUseCase } from './register';
import { AuthenticateUseCase } from './authenticate';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let usersRepository: InMemoryUsersRepository;
let registerSut: RegisterUseCase;
let authenticateSut: AuthenticateUseCase;

describe('Register and Authenticate Use Cases', () => {
  beforeEach(() => { 
    usersRepository = new InMemoryUsersRepository();
    registerSut = new RegisterUseCase(usersRepository);
    authenticateSut = new AuthenticateUseCase(usersRepository);
  });

  describe('Register Use Case', () => {
    it('should hash user password a user upon registration', async () => {
      const { user } = await registerSut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456'
      });
  
      // Test that the password was actually hashed
      const isPasswordHashed = await compare('123456', user.password_hash);
      expect(isPasswordHashed).toBe(true);
    });
  });

  describe('Authenticate Use Case', () => {
    it('should be able to authenticate', async () => {
      // Primeiro, criar um usuário no repositório
      const email = 'johnn@gmail.com';
      const password = '123456';
      const hashedPassword = await hash(password, 6);
  
      await usersRepository.create({
          name: 'John Doe',
          email,
          password_hash: hashedPassword
      });
  
      // Agora tentar autenticar
      const { user } = await authenticateSut.execute({
          email,
          password
      });
  
      // Verificar se o usuário foi autenticado corretamente
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
  
      // Tentar autenticar com senha errada
      await expect(
          authenticateSut.execute({
              email,
              password: 'wrong-password'
          })
      ).rejects.toBeInstanceOf(Error);
    });
  });
});