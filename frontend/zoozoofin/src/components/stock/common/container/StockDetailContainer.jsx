import styled from 'styled-components';

export const CardTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 12px;
    font-size: 20px;
    font-weight: bold;
`;

export const NewsList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 5px;
    width: 100%;
`;

export const NewsTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 12px;
    font-size: 15px;
    width: 100%;
`;

export const NewsName = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0px;
    gap: 10px;
    width: 100%;
`;

export const StockDetailRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px;
    width: 100%;
`;

export const StockInfoColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 5px;
`;

export const StockInfoText = styled.p`
    margin: 0px;
    font-size: ${({ type }) => (type === 'title' ? '14px' : '18px')};
    font-weight: ${({ type }) => (type === 'price' ? 'bold' : 'nomal')};
`;

export const StockPriceRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 5px;
`;

export const DetailButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
`;
