import { Place } from "../../components/places/placesSlice";
import moment from 'moment';

export interface CachedPlaces {
    timestamp: number,
    places: Place[]
}

export class LocalStorageService {

    constructor() { }

    static setPlaces(places: Place[]): void {
        localStorage.setItem('places', JSON.stringify({
            timestamp: moment().valueOf(), places: places
        }));
    }
    
    static getPlaces(): CachedPlaces {
        const cachedPlaces = localStorage.getItem('places');
        return cachedPlaces ? JSON.parse(cachedPlaces.toString()) : null;
    }
}