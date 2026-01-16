export class FirestoreError extends Error {
    constructor(message: string, cause: Error) {
        super(message, {cause});
        this.name = "FirestoreError";
    }
}