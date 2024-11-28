import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { LaptopInfoBox } from '@components/root/infoBox';
import { Divider } from '@components/root/card';
import { BadgeStroke, WarnBadge } from '@components/root/badge';
import IconChicken from '@assets/images/icons/icon_chicken.png';
import IconZoozoo from '@assets/images/icons/icon_chick.png';
import IconCat from '@assets/images/icons/icon_cat.png';
import IconBear from '@assets/images/icons/icon_bear.png';
import IconRaccon from '@assets/images/icons/icon_raccon.png';

import { BankSavingsDetail } from './BankSavingsDetail';

import { getApiClient } from '@stores/apiClient';

import { useAnimalStore } from '../../store';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    height: 400px;
    overflow-y: auto;
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
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 0;
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

const getProductIcon = (productName) => {
    switch (productName) {
        case '주주예금':
            return IconZoozoo;
        case '꼬꼬예금':
            return IconChicken;
        case '야옹예금':
            return IconCat;
        case '주주적금':
            return IconZoozoo;
        case '너굴적금':
            return IconRaccon;
        case '곰곰적금':
            return IconBear;
    }
};

export const BankSavings = () => {
    const { getAnimalData } = useAnimalStore();

    const [isSelected, setIsSelected] = useState(false);
    const [savingsData, setSavingsData] = useState([]);
    const [selectedData, setSelectedData] = useState(null);

    const handleSelect = (data) => {
        setIsSelected(true);
        setSelectedData(data);
    };

    const tempData = {
        totalMoney: 12750000,
        myDepositResponseList: [
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

    const fetchSavingsData = async () => {
        const apiClient = getApiClient();

        try {
            const res = await apiClient.get(
                '/home/my-deposit-savings',
                {},
                { headers: { animalId: 1 } }
            );
            console.log(res.data.body);
            setSavingsData(res.data.body);
        } catch (error) {
            setSavingsData(tempData);
            return error;
        }
    };

    useEffect(() => {
        getAnimalData();
    });

    useEffect(() => {
        fetchSavingsData();
    }, []);

    useEffect(() => {}, [savingsData]);
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
                    {savingsData && savingsData.totalMoney > 0 && (
                        <LaptopInfoBox
                            color={'primaryDeep'}
                            infoTitle={`님의 저축 총 자산`}
                            // infoTitle={`${savingsData.totalMoney}님의 저축 총 자산`}
                            infoContent={`${savingsData.totalMoney.toLocaleString()}원`}
                        ></LaptopInfoBox>
                    )}
                    <AppContent>가입한 상품</AppContent>
                    <AppContentH2>적금</AppContentH2>
                    {savingsData &&
                        savingsData.mySavingsResponseList &&
                        savingsData.mySavingsResponseList.length > 0 &&
                        savingsData.mySavingsResponseList.map((saving, index) => {
                            const productIcon = getProductIcon(saving.name);
                            return (
                                <div key={index}>
                                    <ProductBox onClick={() => handleSelect(saving)}>
                                        <ProductTitleBox>
                                            <img src={productIcon} width={30} />
                                            <ProductName>{saving.name}</ProductName>
                                            <BadgeStroke
                                                color={saving.restTurn === 1 ? 'warn' : 'tertiary'}
                                            >
                                                D-{saving.restTurn}
                                            </BadgeStroke>
                                            {saving.warning && <WarnBadge></WarnBadge>}
                                        </ProductTitleBox>
                                        <ProductTurn>
                                            {saving.payment.toLocaleString()} 🥕 / 턴
                                        </ProductTurn>
                                        <ProductAmount>
                                            {saving.amount.toLocaleString()} 🥕
                                        </ProductAmount>
                                    </ProductBox>
                                    {index + 1 != savingsData.mySavingsResponseList.length && (
                                        <Divider $isLine={true} />
                                    )}
                                </div>
                            );
                        })}

                    {savingsData &&
                        savingsData.mySavingsResponseList &&
                        savingsData.mySavingsResponseList.length === 0 && (
                            <BlankBlock>아직 가입한 적금 상품이 없어요.</BlankBlock>
                        )}

                    <AppContentH2>예금</AppContentH2>
                    {savingsData &&
                        savingsData.myDepositResponseList &&
                        savingsData.myDepositResponseList.length > 0 && (
                            <>
                                {savingsData &&
                                    savingsData.myDepositResponseList &&
                                    savingsData.myDepositResponseList.length > 0 &&
                                    savingsData.myDepositResponseList.map((deposit, index) => {
                                        const productIcon = getProductIcon(deposit.name);
                                        return (
                                            <div key={index}>
                                                <ProductBox onClick={() => handleSelect(deposit)}>
                                                    <ProductTitleBox>
                                                        <img src={productIcon} width={30} />
                                                        <ProductName>{deposit.name}</ProductName>
                                                        <BadgeStroke
                                                            color={
                                                                deposit.restTurn === 1
                                                                    ? 'warn'
                                                                    : 'tertiary'
                                                            }
                                                        >
                                                            D-{deposit.restTurn}
                                                        </BadgeStroke>
                                                    </ProductTitleBox>
                                                    <ProductAmount>
                                                        {deposit.amount.toLocaleString()} 🥕
                                                    </ProductAmount>
                                                </ProductBox>
                                                {index + 1 !=
                                                    savingsData.myDepositResponseList.length && (
                                                    <Divider $isLine={true} />
                                                )}
                                            </div>
                                        );
                                    })}
                            </>
                        )}
                    {savingsData &&
                        savingsData.myDepositResponseList &&
                        savingsData.myDepositResponseList.length === 0 && (
                            <BlankBlock>아직 가입한 예금 상품이 없어요.</BlankBlock>
                        )}
                </>
            )}
        </Container>
    );
};
