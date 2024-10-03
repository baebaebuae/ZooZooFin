import { ChannelCard } from '@components/stock/common/card/ChannelCard';
import { ChannelMessage, ChannelInfo } from '@components/stock/common/container/ChannelContainer';
import {
    MessageIcon,
    DomesticIcon,
    OverseasIcon,
    ETFIcon,
} from '@components/stock/common/icon/StockIcons';
import { DetailButton } from '@components/stock/common/button/Button';

const StockChannel = ({ onChannelSelect }) => {
    const handleSelectChannel = (channelName) => {
        onChannelSelect(channelName); // 부모 컴포넌트로 채널 이름 전달
    };

    return (
        <>
            <ChannelMessage>
                <MessageIcon />
                주식 채널을 선택해줘 개굴!
            </ChannelMessage>
            <ChannelCard>
                <ChannelInfo onClick={() => handleSelectChannel('국내 주식')}>
                    <DomesticIcon />
                    국내 주식
                </ChannelInfo>
                <DetailButton>설명</DetailButton>
            </ChannelCard>
            <ChannelCard>
                <ChannelInfo onClick={() => handleSelectChannel('해외 주식')}>
                    <OverseasIcon />
                    해외 주식
                </ChannelInfo>
                <DetailButton>설명</DetailButton>
            </ChannelCard>
            <ChannelCard>
                <ChannelInfo onClick={() => handleSelectChannel('ETF')}>
                    <ETFIcon />
                    ETF
                </ChannelInfo>
                <DetailButton>설명</DetailButton>
            </ChannelCard>
        </>
    );
};

export default StockChannel;
