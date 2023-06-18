import { useState } from 'react';
import { Button } from '@mui/material';

export function About() {
    const [age, setAge] = useState(31);

    return (
        <div className='content'>
            <h1>About this site...</h1>
            <div>I am {age} years old.</div>

            <Button variant="outlined" type="button" onClick={() => setAge(age - 1)}>- Subtract</Button>
            <Button variant="outlined" type="button" onClick={() => setAge(age + 1)}>+ Add</Button>
        </div>
    );
}
