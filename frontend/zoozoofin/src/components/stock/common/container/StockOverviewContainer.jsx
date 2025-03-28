import styled from 'styled-components';
import { LargeIcon } from '@components/root/icon';
import IconOverview from '@assets/images/icons/stocks/icon_overview.png';
import { QuestionButton } from '@components/stock/common/button/Button';
import { Divider } from '@components/stock/common/card/StoreCards';
import useStockStore from '../store/StockStore';

const CardColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0px;
    width: 100%;
`;
const CardRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0px;
    width: 100%;
`;

const TitleRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    gap: 12px;
`;

const OverviewColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    margin: 0 auto;
`;

export const OverviewText = styled.p`
    margin: 0;
    font-size: ${({ type }) => (type === 'title' ? '20px' : '15px')};
    font-weight: ${({ type }) => (type === 'title' || type === 'content' ? 'bold' : 'normal')};
    color: ${({ theme, type }) =>
        type === 'title' || type === 'list' || type === 'content' ? 'black' : theme.colors.gray};
`;

export const Title = ({ quarter, channel }) => {
    const { clickedStockInfo } = useStockStore();

    if (channel) {
        if (channel === 'ETF') {
            return (
                <CardColumn>
                    <TitleRow>
                        <LargeIcon icon={IconOverview} />
                        <OverviewColumn>
                            <OverviewText type={'title'}>구성 종목</OverviewText>
                        </OverviewColumn>
                    </TitleRow>
                    <OverviewText>{clickedStockInfo.stockName}</OverviewText>
                </CardColumn>
            );
        } else {
            return (
                <CardRow>
                    <TitleRow>
                        <LargeIcon icon={IconOverview} />
                        <OverviewColumn>
                            <OverviewText>{quarter ? `${quarter}분기` : ''}</OverviewText>
                            <OverviewText type={'title'}>재무제표</OverviewText>
                        </OverviewColumn>
                    </TitleRow>
                    <OverviewText>{clickedStockInfo.stockName}</OverviewText>
                </CardRow>
            );
        }
    }
};

const ListColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    width: 100%;
`;

const ListRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 10px;
`;

export const OverviewList = ({ list, item, onClick }) => {
    return (
        <ListColumn>
            <CardRow>
                <ListRow>
                    <OverviewText type={'list'}>{list}</OverviewText>
                    <QuestionButton onClick={() => onClick(list)}>?</QuestionButton>
                </ListRow>
                <OverviewText type={'content'}>
                    {item ? `${item.toLocaleString()}` : '-'}
                </OverviewText>
            </CardRow>
            <Divider />
        </ListColumn>
    );
};

export const GraphTitle = ({ onClick }) => {
    return (
        <ListRow>
            <OverviewText type={'title'}>이동평균선</OverviewText>
            <QuestionButton onClick={() => onClick('이동평균선')}>?</QuestionButton>
        </ListRow>
    );
};
