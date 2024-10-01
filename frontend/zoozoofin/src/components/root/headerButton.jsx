// Header에 사용되는 버튼 4개
import styled from 'styled-components';
import HeaderWallet from '@assets/images/components/header/header_wallet.svg?react';
import HeaderMenu from '@assets/images/components/header/header_menu.svg?react';
import HeaderMap from '@assets/images/components/header/header_map.svg?react';
// 일단 급하게 사이즈 줄여놨는데, svg파일 용량 줄이는 법 더 찾기

import { useState } from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';

import MissionDashboard from '../../components/Mission';

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
    const [anchorEl, setAnchorEl] = useState(null);
    const [isMusicOn, setIsMusicOn] = useState(true);
    const [isMissionOpen, setIsMissionOpen] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMissionClick = () => {
        setIsMissionOpen(true);
        handleClose();
    };

    return (
        <>
            <HeaderButton1 onClick={handleClick}>
                <HeaderMenu width={20} height={20} />
            </HeaderButton1>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {/* UI 구현 예정 */}
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <HistoryRoundedIcon />
                    </ListItemIcon>
                    캐릭터 히스토리
                </MenuItem>
                <MenuItem onClick={handleMissionClick}>
                    <ListItemIcon>
                        <FlagRoundedIcon />
                    </ListItemIcon>
                    Mission
                </MenuItem>
                <MenuItem onClick={() => setIsMusicOn(!isMusicOn)}>
                    <ListItemIcon>
                        {isMusicOn ? <VolumeUpRoundedIcon /> : <VolumeOffRoundedIcon />}
                    </ListItemIcon>
                    BGM ON/OFF
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <LogoutRoundedIcon />
                    </ListItemIcon>
                    로그아웃
                </MenuItem>
            </Menu>
            <MissionDashboard 
                isOpen={isMissionOpen} 
                onClose={() => setIsMissionOpen(false)} 
            />
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