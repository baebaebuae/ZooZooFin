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
import BedIcon from '@mui/icons-material/Bed';  // 잠자기 아이콘 추가
import MissionDashboard from '../../components/Mission';
import NextTurn from '../NextTurn';

import { getApiClient } from '@/stores/apiClient';
import { useNavigate } from 'react-router-dom';
import { useMusicStore } from '@stores/useMusicStore.js';

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
    const [isMissionOpen, setIsMissionOpen] = useState(false);
    const [isCharacterHistoryOpen, setIsCharacterHistoryOpen] = useState(false);
    const [isSleepModalOpen, setIsSleepModalOpen] = useState(false);
    const isMusicOn = useMusicStore((state) => state.isMusicOn);
    const toggleMusic = useMusicStore((state) => state.toggleMusic);

    const open = Boolean(anchorEl);

    const navigate = useNavigate();

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

    const handleCharacterHistoryClick = () => {
        navigate('/character-history'); // 캐릭터 히스토리 페이지
        handleClose();
    };

    const handleSleepClick = () => {
        setIsSleepModalOpen(true);
        handleClose();
    };

    const handleConfirmSleep = async () => {
        try {
            const apiClient = getApiClient();
            await apiClient.patch('/home/next');
            setIsSleepModalOpen(false);
            window.location.reload();
        } catch (error) {
            console.error('Failed to progress to next turn:', error);
        }
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
                <MenuItem onClick={handleCharacterHistoryClick}>
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
                <MenuItem onClick={handleSleepClick}>
                    <ListItemIcon>
                        <BedIcon />
                    </ListItemIcon>
                    잠자기
                </MenuItem>
                <MenuItem onClick={toggleMusic}>
                    <ListItemIcon>
                        {isMusicOn ? <VolumeOffRoundedIcon /> : <VolumeUpRoundedIcon />}
                    </ListItemIcon>
                    {isMusicOn ? 'BGM OFF' : 'BGM ON'}
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <LogoutRoundedIcon />
                    </ListItemIcon>
                    로그아웃
                </MenuItem>
            </Menu>
            <MissionDashboard isOpen={isMissionOpen} onClose={() => setIsMissionOpen(false)} />
            <NextTurn 
                isOpen={isSleepModalOpen}
                onClose={() => setIsSleepModalOpen(false)}
                onConfirm={handleConfirmSleep}
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
