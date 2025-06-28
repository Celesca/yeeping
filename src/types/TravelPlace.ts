export interface TravelPlace {
  id: string;
  name: string;
  lat: number;
  long: number;
  image: string;
  description?: string;
  country?: string;
  rating?: number;
  distance?: string;
  tags: string[];
}

export interface VisitedPlace extends TravelPlace {
  visited: boolean;
  visitDate?: string;
  userPhotos: string[];
  coinsEarned: number;
}

export interface UserJourney {
  id: string;
  personality: string;
  duration: string;
  places: VisitedPlace[];
  totalCoins: number;
  startDate: string;
  completed: boolean;
}

export interface UserGallery {
  likedPlaces: TravelPlace[];
}

export interface UserProfile {
  totalCoins: number;
  journeys: UserJourney[];
  currentJourney?: UserJourney;
}
