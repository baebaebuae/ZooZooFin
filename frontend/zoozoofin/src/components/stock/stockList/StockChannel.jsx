import { useState } from 'react';

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

const StockChannel = ({ onChannelSelect }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedChannel, setSelectedChannel] = useState(null);

    const handleOpenModal = (channel) => {
        setIsModalOpen(true);
        setSelectedChannel(channel);
        console.log(isModalOpen);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSelectChannel = (channelName) => {
        onChannelSelect(channelName); // 부모 컴포넌트로 채널 이름 전달
    };

    return (
        <>
            {isModalOpen && <ChannelModal channel={selectedChannel} onClose={handleCloseModal} />}
            <ChannelMessage>
                <MessageIcon />
                주식 채널을 선택해줘 개굴!
            </ChannelMessage>
            <ChannelCard>
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
                <OverlayCard $isLocked={false}>
                    <LockedIcon /> LOCKED
                </OverlayCard>
            </ChannelCard>
            <ChannelCard>
                <ChannelInfo onClick={() => handleSelectChannel('ETF')}>
                    <ETFIcon />
                    ETF
                </ChannelInfo>
                <DetailButton onClick={() => handleOpenModal('ETF')}>설명</DetailButton>
                <OverlayCard $isLocked={false}>
                    <LockedIcon /> LOCKED
                </OverlayCard>
            </ChannelCard>
        </>
    );
};

export default StockChannel;
