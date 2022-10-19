import React, { useState } from 'react';
import { Button } from '@mui/material';

import styles from './About.module.scss';

export function About() {
    const [age, setAge] = useState(31);

    return (
        <div>
            <h1>About this site...</h1>
            <div>I am {age} years old.</div>

            <Button type="button" onClick={() => setAge(age - 1)}>- Subtract</Button>
            <Button type="button" onClick={() => setAge(age + 1)}>+ Add</Button>
        </div>
    );
}