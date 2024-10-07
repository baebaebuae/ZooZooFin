import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { getApiClient } from '@/stores/apiClient';

const BillContainer = styled.div`
    width: 320px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    letter-spacing: 2px;

    gap: 4px;
    padding: 6px;
    background-color: ${({ theme }) => theme.colors.billBack};
`;

const BillTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 4px 0;
    font-weight: bold;
    letter-spacing: 8px;
    color: ${({ theme }) => theme.colors.billBlueText};
    background-color: ${({ theme }) => theme.colors.billBlueBack};
`;

const BillTitleSmall = styled(BillTitle)`
    letter-spacing: 2px;
    width: 100px;
    font-size: 12px;
`;

const BillWarnBlock = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    gap: 8px;
    padding: 2px;
`;

const BillWarnBox = styled.div`
    width: 90px;
    padding: 6px;
    font-size: 12px;
    text-align: center;
    border: 1px solid ${({ theme }) => theme.colors.billRedText};
    color: ${({ theme }) => theme.colors.billRedText};
`;

const BillWarnTextBox = styled.div`
    width: 100%;
    padding: 6px 0;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.billRedBack};
`;

const BillWarnText = styled.div`
    color: ${({ theme }) => theme.colors.billRedText};
    font-size: 10px;
    font-weight: bold;
    margin: 4px 16px;
    letter-spacing: 0px;
`;

const BillAttachBlock = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    gap: 6px;
    margin: 2px 0;
`;

const BillAttachType = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 4px;
    color: ${({ theme }) => theme.colors.billRedText};
    background-color: ${({ theme }) => theme.colors.billRedBack};
`;

const BillAttachContentBlock = styled.div``;

const BillAttachContentBox = styled.div`
    display: flex;
    margin: 8px 4px;
`;

const BillAttachContentType = styled.div`
    width: 100px;
    color: ${({ theme }) => theme.colors.billRedText};
`;

const BillAttachValue = styled.div`
    color: black;
    font-weight: bold;
`;

const BillFooter = styled.div`
    padding: 12px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const BillBankLogo = styled.div`
    color: ${({ theme }) => theme.colors.billBlueText};
    font-weight: bold;
`;

const BillFooterBlank = styled.div`
    width: 50px;
`;

const CheckButton = styled.div`
    width: 50px;
    padding: 4px;
    text-align: center;
    color: ${({ theme }) => theme.colors.billRedText};
    border: 1px solid ${({ theme }) => theme.colors.billRedText};
`;

export const Bill = ({ checkBill }) => {
    const [billData, setBillData] = useState([]);

    console.log('hello?');
    console.log(billData);

    const warnTexts = [
        '연체시 해당 상품에 대해 경고 1회 부과됩니다. (노트북 확인)',
        '다음 턴까지 연체된 대출이자를 납부하지 않으면',
        '보유 중인 자산이 압류 처리됩니다. (예금-적금-자산 순)',
    ];

    const tempData = {
        warningSavingsCount: 0,
        warningLoanCount: 1,
        depositTotal: 39036700,
        depositRepay: 39036700,
        savingsTotal: 8265700,
        savingsRepay: 8265700,
        stockTotal: 127349300,
        stockRepay: 55237000,
    };

    const fetchData = async () => {
        const apiClient = getApiClient();

        try {
            const response = await apiClient.get('/home/warning-record');
            if (response.data && response.data.body) {
                console.log('BillData: ', response.data.body);
                setBillData(response.data.body);
            } else {
                setBillData(tempData);
            }
        } catch (error) {
            console.error(error);
            setBillData(tempData);
        }
    };

    useEffect(() => {
        fetchData();
        // console.log('test');
    }, []);

    const dataTypes = ['deposit', 'savings', 'stock'];

    return (
        <BillContainer>
            <BillTitle>고지서</BillTitle>
            <BillWarnBlock>
                <BillTitleSmall>신규 연체 내역</BillTitleSmall>

                {billData.length > 0 &&
                billData.warningLoanCount &&
                billData.warningSavingsCount ? (
                    <>
                        {billData.warningSavingsCount ? (
                            <BillWarnBox>적금 {billData.warningSavingsCount}회</BillWarnBox>
                        ) : null}
                        {billData.warningLoanCount ? (
                            <BillWarnBox>대출이자 {billData.warningLoanCount}회</BillWarnBox>
                        ) : null}
                    </>
                ) : null}
            </BillWarnBlock>

            <BillWarnTextBox>
                <BillWarnText>{warnTexts[0]}</BillWarnText>
            </BillWarnTextBox>
            <BillWarnTextBox>
                <BillWarnText>{warnTexts[1]}</BillWarnText>
                <BillWarnText>{warnTexts[2]}</BillWarnText>
            </BillWarnTextBox>
            <BillTitle>
                <BillTitleSmall />
                압류 내역
                <BillTitleSmall>(단위 : 🥕)</BillTitleSmall>
            </BillTitle>

            {dataTypes.map((type) => (
                <BillAttachBlock key={type}>
                    <BillAttachType>
                        {type === 'deposit' ? '예금' : type === 'savings' ? '적금' : '주식'}
                    </BillAttachType>
                    <BillAttachContentBlock>
                        <BillAttachContentBox>
                            <BillAttachContentType>현금화 총액</BillAttachContentType>
                            <BillAttachValue>
                                {billData[`${type}Total`]?.toLocaleString() || '0'}
                            </BillAttachValue>
                        </BillAttachContentBox>
                        <BillAttachContentBox>
                            <BillAttachContentType>상환 금액</BillAttachContentType>
                            <BillAttachValue>
                                {billData[`${type}Repay`]?.toLocaleString() || '0'}
                            </BillAttachValue>
                        </BillAttachContentBox>
                        <BillAttachContentBox>
                            <BillAttachContentType>입금 금액</BillAttachContentType>
                            <BillAttachValue>
                                {(
                                    billData[`${type}Total`] - billData[`${type}Repay`]
                                )?.toLocaleString() || '0'}
                            </BillAttachValue>
                        </BillAttachContentBox>
                    </BillAttachContentBlock>
                </BillAttachBlock>
            ))}

            <BillFooter>
                <BillFooterBlank />
                <BillBankLogo>주주은행</BillBankLogo>
                <CheckButton onClick={checkBill}>확인</CheckButton>
            </BillFooter>
        </BillContainer>
    );
};
