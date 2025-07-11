import { describe, it, expect } from 'vitest';
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from './authenticate';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let sut: AuthenticateUseCase;

describe('InvalidCredentialsError', () => {
  it('should be instance of Error', () => {
    const error = new InvalidCredentialsError();
    expect(error).toBeInstanceOf(Error);
  });

  it('should have correct message', () => {
    const error = new InvalidCredentialsError();
    expect(error.message).toBe('Invalid credentials.');
  });

  it('should have name set to "Error"', () => {
    const error = new InvalidCredentialsError();
    expect(error.name).toBe('Error');
  });
});

// We recommend installing an extension to run vitest tests.
