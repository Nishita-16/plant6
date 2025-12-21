export type PlantCategory = 
  | 'immunity' 
  | 'digestion' 
  | 'skin' 
  | 'respiratory' 
  | 'stress' 
  | 'general';

export type AyushSystem = 
  | 'Ayurveda' 
  | 'Yoga' 
  | 'Unani' 
  | 'Siddha' 
  | 'Homeopathy';

export interface Plant {
  id: string;
  name: string;
  botanicalName: string;
  description: string;
  medicinalUse: string;
  category: PlantCategory;
  ayushSystem: AyushSystem[];
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
    region: string;
  };
  likes: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export interface UserPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  plantName: string;
  description: string;
  imageUrl?: string;
  location?: string;
  createdAt: Date;
  likes: number;
  isApproved: boolean;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  likedPlants: string[];
  bookmarkedPlants: string[];
  posts: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
