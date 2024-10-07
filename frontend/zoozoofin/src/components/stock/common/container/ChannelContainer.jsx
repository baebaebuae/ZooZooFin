import styled from 'styled-components';
import { MessageBox } from '@components/root/messageBox';

// 주식 채널
export const ChannelMessage = styled(MessageBox)`
    justify-content: center;
    width: 75%;
    font-size: 16px;
`;

export const ChannelInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    gap: 15px;
`;

export const ChannelExplain = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 18px;
    gap: 10px;
    height: 30px;
    margin-bottom: 20px;
`;
