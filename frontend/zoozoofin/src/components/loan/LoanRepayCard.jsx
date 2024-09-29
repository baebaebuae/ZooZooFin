// 대출 상품 조회 개별 카드
import styled from 'styled-components';
import { Card } from '@components/root/card';
import { Button } from '@components/root/buttons';

const CardBlock = styled(Card)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 8px 0;
`;

const InfoTitleBlock = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const InfoTitle = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray};
`;

const InfoContentBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
`;

const InfoContent = styled.div`
    font-size: 10px;
    color: ${({ theme }) => theme.colors.gray};
`;

const LoanContentBox = styled.div`
    width: 100%;
    display: flex;
    /* flex-direction: column; */
    justify-content: space-around;
    gap: 10px;
`;

const LoanContent = styled.div`
    font-size: 14px;
    text-align: center;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primaryDeep};
`;

export const LoanRepayCard = ({
    warning,
    loanNumber,
    loanRate,
    payBackTurn,
    loanPeriod,
    loanRemain,
    handleClick,
}) => {
    return (
        <CardBlock onClick={handleClick}>
            <InfoTitleBlock>
                <InfoTitle>대출 {loanNumber}</InfoTitle>
                <InfoContentBox>
                    {warning ? (
                        <Button size={'small'} color={'warn'}>
                            경고
                        </Button>
                    ) : payBackTurn === loanPeriod ? (
                        <Button size={'small'} color={'primaryDeep'}>
                            만기
                        </Button>
                    ) : (
                        <Button size={'small'} color={'tertiary'}>
                            납입중
                        </Button>
                    )}
                    <InfoContent>
                        {payBackTurn} / {loanPeriod}
                    </InfoContent>
                </InfoContentBox>
            </InfoTitleBlock>
            <LoanContentBox>
                <InfoTitle>금리 {loanRate}%</InfoTitle>
                <LoanContent>{loanRemain}원</LoanContent>
            </LoanContentBox>
        </CardBlock>
    );
};
