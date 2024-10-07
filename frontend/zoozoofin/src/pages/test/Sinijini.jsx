import React, { useState } from 'react';
import styled from 'styled-components';
import TestPaper from '../../components/school/TestPaper';
import CharacterInfo from '../../components/character/CharacterInfo';
import MissionDashboard from '../../components/Mission';
import StockHint from '@components/stock/stockItem/StockHint';
import Education from '../Education';
import Portfolio from '../../components/character/Portfolio';

const Button = styled.button`
    cursor: pointer;
    margin: 10px 0;
`;

const Sinijini = () => {
    const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
    const [isStockHintOpen, setIsStockHintOpen] = useState(false);

    const openPortfolio = () => setIsPortfolioOpen(true);
    const closePortfolio = () => setIsPortfolioOpen(false);

    const openStockHint = () => setIsStockHintOpen(true);
    const closeStockHint = () => setIsStockHintOpen(false);

    return (
        <>
            <h1>희진 작업실</h1>
            <div>
                <Button onClick={openPortfolio}>포트폴리오 열기</Button>
                <Portfolio isOpen={isPortfolioOpen} onClose={closePortfolio} />
            </div>

            <hr />
            <hr />
            <h5>주식 힌트, 교육</h5>
            <div>
                <Button onClick={openStockHint}>주식 힌트 열기</Button>
                <StockHint isOpen={isStockHintOpen} onClose={closeStockHint} />
            </div>
            {/* <MissionDashboard/> */}
            {/* <Education/> */}
            {/* <CharacterInfo></CharacterInfo> */}
            {/* <TestPaper/> */}
        </>
    );
};

export default Sinijini;