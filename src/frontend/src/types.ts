export interface Package {
  id: number;
  name: string;
  price: number;
  tag: string;
  color: string;
  icon: string;
  desc: string;
  features: string[];
}

export interface Affiliate {
  rank: number;
  name: string;
  country: string;
  earnings: number;
  refs: number;
  badge: string;
  tier: string;
}

export interface NavItem {
  id: string;
  icon: string;
  label: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
}
