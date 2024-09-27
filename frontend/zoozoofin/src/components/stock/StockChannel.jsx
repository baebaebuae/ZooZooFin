import { ChannelCard, ChannelMessage, ChannelInfo, MoveButton } from './StockComponent';
import { MessageIcon, DomesticIcon, OverseasIcon, ETFIcon } from './StockIcons';

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
                <MoveButton>설명</MoveButton>
            </ChannelCard>
            <ChannelCard>
                <ChannelInfo>
                    <OverseasIcon />
                    해외 주식
                </ChannelInfo>
                <MoveButton>설명</MoveButton>
            </ChannelCard>
            <ChannelCard>
                <ChannelInfo>
                    <ETFIcon />
                    ETF
                </ChannelInfo>
                <MoveButton>설명</MoveButton>
            </ChannelCard>
        </>
    );
};

export default StockChannel;
