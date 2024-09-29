// 대출 이사 계산기
// 모달로 띄우는 게 좋을듯

import styled from 'styled-components';
import { Card } from '@components/root/card';
import { Button } from '@components/root/buttons';
// component로 빼면 import 수정
import { RepayTypeBlock } from './LoanJoinCard';
import { TurnSliderInterest } from '@components/root/slider';
import { InputBoxLoan } from '@components/inputBox';

const InfoTitle = styled.div`
    font-size: 18px;
    color: ${({ theme }) => theme.colors.gray};
    margin: 8px 0;
`;

const CardBlock = styled(Card)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 8px 0;
`;

export const LoanCalculator = ({ repayType, handleClick }) => {
    return (
        <CardBlock onClick={handleClick}>
            <InfoTitle>대출 이자 계산기</InfoTitle>
            <RepayTypeBlock loanType={`${repayType}균등상환`} />
            <InputBoxLoan
                title={'대출원금'}
                amount1={500000}
                amount2={1000000}
                amount3={5000000}
                amount4={10000000}
                // maxAmount={100000000}
                onSavingsAmountChange={() => {}}
                isSavings={false}
            ></InputBoxLoan>{' '}
            <TurnSliderInterest unit={'턴'} title={'대출기간'} min={1} max={50} />
            <TurnSliderInterest unit={'%'} title={'대출금리'} min={1} max={10} />
            <Button size={'normal'} color={'primary'}>
                계산하기
            </Button>
        </CardBlock>
    );
};
