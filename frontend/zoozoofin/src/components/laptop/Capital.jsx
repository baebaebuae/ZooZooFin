import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { LaptopInfo } from '@components/root/productDetailInfo';
import ProgressBox from '@components/root/progressBar';

import CheckIcon from '@mui/icons-material/Check';

import { getApiClient } from '@stores/apiClient';

import useUserStore from '@stores/useUserStore';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CautionBlock = styled.div`
    width: 100%;
    margin: 20px 0;
`;

const CautionButton = styled.div`
    width: 100%;
    padding: 12px 0;
    background-color: ${({ theme }) => theme.colors.warn};
    border-radius: ${({ $isCautionOpened }) => ($isCautionOpened ? '16px 16px 0 0' : '16px')};
    color: white;
    font-weight: bold;
    font-size: 14px;
    text-align: center;
`;

const CautionBox = styled.div`
    background-color: ${({ theme }) => theme.colors.warnBackground};
    padding: 12px 20px;
    border-radius: 0 0 16px 16px;
`;

const CautionTextBox = styled.div`
    display: flex;
    align-items: start;
    gap: 8px;
    margin: 4px 0;
`;

const CautionText = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 12px;
`;

const RateBlock = styled.div`
    color: ${({ theme }) => theme.colors.gray};
    margin: 10px 0;
    font-size: 14px;
`;

const DividerLarge = styled.div`
    height: 16px;
`;

const BlankBlock = styled.div`
    color: gray;
    height: 100px;
    margin: 50px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const Capital = () => {
    const [isCautionOpened, setIsCautionOpened] = useState(false);
    const [capitalData, setCapitalData] = useState([]);

    const { turn } = useUserStore();

    const tempData = {
        capitalOrigin: 300000000,
        capitalEndTurn: 16,
        capitalRestTurn: 10,
        capitalRestMoney: 62000000,
    };

    const fetchCapitalData = async () => {
        const apiClient = getApiClient();

        try {
            const res = await apiClient.get('/home/capital');
            console.log(res.data.body);
            setCapitalData(res.data.body);
        } catch (error) {
            setCapitalData(tempData);
            return error;
        }
    };

    useEffect(() => {
        fetchCapitalData();
    }, []);

    const CautionTexts = [
        '제 3금융 대출 금리는 복리 10%로 고정됩니다.',
        '중도 상환은 불가능합니다.',
        '정해진 상환일에 대출금을 갚지 못할 경우 자산이 압류됩니다.',
        '보유한 자산을 모두 압류한 후에도 대출금이 남아있으면 자동으로 파산 처리됩니다.',
    ];

    return (
        <Container>
            <CautionBlock>
                <CautionButton
                    $isCautionOpened={isCautionOpened}
                    onClick={() => setIsCautionOpened(!isCautionOpened)}
                >
                    주의사항 확인
                </CautionButton>

                {isCautionOpened && (
                    <CautionBox>
                        <CautionTextBox>
                            {/* <CautionText>✔</CautionText> */}
                            <CautionText>
                                <CheckIcon sx={{ fontSize: 16 }} />
                            </CautionText>
                            <CautionText>{CautionTexts[0]}</CautionText>
                        </CautionTextBox>
                        <CautionTextBox>
                            <CautionText>
                                <CheckIcon sx={{ fontSize: 16 }} />
                            </CautionText>
                            <CautionText>{CautionTexts[1]}</CautionText>
                        </CautionTextBox>
                    </CautionBox>
                )}
            </CautionBlock>

            <DividerLarge />

            {capitalData.capitalOrigin === null && (
                <BlankBlock>아직 받은 대출이 없어요.</BlankBlock>
            )}

            {capitalData &&
                capitalData.capitalOrigin > 0 &&
                capitalData.capitalEndTurn > 0 &&
                capitalData.capitalRestMoney > 0 && (
                    <div>
                        <LaptopInfo
                            infoTitle={'대출 원금'}
                            infoContent={`${capitalData.capitalOrigin.toLocaleString()}🥕`}
                        />
                        <LaptopInfo
                            infoTitle={'대출 상환일'}
                            infoContent={`${capitalData.capitalEndTurn}턴`}
                        />
                        <LaptopInfo
                            infoTitle={'상환할 금액'}
                            infoContent={`${capitalData.capitalRestMoney.toLocaleString()}🥕`}
                            color={'warn'}
                        />
                    </div>
                )}

            <DividerLarge />

            {/* {capitalData && capitalData.capitalRestMoney > 0 && capitalData.capitalOrigin > 0 && (
                <div>
                    <RateBlock>기준 금리 {10}%</RateBlock>
                    <ProgressBox
                        rate={(capitalData.capitalRestMoney / capitalData.capitalOrigin) * 100}
                        restTurn={capitalData.capitalRestTurn}
                    />
                </div>
            )} */}
        </Container>
    );
};
