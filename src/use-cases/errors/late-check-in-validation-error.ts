export class LateCheckInValidationError extends Error {
    constructor() {
        super('Check-in validation failed: late check-in');
        this.name = 'LateCheckInValidationError';
    }
}