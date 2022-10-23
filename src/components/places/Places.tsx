import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getPlaces, selectPlaces } from './placesSlice';

import styles from './Places.module.scss';

export function Places() {
    const places = useAppSelector(selectPlaces)

    return (
        <div>
            <h1>This is places...</h1>
        </div>
    );
}
