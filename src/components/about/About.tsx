import React, { useState } from 'react';

import styles from './About.module.scss';

export function About() {
    const [age, setAge] = useState(31);

    return (
        <div>
            <h1>About this site...</h1>
            <div>I am {age} years old.</div>

            <button type="button" onClick={() => setAge(age - 1)}>- Subtract</button>
            <button type="button" onClick={() => setAge(age + 1)}>+ Add</button>
        </div>
    );
}