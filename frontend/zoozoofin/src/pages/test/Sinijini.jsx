// import React from "react";
import TestPaper from "../../components/school/TestPaper";
import CharacterInfo from "../../components/character/CharacterInfo";
import MissionDashboard from "../../components/Mission";
import Hint from "../../components/stock/Hint";
import Education from "../Education";
import Portfolio from "../../components/character/Portfolio";
import React, { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  margin: 10px 0;
`;

const Sinijini = () => {
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

  const openPortfolio = () => setIsPortfolioOpen(true);
  const closePortfolio = () => setIsPortfolioOpen(false);
  return (
    <>
      <h1>희진 작업실</h1>
      <div>
      <Button onClick={openPortfolio}>포트폴리오 열기</Button>
      <Portfolio isOpen={isPortfolioOpen} onClose={closePortfolio} />
      </div>

      <hr /><hr />
      <h5>주식 힌트, 교육</h5>
      {/* <MissionDashboard/> */}
      <Hint/>
      {/* <Education/> */}
      {/* <CharacterInfo></CharacterInfo> */}
      {/* <TestPaper/> */}

    </>
  );
};

export default Sinijini;