import React from 'react';
import LaptopWindow from '@components/LaptopWindow';
import { Ranking } from '@components/laptop/Ranking';

const AppRanking = () => {
    return (
        <LaptopWindow appName={'리더보드'}>
            <Ranking />
        </LaptopWindow>
    );
};

export default AppRanking;
