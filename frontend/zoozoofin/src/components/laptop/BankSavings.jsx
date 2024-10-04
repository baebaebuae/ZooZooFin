import { useState } from 'react';
import styled from 'styled-components';

import { InfoBox } from '@components/root/infoBox';
import { Divider } from '@components/root/card';
import { BadgeStroke, WarnBadge } from '@components/root/badge';
import IconFrog from '@assets/images/icons/icon_frog.png';

import { BankSavingsDetail } from './BankSavingsDetail';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AppContent = styled.div`
    width: 100%;
    font-weight: bold;
    font-size: 20px;
    text-align: left;
    margin: 20px 0;
`;

const AppContentH2 = styled.div`
    width: 100%;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 4px;
`;

const BlankBlock = styled.div`
    color: gray;
    /* height: 100%; */
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProductBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    margin: 16px 0;
`;

const ProductTitleBox = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const ProductName = styled.div`
    font-size: 14px;
    color: gray;
`;

const ProductTurn = styled.div`
    font-size: 10px;
    color: ${({ theme }) => theme.colors.primaryShadow};
`;

const ProductAmount = styled.div`
    font-size: 16px;
    font-weight: bold;
`;

export const BankSavings = () => {
    const [isSelected, setIsSelected] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const handleSelect = (data) => {
        setIsSelected(true);
        setSelectedData(data);
    };

    const data = {
        totalMoney: 12750000,
        depositList: [
            {
                depositId: 1,
                name: '개굴첫거래우대예금',
                period: 5,
                amount: 30000000,
                rate: 3,
                finalReturn: 31246500,
                deleteReturn: 30023500,
                restTurn: 2,
                endTurn: 13,
                depositImgUrl: 'String',
            },
        ],
        savingsList: [
            {
                savingsId: 1,
                name: '개굴첫거래우대적끔',
                period: 5,
                amount: 400000,
                rate: 3,
                payment: 100000,
                finalReturn: 561250,
                restTurn: 1,
                endTurn: 12,
                warning: true,
                savingsImgUrl: 'String',
            },
            {
                savingsId: 2,
                name: '토토적금',
                period: 5,
                amount: 400000,
                rate: 3,
                payment: 100000,
                finalReturn: 561250,
                restTurn: 4,
                endTurn: 12,
                warning: false,
                savingsImgUrl: 'String',
            },
        ],
    };

    return (
        <Container>
            {isSelected ? (
                <BankSavingsDetail
                    name={selectedData.name}
                    warning={selectedData.warning}
                    rate={selectedData.rate}
                    amount={selectedData.amount}
                    endTurn={selectedData.endTurn}
                    finalReturn={selectedData.finalReturn}
                    period={selectedData.period}
                    restTurn={selectedData.restTurn}
                    handleSelected={() => setIsSelected(false)}
                />
            ) : (
                <>
                    <InfoBox
                        color={'primaryDeep'}
                        infoTitle={'님의 저축 총 자산'}
                        infoContent={`${data.totalMoney.toLocaleString()}원`}
                    ></InfoBox>
                    <AppContent>가입한 상품</AppContent>
                    <AppContentH2>적금</AppContentH2>
                    {data.savingsList.length > 0 &&
                        data.savingsList.map((saving, index) => {
                            return (
                                <div key={index}>
                                    <ProductBox onClick={() => handleSelect(saving)}>
                                        <ProductTitleBox>
                                            <img src={IconFrog} width={30} />
                                            <ProductName>{saving.name}</ProductName>
                                            <BadgeStroke
                                                color={saving.restTurn === 1 ? 'warn' : 'tertiary'}
                                            >
                                                D-{saving.restTurn}
                                            </BadgeStroke>
                                            {saving.warning && <WarnBadge></WarnBadge>}
                                        </ProductTitleBox>
                                        <ProductTurn>
                                            {saving.payment.toLocaleString()} 원 / 턴
                                        </ProductTurn>
                                        <ProductAmount>
                                            {saving.amount.toLocaleString()} 원
                                        </ProductAmount>
                                    </ProductBox>
                                    {index + 1 != data.savingsList.length && (
                                        <Divider $isLine={true} />
                                    )}
                                </div>
                            );
                        })}

                    {data.savingsList.length === 0 && (
                        <BlankBlock>아직 가입한 적금 상품이 없어요.</BlankBlock>
                    )}

                    <AppContentH2>예금</AppContentH2>
                    {data.depositList.length > 0 && (
                        <>
                            {data.depositList.map((deposit, index) => {
                                return (
                                    <div key={index}>
                                        <ProductBox onClick={() => handleSelect(deposit)}>
                                            <ProductTitleBox>
                                                <img src={IconFrog} width={30} />
                                                <ProductName>{deposit.name}</ProductName>
                                                <BadgeStroke
                                                    color={
                                                        deposit.restTurn === 1 ? 'warn' : 'tertiary'
                                                    }
                                                >
                                                    D-{deposit.restTurn}
                                                </BadgeStroke>
                                            </ProductTitleBox>
                                            <ProductAmount>
                                                {deposit.amount.toLocaleString()} 원
                                            </ProductAmount>
                                        </ProductBox>
                                        {index + 1 != data.depositList.length && (
                                            <Divider $isLine={true} />
                                        )}
                                    </div>
                                );
                            })}
                        </>
                    )}
                    {data.depositList.length === 0 && (
                        <BlankBlock>아직 가입한 예금 상품이 없어요.</BlankBlock>
                    )}
                </>
            )}
        </Container>
    );
};
