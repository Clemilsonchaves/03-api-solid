import { describe, it, expect } from 'vitest';
import { compare } from 'bcryptjs';
import { RegisterUseCase } from './register';

describe('Register Use Case', () => {
  it('should hash user password a user upon registration', async () => {
    // Mock repository that uses the actual password_hash passed to it
    const usersRepository = {
      create: async (data: { name: string; email: string; password_hash: string }) => ({
        id: 'user-1',
        name: data.name,
        email: data.email,
        password_hash: data.password_hash, // This is the key fix
        created_at: new Date(),
        updated_at: new Date(),
      }),
      findByEmail: async () => null,
    };

    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johnn@gmail.com',
      password: '123456'
    });

    // Test that the password was actually hashed
    const isPasswordHashed = await compare('123456', user.password_hash);
    expect(isPasswordHashed).toBe(true);
  });
});