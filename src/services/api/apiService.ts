import axios, { AxiosResponse } from 'axios';

export class ApiService {

    static async fetchPlaces(): Promise<AxiosResponse> {
        return axios
            .get(`${process.env.REACT_APP_V1_API_ENDPOINT}/places`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'x-api-key': process.env.REACT_APP_API_KEY
                    }
                })
            .then((response) => response)
    }

    static async fetchCurrentlyPlaying(): Promise<AxiosResponse> {
        return axios
            .get(`${process.env.REACT_APP_V1_API_ENDPOINT}/music/spotify/currently-playing`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'x-api-key': process.env.REACT_APP_API_KEY
                    }
                })
            .then((response) => response)
    }
}
