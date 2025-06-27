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
}

export interface UserGallery {
  likedPlaces: TravelPlace[];
}
