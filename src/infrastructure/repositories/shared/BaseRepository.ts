import { HttpClient } from '@infrastructure/repositories/shared/HttpClient'

export class BaseRepository {
    constructor(public httpClient: HttpClient) { }
}
