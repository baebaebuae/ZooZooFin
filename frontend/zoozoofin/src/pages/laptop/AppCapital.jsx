import React from 'react';
import LaptopWindow from '@components/LaptopWindow';

import { Capital } from '@components/laptop/Capital';

const AppCapital = () => {
    return (
        <LaptopWindow appName={'콩팥캐피탈'}>
            <Capital />
        </LaptopWindow>
    );
};

export default AppCapital;
