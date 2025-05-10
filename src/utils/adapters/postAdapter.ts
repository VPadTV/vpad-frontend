import { Post, Comment } from "@/types/post";

export function adaptPostFromApi(apiPost: any): any {
  return  {
    id: apiPost.id || "",
    title: apiPost.title || "",
    text: apiPost.text || null,
    mediaUrl: apiPost.mediaUrl || "",
    mediaType: apiPost.mediaType || "IMAGE",
    thumbUrl: apiPost.thumbUrl || undefined,
    meta: {
      nsfw: apiPost.meta?.nsfw ?? false,
      tags: apiPost.meta?.tags || [],
      minTier: apiPost.meta?.minTier || null,
      author: apiPost.meta?.author || {
        id: "",
        username: "unknown",
        nickname: "Unknown User",
      },
      credits: apiPost.meta?.credits || [],
      series: apiPost.meta?.series || null,
      likes: apiPost.meta?.likes || 0,
      dislikes: apiPost.meta?.dislikes || 0,
      views: apiPost.meta?.views || 0,
      myVote: apiPost.meta?.myVote || 0,
      createdAt: apiPost.meta?.createdAt || new Date().toISOString(),
      updatedAt: apiPost.meta?.updatedAt || new Date().toISOString(),
    },
    comments: apiPost.comments || [],
    createdAt: apiPost.meta?.createdAt || new Date().toISOString(),
    nsfw: apiPost.meta?.nsfw || false,
    tags: apiPost.meta?.tags || [],
    voteCount: (apiPost.meta?.likes || 0) - (apiPost.meta?.dislikes || 0),
    author: apiPost.meta?.author || {
      id: "",
      username: "unknown",
      nickname: "Unknown User",
    },
  }
}
