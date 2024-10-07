import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { LaptopInfo } from '@components/root/productDetailInfo';
import ProgressBox from '@components/root/progressBar';

import CheckIcon from '@mui/icons-material/Check';

import { getApiClient } from '@stores/apiClient';

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

export const Capital = () => {
    const [isCautionOpened, setIsCautionOpened] = useState(false);
    const [capitalData, setCapitalData] = useState([]);

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
        '정해진 상환일에 대출금을 갚지 못할 경우, 캐피탈 경고 1회 후 자산이 압류됩니다.',
        '개인이 신청할 경우 파산처리됩니다.',
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

            <LaptopInfo
                infoTitle={'대출 원금'}
                infoContent={`${capitalData.capitalOrigin.toLocaleString()}🥕`}
            />
            <LaptopInfo infoTitle={'대출 상환일'} infoContent={`${capitalData.capitalEndTurn}턴`} />
            <LaptopInfo
                infoTitle={'상환할 금액'}
                infoContent={`${capitalData.capitalRestMoney.toLocaleString()}🥕`}
                color={'warn'}
            />

            <DividerLarge />

            <RateBlock>기준 금리 {10}%</RateBlock>
            <ProgressBox
                rate={(capitalData.capitalRestMoney / capitalData.capitalOrigin) * 100}
                restTurn={capitalData.capitalRestTurn}
            />
        </Container>
    );
};
