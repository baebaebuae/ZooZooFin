import styled from 'styled-components';
import { Modal } from '@components/root/modal';
import { ActiveButton } from '@components/stock/common/button/Button';
import { ChannelExplain } from '@components/stock/common/container/ChannelContainer';
import { MessageIcon, FieldIcon } from '@components/stock/common/icon/StockIcons';

import channelData from '@components/stock/common/store/ChannelData.json';
import { StockFieldList } from '@components/stock/stockItem/StockField';

import {
    marketTotal,
    dividendYield,
    PBR,
    PER,
    ROE,
    MovingAverage,
} from '@components/stock/common/icon/StockExplain';

const BubbleLineHighlight = styled.span`
    font-size: 15px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.tertiary};
    text-shadow:
        -2px 0 white,
        0 2px white,
        2px 0 white,
        0 -2px white;
`;
const BubbleLine = styled.span`
    text-align: left;
    margin-bottom: 8px;
    line-height: 1.8;
    font-size: 14px;
    color: black;
`;

const LineContainer = styled.div`
    margin: 3px 0px;
    width: 100%;
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin: 5px 0px;
    padding: 4px 0px;
    background-color: white;
`;

const ClosedButton = styled(ActiveButton)`
    background-color: #67eb00;
    width: 100%;
    margin-top: 20px;
`;

const ImageList = ({ channel }) => {
    return (
        <ImageContainer>
            {Object.entries(StockFieldList[channel]).map(([key, value], index) => (
                <FieldIcon key={index} field={key} label={value} />
            ))}
        </ImageContainer>
    );
};

const formatTextWithImages = (line, channel) => {
    if (line === '${imageList}') {
        // ${imageList} 부분이 있으면 ImageList 컴포넌트를 렌더링
        return <ImageList key={line} channel={channel} />;
    }

    const parts = line.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            // **강조**된 부분만 bold 처리
            return <BubbleLineHighlight key={index}>{part.slice(2, -2)}</BubbleLineHighlight>;
        }
        return <BubbleLine key={index}>{part}</BubbleLine>; // 일반 텍스트는 기본 스타일 적용
    });
};

const ChannelDescriptionModal = ({ channel, onClose, channelData, title }) => {
    const lines = channelData ? channelData['description'] : [];
    return (
        <Modal onClose={onClose}>
            <ChannelExplain>
                <MessageIcon /> {title} 채널
            </ChannelExplain>

            {lines.map((line, index) => (
                <LineContainer key={index}>{formatTextWithImages(line, channel)}</LineContainer>
            ))}

            <ClosedButton onClick={onClose}>닫기</ClosedButton>
        </Modal>
    );
};
export const ChannelModal = ({ channel, onClose }) => {
    const selectedChannelData = channelData.channels.find((c) => c.name === channel);
    let title = '';
    let nowChannel = '';
    if (channel === '국내 주식') {
        title = '국내 주식';
        nowChannel = 'domestic';
    } else if (channel === '해외 주식') {
        title = '해외 주식';
        nowChannel = 'overseas';
    } else if (channel === 'ETF') {
        title = 'ETF';
        nowChannel = 'ETF';
    }
    return (
        <ChannelDescriptionModal
            channel={nowChannel}
            onClose={onClose}
            channelData={selectedChannelData}
            title={title}
        />
    );
};

// 상세 화면 설명 모달

const ImageWrapper = ({ image }) => {
    return <img src={image} style={{ width: '120%', height: '120%' }} />;
};

const TestStyle = styled.p`
    margin: 0px;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
    text-shadow:
        -2px 0 white,
        0 2px white,
        2px 0 white,
        0 -2px white;
`;

export const ExplainModal = ({ list, onClose }) => {
    const StockExplainInfo = {
        시가총액: marketTotal,
        배당수익률: dividendYield,
        PBR: PBR,
        PER: PER,
        ROE: ROE,
        이동평균선: MovingAverage,
    };
    const nowImage = StockExplainInfo[list];
    return (
        <>
            <Modal onClose={onClose}>
                <TestStyle>{list}</TestStyle>
                <ImageWrapper image={nowImage} />

                <ClosedButton onClick={onClose}>닫기</ClosedButton>
            </Modal>
        </>
    );
};
