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
    font-size: 14px;
    gap: 15px;
`;
