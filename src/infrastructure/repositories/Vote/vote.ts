import { HTTP, callAPI } from "../../api";

export abstract class VoteRepository {
    static vote = (id: string, vote: number) => callAPI<{}>(`vote/${id}`, HTTP.PUT, { vote })
}