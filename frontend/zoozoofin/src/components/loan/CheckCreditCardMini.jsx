// 가입 서류 위에 띄워둘 신용 등급 카드

import styled from 'styled-components';
import { ProductDetailInfo, ProductJoinInfo } from '@components/root/productDetailInfo';
import { Card } from '@components/root/card';

const InfoTitle = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray};
`;

const CardBlock = styled(Card)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 8px 0;
`;

export const CheckCreditCardMini = ({ loanLimit, loanAvailable, characterCredit, productRate }) => {
    return (
        <CardBlock>
            <ProductDetailInfo
                infoTitle1={'신용 등급'}
                infoContent1={`${characterCredit}등급`}
                infoTitle2={'대출 금리'}
                // infoContent2={`${productRate}%`}
                infoContent2={`${characterCredit}%`}
                $isLoan={true}
                isEarlyTermination={false}
            ></ProductDetailInfo>
            <ProductJoinInfo
                $isLoan={true}
                infoTitle={'대출 한도'}
                infoContent={`${loanLimit}🥕`}
            />
            <ProductJoinInfo
                $isLoan={true}
                infoTitle={'잔여 대출 가능 금액'}
                infoContent={`${loanAvailable}🥕`}
            />
        </CardBlock>
    );
};
