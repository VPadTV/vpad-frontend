export class BackendError {
    constructor(
        public code: number,
        public error: string
    ) { }
}