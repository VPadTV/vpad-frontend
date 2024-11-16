export interface TierCreateBody {
  id?: string;
  name: string;
  price: number;
}

export interface Tier {
  id: string;
  name: string;
  price: number;
}

export interface TierUpdateBody {
  id: string;
  name: string;
  price?: number;
}
