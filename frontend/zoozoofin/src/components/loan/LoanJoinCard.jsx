// 대출 가입 카드
import { useState } from 'react';
import styled from 'styled-components';
import { ProductDetailInfo, ProductJoinInfo } from '@components/root/productDetailInfo';
import { Card, Divider } from '@components/root/card';
import { InputBox } from '@components/inputBox';
import { LoanButton, Button } from '@components/root/buttons';
import { TurnSliderLoan } from '@components/root/slider';

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

const RepayTypeButtonBox = styled.div`
    display: flex;
    gap: 10px;
`;

const BlockTitle = styled.div`
    font-size: 16px;
    color: ${({ theme }) => theme.colors.gray};
`;

const LoanTypeName = styled.div`
    font-size: 16px;
`;

const RepayTypeBox = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;

export const RepayTypeBlock = ({ loanType }) => {
    return (
        <RepayTypeBox>
            <LoanTypeName>{loanType}</LoanTypeName>
            <Button
                size={'small'}
                color={'tertiary'}
                // onClick={대출 이자 계산기 Component 꺼내는 함수}
            >
                설명
            </Button>
        </RepayTypeBox>
    );
};

export const LoanJoinCard = ({ currentTurn, productRate, handleClick }) => {
    const LoanTypes = ['원금', '원리금', '만기'];
    const [selectedType, setSelectedType] = useState(LoanTypes[0]);

    const RepayTypeButtonBlock = ({ title }) => {
        return (
            <>
                <BlockTitle>{title}</BlockTitle>
                <RepayTypeButtonBox>
                    {LoanTypes.map((loanType, index) => (
                        <LoanButton
                            key={index}
                            size={'normal'}
                            isSelected={loanType === selectedType}
                            onClick={() => setSelectedType(loanType)}
                        >
                            {loanType}
                        </LoanButton>
                    ))}
                </RepayTypeButtonBox>
            </>
        );
    };

    return (
        <CardBlock onClick={handleClick}>
            <InfoTitle>대출 서류</InfoTitle>
            <RepayTypeButtonBlock title="상환 방식" />
            <RepayTypeBlock loanType={`${selectedType}균등상환`} />
            <Divider $isLine={true} />
            <InputBox
                title={'대출할 금액'}
                amount1={500000}
                amount2={1000000}
                amount3={5000000}
                amount4={10000000}
                maxAmount={100000000}
                onSavingsAmountChange={() => {}}
                isSavings={false}
            ></InputBox>
            <TurnSliderLoan title={'대출 기간'} min={1} max={50} onTurnChange={() => {}} />
            <ProductDetailInfo
                infoTitle1={'상환 예상 회차'}
                infoContent1={`${currentTurn}턴`} // 대출 기간 Slider에서 얻은 값에 더하기
                infoTitle2={'상환 예상 금액'}
                infoContent2={`${productRate} 원`} // 백엔드 계산식 적용
                isLoan={true}
                isEarlyTermination={false}
            ></ProductDetailInfo>
            <Button
                size={'normal'}
                color={'primaryDeep'}
                // onClick={() => saveAmount(savingsAmount, expectedFinalAmount)}
                // 대출 정보 보내는 함수
                onClick={() => {}}
            >
                다음
            </Button>
        </CardBlock>
    );
};
