export class MaxNumberOfCheckInsError extends Error {
    constructor() {
        super('Maximum number of check-ins reached.');
        this.name = 'MaxNumberOfCheckInsError';
    }
}