import { ChannelCard } from '@components/stock/common/card/ChannelCard';
import { ChannelMessage, ChannelInfo } from '@components/stock/common/container/ChannelContainer';
import {
    MessageIcon,
    DomesticIcon,
    OverseasIcon,
    ETFIcon,
} from '@components/stock/common/icon/StockIcons';
import { DetailButton } from '@components/stock/common/button/Button';

const StockChannel = () => {
    return (
        <>
            <ChannelMessage>
                <MessageIcon />
                주식 채널을 선택해줘 개굴!
            </ChannelMessage>
            <ChannelCard>
                <ChannelInfo>
                    <DomesticIcon />
                    국내 주식
                </ChannelInfo>
                <DetailButton>설명</DetailButton>
            </ChannelCard>
            <ChannelCard>
                <ChannelInfo>
                    <OverseasIcon />
                    해외 주식
                </ChannelInfo>
                <DetailButton>설명</DetailButton>
            </ChannelCard>
            <ChannelCard>
                <ChannelInfo>
                    <ETFIcon />
                    ETF
                </ChannelInfo>
                <DetailButton>설명</DetailButton>
            </ChannelCard>
        </>
    );
};

export default StockChannel;
