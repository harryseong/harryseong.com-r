import { useEffect } from 'react';
import './Music.scss';
import { PageHeader, PageHeaderProps } from '../../shared/page-header/PageHeader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { fetchCurrentlyPlayingThunk } from './musicSlice';
import { Loading } from '../../shared/loading/Loading';
import { TypeAnimation } from 'react-type-animation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';


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

    const musicContent = (
        musicState.status === 'idle' || !currentlyPlaying ?
            <Loading /> :
            (
                currentlyPlaying && currentlyPlaying.is_playing ?
                    <>
                        <img src={currentlyPlaying.item.album.images[0].url} alt='album cover' className="album-cover" />
                    </>
                    :
                    <>
                        <h1 className="music-header">How boring <FontAwesomeIcon icon={regular("face-meh")} /></h1>

                        <TypeAnimation
                            className={'test'}
                            sequence={['Harry is not listening to anything right now. Check back later, maybe he\'ll be jamming to some tunes then!']}
                            wrapper="div"
                            speed={80}
                            cursor={false}
                            repeat={0}
                        />
                    </>
            )

    )

    return (
        <div className='content'>
            <PageHeader title={pageHeaderProps.title} subtitle={pageHeaderProps.subtitle} color={pageHeaderProps.color} />

            {musicContent}
        </div>

    );
}
