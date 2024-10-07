import { useState } from 'react';
import styled from 'styled-components';

import { NormalIcon } from '@components/root/icon';
import IconLender from '@assets/images/icons/icon_lender.png';

import { Card, Divider } from '@components/root/card';
import { StampButton } from '@components/root/buttons';
import { StampModal } from '@components/root/stampModal';
import { ProductDetailInfo, ProductJoinInfo } from '@components/root/productDetailInfo';
import useCapitalStore from '@components/lender/store/CapitalStore';

const InfoTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.gray};
    margin: 8px 0;
`;

const CardBlock = styled(Card)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 35px;
    width: 75%;
`;

const CapitalCheckCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { loanAmount, loanPeriod, expectedFinalAmount, expectedFinalTurn } = useCapitalStore();
    return (
        <CardBlock>
            <InfoTitle>
                <NormalIcon icon={IconLender} />
                대출 상세 정보
            </InfoTitle>
            <ProductDetailInfo
                infoTitle1={'기간'}
                infoContent1={`${loanPeriod}턴`}
                infoTitle2={'이율'}
                infoContent2={'복리 10%'}
                isLoan={true}
                isEarlyTermination={true}
            />
            <Divider $isLine={true} />
            <ProductJoinInfo
                isLoan={true}
                infoTitle={'가입 금액'}
                infoContent={`${loanAmount.toLocaleString()} 🥕`}
            />
            <ProductJoinInfo
                isLoan={true}
                infoTitle={'상환 예상 회차'}
                infoContent={`${expectedFinalTurn}턴`}
            />
            <ProductJoinInfo isLoan={true} infoTitle={'상환 방식'} infoContent={'만기일시상환'} />
            <Divider $isLine={false} />
            <ProductJoinInfo
                isLoan={true}
                infoTitle={'상환 예상 금액'}
                infoContent={`${expectedFinalAmount.toLocaleString()} 🥕`}
            />
        </CardBlock>
    );
};

export default CapitalCheckCard;
