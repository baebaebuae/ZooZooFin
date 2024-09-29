// 대출 정보 확인 카드

import styled from 'styled-components';
import { ProductDetailInfo, ProductJoinInfo } from '@components/root/productDetailInfo';
import { Card, Divider } from '@components/root/card';
import { StampButton } from '@components/root/buttons';

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

export const LoanCheckCard = ({ loanAmount, loanPeriod, loanRate, handleClick }) => {
    return (
        <CardBlock onClick={handleClick}>
            <InfoTitle>대출 상세 정보</InfoTitle>
            <ProductDetailInfo
                infoTitle1={'대출 기간'}
                infoContent1={`${loanPeriod}턴`}
                infoTitle2={'대출 금리'}
                infoContent2={`${loanRate}%`}
                isLoan={true}
                isEarlyTermination={false}
            ></ProductDetailInfo>
            <Divider $isLine={true} />
            <ProductJoinInfo
                isLoan={true}
                infoTitle={'가입 금액'}
                infoContent={`${loanAmount}원`}
            />
            <ProductJoinInfo
                isLoan={true}
                infoTitle={'상환 예상 회차'}
                infoContent={`${loanPeriod + 3}턴`} // 최종 넘어온 finalPeriod 입력
                // infoContent={`${finalPeriod}턴`}
            />
            <ProductJoinInfo isLoan={true} infoTitle={'상환 방식'} infoContent={`원리금균등상환`} />
            <Divider $isLine={false} />
            <ProductJoinInfo
                isLoan={true}
                infoTitle={'상환 예상 금액'}
                infoContent={`${loanAmount * 1.19}원`} // 백엔드 계산식 적용
            />
            <StampButton />
        </CardBlock>
    );
};
