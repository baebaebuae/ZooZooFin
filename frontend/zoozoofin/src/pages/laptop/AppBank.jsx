import { useState } from 'react';
import styled from 'styled-components';

import LaptopWindow from '@components/LaptopWindow';
import { Switch } from '@components/root/switch';

import { BankSavings } from '@components/laptop/BankSavings';
import { BankLoan } from '@components/laptop/BankLoan';

const AppBank = () => {
    const [currentContent, setCurrentContent] = useState('예적금');

    const handleTabChange = (content) => {
        setCurrentContent(content);
    };

    return (
        <LaptopWindow appName={'인터넷 뱅킹'}>
            <Switch onTabChange={handleTabChange} />
            {currentContent === '예적금' ? <BankSavings /> : <BankLoan />}
        </LaptopWindow>
    );
};

export default AppBank;
