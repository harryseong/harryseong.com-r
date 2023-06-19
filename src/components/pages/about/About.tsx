import { useState } from 'react';
import { Button } from '@mui/material';
import { PageHeader, PageHeaderProps } from '../../shared/page-header/PageHeader';

export function About() {

    const pageHeaderProps: PageHeaderProps = {
        title: 'about',
        subtitle: 'who, what, when, where...',
        color: 'green'
    };

    const [age, setAge] = useState(31);

    return (
        <div className='content'>
            <PageHeader title={pageHeaderProps.title} subtitle={pageHeaderProps.subtitle} color={pageHeaderProps.color} />

            <div>I am {age} years old.</div>

            <Button variant="outlined" type="button" onClick={() => setAge(age - 1)}>- Subtract</Button>
            <Button variant="outlined" type="button" onClick={() => setAge(age + 1)}>+ Add</Button>
        </div>
    );
}
