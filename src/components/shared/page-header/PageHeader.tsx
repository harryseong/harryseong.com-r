import './PageHeader.scss';
import { TypeAnimation } from 'react-type-animation';

export interface PageHeaderProps {
    title: string;
    subtitle: string;
    color: 'teal' | 'pink' | 'green' | 'yellow';
}

export function PageHeader(props: PageHeaderProps) {

    return (
        <div className='page-header'>
            <div className='page-title'>{props.title}</div>
            <TypeAnimation
                className={'page-subtitle ' + props.color}
                sequence={[props.subtitle]}
                wrapper="div"
                speed={80}
                cursor={false}
                repeat={0}
            />
        </div>
    )
}
