import { HttpClient } from './HttpClient.js'

export class BaseRepository {
    constructor(public httpClient: HttpClient) { }
}
