import axios, { AxiosResponse } from 'axios';

export class ApiService {

    static async fetchPlaces(): Promise<AxiosResponse> {
        return axios
            .get(`https://api.harryseong.com/test/v1/places`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'x-api-key': 'test-api-key'
                    }
                })
            .then((response) => response)
    }
}
