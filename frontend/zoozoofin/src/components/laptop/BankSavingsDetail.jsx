import styled from 'styled-components';
import { WarnBadge } from '@components/root/badge';
import { Divider } from '@components/root/card';
import ProgressBox from '@components/root/progressBar';
import IconFrog from '@assets/images/icons/icon_frog.png';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { LaptopInfo, ExtraInfo } from '@components/root/productDetailInfo';

const DetailContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const DetailTitleBlock = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    gap: 6px;
    margin: 10px 0;
`;

const DetailTitle = styled.div`
    font-weight: bold;
    font-size: 18px;
`;

const DetailContentBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 4px;
`;

const DividerLarge = styled.div`
    height: 30px;
`;

export const BankSavingsDetail = ({
    name,
    warning,
    rate,
    amount,
    endTurn,
    finalReturn,
    period,
    restTurn,
    handleSelected,
}) => {
    const specialRate = 10; // 캐릭터 특별 능력

    return (
        <DetailContainer>
            <DetailTitleBlock>
                <ArrowBackIosNewIcon onClick={handleSelected} />
                <img src={IconFrog} width={30} />
                <DetailTitle>{name}</DetailTitle>
                {warning && <WarnBadge></WarnBadge>}
            </DetailTitleBlock>
            <DetailContentBlock>
                <LaptopInfo infoTitle={'기준 금리'} infoContent={`${rate}%`} />
                <LaptopInfo infoTitle={'납입 금액'} infoContent={`${amount.toLocaleString()}🥕`} />
                <LaptopInfo infoTitle={'만기턴'} infoContent={`${endTurn}턴 `} />
                <Divider $isLine={false} />
                <LaptopInfo
                    infoTitle={'만기 예상 금액'}
                    infoContent={`${finalReturn.toLocaleString()}🥕`}
                    color={'primaryDeep'}
                />
                {/* <ExtraInfo
                    extraRate={specialRate}
                    extraAmount={(specialRate / 100) * amount}
                ></ExtraInfo> */}
                <DividerLarge />
                <ProgressBox rate={((period - restTurn) / period) * 100} restTurn={restTurn} />
            </DetailContentBlock>
        </DetailContainer>
    );
};
