export interface Offer {
  id: string;
  slug: string;
  title: string;
  headline: string;
  description: string;
  imageUrl: string;
  ctaText: string;
}

export interface Prize {
  id: number;
  level: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  weight: number;
}

export interface Lead {
  id?: string;
  email: string;
  phone: string;
  offer: string;
  token?: string;
  prize_level?: number;
  validated?: boolean;
  created_at?: string;
}

export interface SpinResult {
  prizeIndex: number;
  prize: Prize;
  token: string;
}