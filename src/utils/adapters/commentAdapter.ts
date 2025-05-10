import { Comment } from "@/types/post";

export const adaptCommentFromApi = (apiComment: any): Comment => {
  return {
    id: apiComment.id,
    text: apiComment.text,
    childrenCount: apiComment.childrenCount,
    user: {
      id: apiComment.meta.user.id,
      username: apiComment.meta.user.username,
      nickname: apiComment.meta.user.nickname,
      profilePhotoUrl: apiComment.meta.user.profilePhotoUrl,
    },
    userId: apiComment.meta.user.id,
    postId: apiComment.meta.postId,
    parentId: apiComment.parentId || null,
    createdAt: apiComment.meta.createdAt,
    updatedAt: apiComment.meta.updatedAt,
  };
};

export const adaptCommentsFromApi = (apiComments: any[]): Comment[] => {
  return apiComments.map(adaptCommentFromApi);
};
