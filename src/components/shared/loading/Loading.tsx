import './Loading.scss';
import { CircularProgress } from "@mui/material";
import { TypeAnimation } from 'react-type-animation';

export interface LoadingProps {
    color: string;
}

export function Loading(props: LoadingProps) {

    return (
        <div className="loading">
            <div className='circular-progress'>
                <CircularProgress
                    size={75} sx={{ color: props.color }}
                />
            </div>

            <div className='type-animation'>
                <TypeAnimation
                    className={'loading-text animate-flicker'}
                    sequence={['loading...']}
                    wrapper="div"
                    speed={80}
                    cursor={true}
                    repeat={0}
                />
            </div>
        </div>
    )
}
