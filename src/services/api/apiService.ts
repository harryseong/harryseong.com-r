import { useState } from 'react';
import axios from 'axios';

// https://api.harryseong.com/test/v1/example?name=Harry

const [data] = useState();
const [placesData] = useState();
const [isLoading] = useState(false);

export async function callExampleAPI(name: string) {
    try {
        const { data } = await axios.get(
            `https://api.harryseong.com/test/v1/example?name=${name}`,
            { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } }
        );

        console.log('Data: ' + JSON.stringify(data));
    } catch (err) {
        console.error(err)
    } finally {
        console.log('Done with "callExampleAPI".')
    }
}

export async function getPlaces() {
    try {
        const { data } = await axios.get(
            `https://api.harryseong.com/test/v1/places`,
            { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } }
        );

        console.log('Data: ' + JSON.stringify(data));
    } catch (err) {
        console.error(err)
    } finally {
        console.log('Done with "callExampleAPI".')
    }
}
