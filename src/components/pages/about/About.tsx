import './About.scss';
import { PageHeader, PageHeaderProps } from '../../shared/page-header/PageHeader';


export function About() {

    const pageHeaderProps: PageHeaderProps = {
        title: 'about',
        subtitle: 'who, what, when, where...',
        color: 'green'
    };

    return (
        <div className='content'>
            <PageHeader title={pageHeaderProps.title} subtitle={pageHeaderProps.subtitle} color={pageHeaderProps.color} />

            <div>
                This is the about page.
            </div>
        </div>
    );
}
