import axios from 'axios';

export async function fetchPlaces() {
    try {
        const { data } = await axios.get(
            `https://api.harryseong.com/test/v1/places`,
            { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } }
        );
        console.log(`Data: ${JSON.stringify(data)}`);
    } catch (err) {
        console.error(err);
    } finally {
        console.log('Finished fetching places.')
    }
}
