// Header에 사용되는 버튼 4개
import styled from 'styled-components';
import HeaderWallet from '@assets/images/components/header/header_wallet.svg?react';
import HeaderMenu from '@assets/images/components/header/header_menu.svg?react';
import HeaderMap from '@assets/images/components/header/header_map.svg?react';
// 일단 급하게 사이즈 줄여놨는데, svg파일 용량 줄이는 법 더 찾기

const HeaderButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: 3px solid white;
`;

const HeaderButton1 = styled(HeaderButton)`
    background-color: lightgray;
`;

const HeaderButton2 = styled(HeaderButton)`
    background-color: #f0e92d;
`;

const HeaderButton3 = styled(HeaderButton)`
    background-color: #67eb00;
`;

const HeaderButton4 = styled(HeaderButton)`
    font-family: 'OneMobilePop';
    text-shadow:
        -2px 0 black,
        0 2px black,
        2px 0 black,
        0 -2px black;
    color: white;
    background-color: #08b9ff;
`;

export const HeaderButtons = ({ currentTurn }) => {
    return (
        <div>
            <HeaderButton1>
                <HeaderMenu width={20} height={20} />
            </HeaderButton1>
            <HeaderButton2>
                <HeaderWallet width={30} height={30} />
            </HeaderButton2>
            <HeaderButton3>
                <HeaderMap width={30} height={30} />
            </HeaderButton3>
            <HeaderButton4>{currentTurn}</HeaderButton4>
        </div>
    );
};

export const HeaderHamburgerButton = () => {
    return (
        <>
            <HeaderButton1>
                <HeaderMenu width={20} height={20} />
            </HeaderButton1>
        </>
    );
};

export const HeaderMapButton = () => {
    return (
        <>
            <HeaderButton3>
                <HeaderMap width={30} height={30} />
            </HeaderButton3>
        </>
    );
};

export const HeaderWalletButton = () => {
    return (
        <>
            <HeaderButton2>
                <HeaderWallet width={30} height={30} />
            </HeaderButton2>
        </>
    );
};

export const HeaderTurnButton = ({ currentTurn }) => {
    return (
        <>
            <HeaderButton4>{currentTurn}</HeaderButton4>
        </>
    );
};
