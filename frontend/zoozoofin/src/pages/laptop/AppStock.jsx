import React from 'react';
import LaptopWindow from '@components/LaptopWindow';
import { Stock } from '@components/laptop/Stock';

const AppStock = () => {
    return (
        <LaptopWindow appName={'주주증권'}>
            <Stock />
        </LaptopWindow>
    );
};

export default AppStock;
