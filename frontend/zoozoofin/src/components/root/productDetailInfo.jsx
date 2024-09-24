// 상품별 상세 정보(ex. 기간|이율)
import styled from 'styled-components';

const InfoBlock = styled.div`
    width: 270px;
    display: flex;
    justify-content: space-around;
    margin: 8px 0px;
`;

const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const InfoTitle = styled.div`
    font-size: 12px;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray};
`;

const InfoContent = styled.div`
    font-size: ${({ isLoan }) => (isLoan ? '16px' : '20px')};
    text-align: center;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primaryDeep};
`;

export const ProductDetailInfo = ({
    infoTitle1,
    infoContent1,
    infoTitle2,
    infoContent2,
    isLoan,
}) => {
    return (
        <InfoBlock>
            <InfoBox>
                <InfoTitle>{infoTitle1}</InfoTitle>
                <InfoContent isLoan={isLoan}>{infoContent1}</InfoContent>
            </InfoBox>
            <InfoBox>
                <InfoTitle>{infoTitle2}</InfoTitle>
                <InfoContent isLoan={isLoan}>{infoContent2}</InfoContent>
            </InfoBox>
        </InfoBlock>
    );
};

import PropTypes from 'prop-types';
ProductDetailInfo.propTypes = {
    infoTitle1: PropTypes.string.isRequired,
    infoContent1: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    infoTitle2: PropTypes.string.isRequired,
    infoContent2: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isLoan: PropTypes.bool.isRequired,
};
