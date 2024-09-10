import styled from 'styled-components';

const AppIcon = styled.div`
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const BankAppIcon = styled(AppIcon)`
    background-color: orange;
`;

export const StockAppIcon = styled(AppIcon)`
    background-color: pink;
`;

export const LenderAppIcon = styled(AppIcon)`
    background-color: lightgreen;
`;

export const LeaderBoardAppIcon = styled(AppIcon)`
    background-color: lightblue;
`;
