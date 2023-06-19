import './Loading.scss';
import { CircularProgress } from "@mui/material";
import { TypeAnimation } from 'react-type-animation';


export function Loading() {

    return (
        <div className="loading">
            <div className='circular-progress'>
                <CircularProgress
                    size={75}
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
