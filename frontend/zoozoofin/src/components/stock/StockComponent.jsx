import styled from 'styled-components';
import { MessageBox } from '../root/messageBox';
import { Card } from '../root/card';
import { Button } from '../root/buttons';

// 주식 채널
export const ChannelMessage = styled(MessageBox)`
    justify-content: center;
    width: 75%;
    font-size: 16px;
`;

export const ChannelCard = styled(Card)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    width: 75%;
`;

export const ChannelInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    gap: 15px;
`;

export const MoveButton = styled(Button)`
    background-color: #67eb00;
    padding: 8px 20px;
    font-size: 15px;
`;

// 주식 분야 아이콘
export const DefaultField = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 85px;
    height: 85px;
`;

export const DefaultFieldBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    width: 60px;
    height: 60px;
    border-radius: 50%;
`;

export const ActiveFieldBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background};
    border: 5px solid white;
    width: 50px;
    height: 60px;
    border-radius: 50%;
`;
