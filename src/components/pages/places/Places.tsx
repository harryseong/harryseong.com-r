import './Places.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { useEffect, useRef } from 'react';
import { Coords, Place, fetchPlacesThunk, selectNextPlace, selectPlace, selectPreviousPlace, setPlaces } from './placesSlice';
import mapboxgl from 'mapbox-gl';
import { Slider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { CachedPlaces, LocalStorageService } from '../../../utils/local-storage/localStorageService';
import moment from 'moment';
import { PageHeader, PageHeaderProps } from '../../shared/page-header/PageHeader';
import { Loading } from '../../shared/loading/Loading';


export function Places() {
    const dispatch: any = useDispatch();

    const pageHeaderProps: PageHeaderProps = {
        title: 'places',
        subtitle: 'where we\'ve been, where we are...',
        color: 'teal'
    };

    // Places State
    const placesState = useSelector((state: RootState) => state.places);
    const places: Place[] = useSelector((state: RootState) => state.places).value.places;

    // Mapbox GL JS
    const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    mapboxgl.accessToken = mapboxAccessToken ? mapboxAccessToken : '';
    const map: React.MutableRefObject<any> = useRef(null);
    const mapContainer: React.MutableRefObject<any> = useRef(null);


    useEffect(() => {
        // Fetch places data once per app load.
        if (placesState.status === 'idle') {
            // Attempt places data fetch from local storage:
            const cachedPlaces: CachedPlaces = LocalStorageService.getPlaces();
            if (cachedPlaces == null) {
                console.log('No cached places. Fetching places.');
                dispatch(fetchPlacesThunk());
            } else {
                const placesTtl = 1209600000 // TTL 14 Days
                const cachedTimestamp: number = cachedPlaces.timestamp;
                const currentTimestamp: number = moment().valueOf();

                if (currentTimestamp - cachedTimestamp > placesTtl) {
                    dispatch(fetchPlacesThunk());
                    console.log('Cached places TTL exceeded. Fetching places.')
                } else {
                    dispatch(setPlaces(cachedPlaces.places));
                    console.log('Places fetched from cache.');
                }
            }
        }

        // Initialize Mapbox map only if it has not been initialized.
        if (map.current || placesState.value.places.length === 0) {
            return;
        } else {
            // Select first place.
            dispatch(selectPlace(placesState.value.places[0].place_id));

            // Initialize map.
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: placesState.value.mapbox.style,
                center: [placesState.value.mapbox.lng, placesState.value.mapbox.lat],
                zoom: placesState.value.mapbox.zoom,
                interactive: placesState.value.mapbox.interactive
            });

            // Create marker for each place.
            places.forEach(place => new mapboxgl
                .Marker({ color: "#67ffe899" }) // $teal-opc60
                .setLngLat(place.coords)
                .addTo(map.current)
            );

            // Set zoom level to 5 once map has loaded.
            map.current.on('load', () => {
                if (map.current?.loaded) {
                    setTimeout(() => {
                        mapFlyTo(placesState.value.places[0].coords)
                    }, 50);
                }
            });
        }

        return () => {
            // Cleanup code run when component is removed from page:
        };
    }, [places, placesState, dispatch])

    const mapFlyTo = (center: Coords) => {
        if (map.current != null) map.current.flyTo({ zoom: 5, center: center })
    }

    // 'now' / 'then' nav buttons
    const placesNavButton = (type: 'now' | 'then') => {
        function handleClick() {
            if (placesState.value.selectedPlace != null) {
                const selectedPlaceIndex = placesState.value.selectedPlace?.order - 1;
                const placesCount = placesState.value.places.length;

                if (type === 'now') {
                    dispatch(selectNextPlace());
                    if (selectedPlaceIndex < placesCount - 1) {
                        mapFlyTo(placesState.value.places[selectedPlaceIndex + 1].coords);
                    }
                } else {
                    dispatch(selectPreviousPlace());
                    if (selectedPlaceIndex > 0) {
                        mapFlyTo(placesState.value.places[selectedPlaceIndex - 1].coords);
                    }
                }
            }
        }

        return type === 'then' ?
            (
                <button onClick={handleClick} className='change-place-btn'>
                    <FontAwesomeIcon icon={solid("angle-left")} /> then
                </button>
            ) : (
                <button onClick={handleClick} className='change-place-btn'>
                    now <FontAwesomeIcon icon={solid("angle-right")} />
                </button>
            )
    }

    // Places slider.
    const placesNavSlider = <>
        <Slider className='places-slider'
            aria-label="places slider"
            valueLabelDisplay="off"
            defaultValue={1}
            value={placesState.value.selectedPlace?.order ?? 1}
            size="small"
            step={1}
            marks
            min={1}
            max={placesState.value.places.length}
            sx={{ color: 'white' }}
        />
    </>

    // Place button.
    const placeButton = (place: Place) => {
        function handleClick() {
            dispatch(selectPlace(place.place_id));
            mapFlyTo(place.coords);
        }

        const active = placesState.value.selectedPlace?.place_id === place.place_id;

        return (<button onClick={handleClick} className={active ? 'place-btn active' : 'place-btn'} key={place.place_id}>{place.displayName}</button>)
    }
    const placeButtons = <>
        {places.map(place => <>{placeButton(place)}</>)}
    </>

    const selectedPlace = useSelector((state: RootState) => state.places.value.selectedPlace);
    const selectedPlaceDetails = <>
        <h1 className='place-name'>
            <FontAwesomeIcon className='marker-icon' icon={solid("location-dot")} /> {selectedPlace?.fullName}
        </h1>
        <div className='place-years'>{selectedPlace?.years.start}-{selectedPlace?.years.end == null ? 'Present' : selectedPlace?.years.end}</div>
        <div className='place-text'>{selectedPlace?.description}</div>
    </>

    const placesContent = placesState.status === 'succeeded' ?
        <>
            <div className='places-nav'>
                <div className='places-nav-slider'>
                    {placesNavButton('then')}{placesNavSlider}{placesNavButton('now')}
                </div>

                <div className='place-btn-div'>
                    {placeButtons}
                </div>
            </div>

            <div className='selected-place'>
                <div className='selected-place-details'>
                    {selectedPlaceDetails}
                </div>
            </div>
        </> :
        <Loading color={pageHeaderProps.color} />


    return (
        <div className='content'>
            <PageHeader title={pageHeaderProps.title} subtitle={pageHeaderProps.subtitle} color={pageHeaderProps.color} />

            <div ref={mapContainer} className="map-container" />

            {placesContent}
        </div>
    );
}
