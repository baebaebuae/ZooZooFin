// 현재 대출 현황(총 대출금, 남은 대출금)
import styled from 'styled-components';
import { ProductJoinInfo } from '@components/root/productDetailInfo';
import { Card } from '@components/root/card';
import ProgressBox from '@components/root/progressBar';

const InfoTitle = styled.div`
    width: 100%;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray};
`;

const CardBlock = styled(Card)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 8px 0;
`;

const BoldText = styled.span`
    font-weight: bold;
`;

export const LoanInfoCard = ({ charName, totalLoan, restLoan, handleClick }) => {
    return (
        <CardBlock onClick={handleClick}>
            <InfoTitle>
                <BoldText>{charName}</BoldText>
                님의 대출 관리
            </InfoTitle>
            <ProductJoinInfo
                isLoan={true}
                infoTitle={'총 대출 원금'}
                infoContent={`${totalLoan}원`}
            />
            <ProductJoinInfo isLoan={true} infoTitle={'남은 원금'} infoContent={`${restLoan}원`} />
            <ProgressBox isLoan={true} rate={55} />
        </CardBlock>
    );
};
