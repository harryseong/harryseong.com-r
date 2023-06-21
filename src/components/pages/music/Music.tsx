import { useEffect } from 'react';
import './Music.scss';
import { PageHeader, PageHeaderProps } from '../../shared/page-header/PageHeader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Loading } from '../../shared/loading/Loading';
import { TypeAnimation } from 'react-type-animation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { fetchCurrentlyPlayingThunk } from './musicSlice';


export function Music() {
    const dispatch: any = useDispatch();

    const pageHeaderProps: PageHeaderProps = {
        title: 'music',
        subtitle: 'i hear vibrations in the air...',
        color: 'green'
    };

    const musicState: any = useSelector((state: RootState) => state.music);
    const currentlyPlaying: any = useSelector((state: RootState) => state.music).value.currentlyPlaying;

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(fetchCurrentlyPlayingThunk());
        }, 5000);

        if (musicState.status === 'idle') {
            dispatch(fetchCurrentlyPlayingThunk());
        }

        return () => {
            // Cleanup code run when component is removed from page:
            clearInterval(interval);
        };
    }, [dispatch, musicState]);

    const musicNotPlaying = (
        <div className='not-playing'>
            <div className='not-playing-content'>
                <h1 className="not-playing-header">How boring <FontAwesomeIcon icon={regular("face-meh")} /></h1>
                <TypeAnimation
                    className={'not-playing-text'}
                    sequence={['Harry is not listening to anything right now. Check back later, maybe he\'ll be jamming to some tunes then!']}
                    wrapper="div" speed={85} cursor={false} repeat={0}
                />
            </div>
        </div>
    );

    const artists = () => {
        if (currentlyPlaying && currentlyPlaying.item) {
            const artists = currentlyPlaying.item.artists;

            return (
                <div className='artists-div'>
                    {artists.map((artist: any, index: number) => <>
                        <span className='artist-name'>{artist.name}</span>
                        {index < artists.length - 1 && <span>, </span>}
                    </>)}
                </div>
            )
        }

        return;
    }

    const musicPlaying = (currentlyPlaying && currentlyPlaying.item) ? (
        <div className='playing'>
            <div className='playing-content'>
                <img src={currentlyPlaying.item.album.images[0].url} alt='album cover' className="album-cover" />

                <div className='song-name-div'>
                    <a href={currentlyPlaying.item.uri} className={"song-name" + (currentlyPlaying.item.name.length > 40 ? " long-name" : "")}>{currentlyPlaying.item.name}</a>
                </div>

                {artists()}

                <div className='playing-now-text animate-flicker'>
                    <FontAwesomeIcon icon={regular("circle-play")} />&nbsp;playing now on harry's&nbsp;
                    <img className="spotify-logo" src="/Spotify_Logo_RGB_Green.png" />
                </div>
            </div>
        </div>
    ) : (<></>);

    const musicContent = (
        musicState.status === 'idle' ?
            <Loading /> :
            (currentlyPlaying && currentlyPlaying.is_playing ? musicPlaying : musicNotPlaying)
    );

    return (
        <div className='content'>
            <PageHeader title={pageHeaderProps.title} subtitle={pageHeaderProps.subtitle} color={pageHeaderProps.color} />

            {musicContent}
        </div>

    );
}
