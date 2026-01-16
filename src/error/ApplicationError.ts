export class ApplicationError extends Error {
    constructor(message: string, cause: Error | null = null) {
        super(message, {cause});
        this.name = "ApplicationError";
    }
}