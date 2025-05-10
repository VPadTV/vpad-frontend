import { fetchApi } from '@/utils/api';

export interface VoteSetRequest {
  postId: string;
  vote: number;
}

export const setVote = async (voteData: VoteSetRequest) => {
  return await fetchApi(`/vote/${voteData.postId}?vote=${voteData.vote}`, {
    method: 'PUT',
    body: JSON.stringify({
      vote: voteData.vote 
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
