import type { UserProfile, UserJourney } from '../types/TravelPlace';

export class CoinSystem {
  private static readonly PHOTO_UPLOAD_COINS = 10;
  private static readonly JOURNEY_COMPLETION_BONUS = 100;

  static getUserProfile(): UserProfile {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      totalCoins: 0,
      journeys: [],
      currentJourney: undefined
    };
  }

  static saveUserProfile(profile: UserProfile): void {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }

  static markPlaceAsVisited(placeId: string, userPhotos: string[] = []): number {
    const profile = this.getUserProfile();
    if (!profile.currentJourney) return 0;

    const place = profile.currentJourney.places.find(p => p.id === placeId);
    if (!place || place.visited) return 0;

    place.visited = true;
    place.visitDate = new Date().toISOString();
    place.userPhotos = userPhotos;
    
    // Only earn coins from photo uploads, not from visiting
    let coinsEarned = 0;
    if (userPhotos.length > 0) {
      coinsEarned = this.PHOTO_UPLOAD_COINS * userPhotos.length;
    }
    
    place.coinsEarned = coinsEarned;
    profile.totalCoins += coinsEarned;

    // Check if journey is completed
    const allVisited = profile.currentJourney.places.every(p => p.visited);
    if (allVisited && !profile.currentJourney.completed) {
      profile.currentJourney.completed = true;
      profile.totalCoins += this.JOURNEY_COMPLETION_BONUS;
      coinsEarned += this.JOURNEY_COMPLETION_BONUS;
    }

    this.saveUserProfile(profile);
    return coinsEarned;
  }

  static createNewJourney(personality: string, duration: string, places: any[]): UserJourney {
    const profile = this.getUserProfile();
    
    const journey: UserJourney = {
      id: Date.now().toString(),
      personality,
      duration,
      places: places.map(place => ({
        ...place,
        visited: false,
        userPhotos: [],
        coinsEarned: 0
      })),
      totalCoins: 0,
      startDate: new Date().toISOString(),
      completed: false
    };

    profile.currentJourney = journey;
    this.saveUserProfile(profile);
    return journey;
  }

  static getCurrentJourney(): UserJourney | undefined {
    const profile = this.getUserProfile();
    return profile.currentJourney;
  }

  static addPhotoToPlace(placeId: string, photoDataUrl: string): void {
    const profile = this.getUserProfile();
    if (!profile.currentJourney) return;

    const place = profile.currentJourney.places.find(p => p.id === placeId);
    if (place) {
      place.userPhotos.push(photoDataUrl);
      this.saveUserProfile(profile);
    }
  }
}
