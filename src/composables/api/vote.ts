import { HTTP, api } from "./base";

export abstract class VoteAPI {
    static vote = (id: string, vote: number) => api<{}>(`vote/${id}`, HTTP.PUT, { vote })
}