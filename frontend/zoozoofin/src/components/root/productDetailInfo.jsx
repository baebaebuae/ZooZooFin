// 상품별 상세 정보(ex. 기간|이율)
import styled from 'styled-components';

const InfoBlock = styled.div`
    width: 100%;
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
    font-size: ${({ $isLoan }) => ($isLoan ? '14px' : '20px')};
    text-align: center;
    font-weight: bold;
    color: ${({ theme, $isEarlyTermination }) =>
        $isEarlyTermination ? theme.colors.warn : theme.colors.primaryDeep};
`;

export const ProductDetailInfo = ({
    infoTitle1,
    infoContent1,
    infoTitle2,
    infoContent2,
    $isLoan,
    isEarlyTermination,
}) => {
    return (
        <InfoBlock>
            <InfoBox>
                <InfoTitle>{infoTitle1}</InfoTitle>
                <InfoContent $isLoan={$isLoan}>{infoContent1}</InfoContent>
            </InfoBox>
            <InfoBox>
                <InfoTitle>{infoTitle2}</InfoTitle>
                <InfoContent $isLoan={$isLoan} $isEarlyTermination={isEarlyTermination}>
                    {infoContent2}
                </InfoContent>
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
    $isLoan: PropTypes.bool,
    isEarlyTermination: PropTypes.bool,
};

const JoinBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 4px 0px;
`;

const JoinTitle = styled.div`
    font-size: ${({ $isLoan }) => ($isLoan ? '12px' : '20px')};
    text-align: center;
    color: ${({ theme }) => theme.colors.gray};
`;

const JoinContent = styled.div`
    font-size: ${({ $isLoan }) => ($isLoan ? '14px' : '20px')};
    text-align: center;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primaryDeep};
`;

export const ProductJoinInfo = ({ $isLoan, infoTitle, infoContent }) => {
    return (
        <JoinBox>
            <JoinTitle $isLoan={$isLoan}>{infoTitle}</JoinTitle>
            <JoinContent $isLoan={$isLoan}>{infoContent}</JoinContent>
        </JoinBox>
    );
};

const ExtraBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 4px 0;
`;

const ExtraTitle = styled.div`
    font-size: 12px;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray};
`;

const ExtraContent = styled.div`
    font-size: 14px;
    text-align: center;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.warn};
`;

export const ExtraInfo = ({ extraRate, extraAmount }) => {
    return (
        <>
            <ExtraBox>
                <ExtraTitle>캐릭터 능력: 추가 +{extraRate}%</ExtraTitle>
                <ExtraContent>{extraAmount.toLocaleString()}원</ExtraContent>
            </ExtraBox>
        </>
    );
};

const LaptopBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 8px 0;
`;

const LaptopTitle = styled.div`
    font-size: 14px;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray};
`;

const LaptopContent = styled.div`
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    color: ${({ theme, color }) => theme.colors[color]};
`;

export const LaptopInfo = ({ $isLoan, infoTitle, infoContent, color }) => {
    return (
        <LaptopBox>
            <LaptopTitle $isLoan={$isLoan}>{infoTitle}</LaptopTitle>
            <LaptopContent color={color} $isLoan={$isLoan}>
                {infoContent}
            </LaptopContent>
        </LaptopBox>
    );
};
