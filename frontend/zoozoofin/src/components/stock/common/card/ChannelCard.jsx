import styled from 'styled-components';
import { Card } from '@components/root/card';

export const ChannelCard = styled(Card)`
    // 해당 컴포넌트에만 있는 색상 적용
    background: ${({ $isClicked }) => ($isClicked ? '#C7E1F8' : 'white')};
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    width: 75%;
    height: 50px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
    font-weight: ${({ $isClicked }) => ($isClicked ? 'bold' : 'normal')};
    text-shadow:
        -1px 0 white,
        0 1px white,
        1px 0 white,
        0 -1px white;
`;

export const OverlayCard = styled.div`
    display: ${({ $isLocked }) => ($isLocked ? 'flex' : 'none')};
    position: absolute;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 25px;
    font-weight: bold;
    z-index: 10;
    border-radius: 13px;
    gap: 10px;
`;
