import styled from 'styled-components';
import { Button } from '@components/root/buttons';

export const DetailButton = styled(Button)`
    background-color: #67eb00;
    padding: 8px 20px;
    font-size: 15px;
`;

export const ActiveButton = styled(Button)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: ${({ size }) => (size === 'large' ? '12px 20px' : '10px 12px')};
    padding: 10px 20px;
    gap: 10px;
    background-color: ${({ theme }) => theme.colors.primaryDeep};
    border: 5px solid white;
`;

export const InactiveButton = styled(Button)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    gap: 10px;
    background-color: ${({ theme }) => theme.colors.inactive};
`;

export const InputButton = styled(Button)`
    color: white;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 28px;
    cursor: pointer;
    font-family: ${({ size }) => (size === 'small' ? 'OneMobile' : 'OneMobilePop')};
    background-color: ${({ theme, color }) => theme.colors[color]};
    padding: ${({ size }) =>
        size === 'small' ? '6px 10px' : size === 'large' ? '12px 20px' : '8px 12px'};
    font-size: 12px;
`;

export const PlusButton = styled(Button)`
    color: white;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 28px;
    cursor: pointer;
    background-color: #08b9ff;
    padding: 6px 16px;
    font-size: 14px;
`;

export const QuestionButton = styled(Button)`
    background-color: ${({ theme }) => theme.colors.primaryShadow};
    font-size: 14px;
    padding: 2px 6px;
    border-radius: 100%;
`;
