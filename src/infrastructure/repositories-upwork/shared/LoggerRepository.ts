export class loggerRepository {
    constructor(public console: Console) { }

    logInfo(message: string, data?: unknown): void {
        this.console.info(message, data)
    }
    logError(message: string, data?: unknown): void {
        this.console.error(message, data)
    }
    logWarn(message: string, data?: unknown): void {
        this.console.warn(message, data)
    }
}
