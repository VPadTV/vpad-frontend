import { HTTP, callAPI } from "../../api";

const BASE = 'vote'
export abstract class VoteRepository {
    static vote = (id: string, vote: number) => callAPI<{}>(`${BASE}/${id}`, HTTP.PUT, { vote })
}