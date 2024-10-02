import styled from 'styled-components';
import { LargeIcon } from '@components/root/icon';
import IconOverview from '@assets/images/icons/stocks/icon_overview.png';
import { QuestionButton } from '@components/stock/common/button/Button';
import { Divider } from '@components/stock/common/card/StoreCards';

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
    color: ${({ type }) =>
        type === 'title' || type === 'list' || type === 'content' ? 'black' : '#6C7377'};
`;

export const Title = ({ quarter }) => {
    return (
        <CardRow>
            <TitleRow>
                <LargeIcon icon={IconOverview} />
                <OverviewColumn>
                    <OverviewText>{quarter}분기</OverviewText>
                    <OverviewText type={'title'}>재무제표</OverviewText>
                </OverviewColumn>
            </TitleRow>
            <OverviewText>개굴자동차</OverviewText>
        </CardRow>
    );
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

export const OverviewList = ({ list, item }) => {
    return (
        <ListColumn>
            <CardRow>
                <ListRow>
                    <OverviewText type={'list'}>{list}</OverviewText>
                    <QuestionButton>?</QuestionButton>
                </ListRow>
                <OverviewText type={'content'}>{item}</OverviewText>
            </CardRow>
            <Divider />
        </ListColumn>
    );
};

export const GraphTitle = () => {
    return (
        <ListRow>
            <OverviewText type={'title'}>이동평균선</OverviewText>
            <QuestionButton>?</QuestionButton>
        </ListRow>
    );
};
