import { UserProfile } from './Util';

export type MediaType = 'IMAGE' | 'VIDEO' | 'GIF';

export interface User {
  id: string;
  username: string;
  nickname: string;
  email: string;
  profilePhotoUrl?: string | null;
  about?: string | null;
  contact?: string | null;
  admin: boolean;
  banned: boolean;
  banTimeout?: Date | null;
}

export interface Comment {
  id: string;
  text: string;
  childrenCount: number;
  user: {
    id: string;
    username: string;
    nickname: string;
    profilePhotoUrl?: string;
  };
  children?: Comment[];
  userId: string;
  postId: string;
  parentId?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Vote {
  id: string;
  vote: number;
  userId: string;
  postId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface SubscriptionTier {
  id: string;
  name: string;
  creatorId: string;
  price: number;
}

export interface Credit {
  user: {
    id: string;
    username: string;
    nickname: string;
    profilePhotoUrl?: string;
  };
  description: string;
}

export interface Series {
  id: string;
  name: string;
}

export interface Tier {
  id: string;
  name: string;
  price: number;
}

export interface Post {
  id: string;
  title: string;
  text?: string | null;
  mediaUrl: string;
  voteCount?: number;
  mediaType: 'VIDEO' | 'IMAGE';
  thumbUrl?: string;
  nsfw: boolean;
  tags: string[];
  minTier?: {
    id: string;
    name: string;
    price: number;
  } | null;
  author: {
    id: string;
    username: string;
    nickname: string;
    profilePhotoUrl?: string;
  };
  credits: {
    user: {
      id: string;
      username: string;
      nickname: string;
      profilePhotoUrl?: string;
    };
    description: string;
  }[];
  meta: {
    nsfw: boolean;
    tags: string[];
    minTier?: {
      id: string;
      name: string;
      price: number;
    } | null;
    author: {
      id: string;
      username: string;
      nickname: string;
      profilePhotoUrl?: string;
    };
    credits: {
      user: {
        id: string;
        username: string;
        nickname: string;
        profilePhotoUrl?: string;
      };
      description: string;
    }[];
    series?: {
      id: string;
      name: string;
    } | null;
    likes: number;
    dislikes: number;
    views: number;
    myVote: number;
    createdAt: string;
    updatedAt: string;
  };
  series?: {
    id: string;
    name: string;
  } | null;
  likes: number;
  dislikes: number;
  views: number;
  myVote: number;
  createdAt: string;
  updatedAt: string;
  comments?: Comment[];
}

export interface PostSummary {
  id: string;
  title: string;
  text?: string | null;
  mediaUrl: string;
  thumbUrl?: string;
  meta?: {
    nsfw?: boolean;
    myVote?: number;
    likes?: number;
    dislikes?: number;
    tags?: string[];
    author?: {
      id: string;
      username: string;
      nickname: string;
      profilePhotoUrl?: string;
    };
    views: number;
    createdAt: string;
    series?: {
      id: string;
      name: string;
    } | null;
  };
}

export interface PaginatedPosts {
  total: number;
  currentPage: number;
  from: number;
  to: number;
  lastPage: number;
  data: PostSummary[];
}
