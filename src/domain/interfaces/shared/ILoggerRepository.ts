export interface ILoggerRepository {
  logInfo(message: string, data?: unknown): void
  logError(message: string, data?: unknown): void
  logWarn(message: string, data?: unknown): void
}
