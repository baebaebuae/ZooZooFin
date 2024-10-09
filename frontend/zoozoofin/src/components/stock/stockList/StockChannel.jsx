import styled from 'styled-components';
import { Collapse } from '@mui/material';

import { useEffect, useState } from 'react';

import { ChannelCard, OverlayCard } from '@components/stock/common/card/ChannelCard';
import { ChannelMessage, ChannelInfo } from '@components/stock/common/container/ChannelContainer';
import {
    MessageIcon,
    DomesticIcon,
    OverseasIcon,
    LockedIcon,
    ETFIcon,
} from '@components/stock/common/icon/StockIcons';
import { DetailButton } from '@components/stock/common/button/Button';
import { ChannelModal } from '@components/stock/stockItem/StockModal';

import useUserStore from '../../../stores/useUserStore';
import useStockStore from '../common/store/StockStore';
import { useUserStockStore } from '@components/stock/common/store/StockStore';

const DropdownButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 15px;
    padding: 1px 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
    color: white;
    font-size: 10px;
    position: absolute;
    bottom: -5px;
    right: 20px;
`;
const StockChannel = ({ onChannelSelect }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedChannel, setSelectedChannel] = useState(null);

    // header -> turn undefined 문제 확인 24.10.08
    // turn 별 주식 채널 주식 리스트 fetch
    const { turn, fetchUserProfile } = useUserStore();
    const { fetchMyStocklist } = useUserStockStore();
    const { fetchStocklist } = useStockStore();
    useEffect(() => {
        fetchUserProfile();
        if (turn) {
            console.log(`now turn is ${turn}`);
            fetchStocklist(turn);
            fetchMyStocklist(turn);
        }
    }, [turn]);
    const handleOpenModal = (channel) => {
        // 주식 리스트 및 보유 주식 불러오기
        setIsModalOpen(true);
        setSelectedChannel(channel);
        console.log(isModalOpen);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const [isClicked, setIsClicked] = useState(false);
    const handleSelectChannel = (channelName) => {
        // 0.5초 후 채널 이동
        setTimeout(() => onChannelSelect(channelName), 500);
    };

    return (
        <>
            {isModalOpen && <ChannelModal channel={selectedChannel} onClose={handleCloseModal} />}
            <ChannelMessage>
                <MessageIcon />
                주식 채널을 선택해줘 개굴!
            </ChannelMessage>
            <ChannelCard
                onMouseEnter={() => setIsClicked(true)}
                onMouseLeave={() => setIsClicked(false)}
                $isClicked={isClicked}
            >
                <ChannelInfo onClick={() => handleSelectChannel('국내 주식')}>
                    <DomesticIcon />
                    국내 주식
                </ChannelInfo>
                <DetailButton onClick={() => handleOpenModal('국내 주식')}>설명</DetailButton>
                <OverlayCard $isLocked={false}>
                    <LockedIcon /> LOCKED
                </OverlayCard>
            </ChannelCard>
            <ChannelCard>
                <ChannelInfo onClick={() => handleSelectChannel('해외 주식')}>
                    <OverseasIcon />
                    해외 주식
                </ChannelInfo>
                <DetailButton onClick={() => handleOpenModal('해외 주식')}>설명</DetailButton>
                <OverlayCard $isLocked={turn >= 5 ? false : true}>
                    <LockedIcon /> LOCKED
                </OverlayCard>
            </ChannelCard>
            <ChannelCard>
                <ChannelInfo onClick={() => handleSelectChannel('ETF')}>
                    <ETFIcon />
                    ETF
                </ChannelInfo>
                <DetailButton onClick={() => handleOpenModal('ETF')}>설명</DetailButton>
                <OverlayCard $isLocked={turn >= 10 ? false : true}>
                    <LockedIcon /> LOCKED
                </OverlayCard>
            </ChannelCard>
        </>
    );
};

export default StockChannel;
