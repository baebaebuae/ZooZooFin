import { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { Bill } from '@components/Bill';
import { BankruptNotice } from '@components/myroom/BankruptNotice';
import { useBillStore, useBankruptStore } from '@stores/useBillStore';

import { RoomComponent } from '@components/myroom/Room';
import { Loader } from '@components/Loader';

import { getApiClient } from '@/stores/apiClient';

import useUserStore from '@stores/useUserStore';

const RoomBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0px;
    gap: 21px;
    margin: 0px auto;
    width: 100%;
    height: 100%;
`;

const BillContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
`;

const MyRoom = () => {
    const { isTurnChecked, updateTurnChecked, animalAssets, turn, fetchUserProfile } =
        useUserStore();
    const { billData, setBillData, billState, updateBillState } = useBillStore();
    const { bankruptState, updateBankruptState } = useBankruptStore();

    const apiClient = getApiClient();
    const navigate = useNavigate();

    const moveToEnding = ({ endingType }) => {
        console.log('moveToEnding - endingType', endingType);
        navigate('/ending', {
            state: {
                endingType: endingType,
            },
        });
    };

    useEffect(() => {
        const checkTurn = async () => {
            if (!isTurnChecked) {
                // Ending으로 이동 : 기본엔딩
                if (turn > 50) {
                    console.log('게임 종료');
                    animalAssets >= 0 ? moveToEnding('A001') : moveToEnding('A002');
                }

                // Ending으로 이동 : 파산엔딩
                if (animalAssets < 0) {
                    try {
                        const todayResponse = await apiClient.get('/home/turn-record');
                        const repayedCapitalInfo = todayResponse[todayResponse.length - 1];

                        if (
                            repayedCapitalInfo &&
                            repayedCapitalInfo.transactions &&
                            repayedCapitalInfo.transactions.length > 1
                        ) {
                            // 캐피탈 대출 미상환 -> 파산 엔딩
                            if (repayedCapitalInfo.transactions[1].value > 0) {
                                moveToEnding('A002');
                            }
                            // 일반 대출 미상환 -> 은행 파산 가능 안내
                            else if (!bankruptState.isDetected) {
                                updateBankruptState('isDetected', true);
                                console.log('일반 대출 미상환');
                            }
                        }
                    } catch (error) {
                        console.error('거래 내역 조회 중 오류 발생', error);
                    }
                }
                updateTurnChecked();
            }
        };

        checkTurn();
    }, []);

    useEffect(() => {
        if (!billState.isDetected) {
            const fetchData = async () => {
                const apiClient = getApiClient();
                try {
                    const response = await apiClient.get('/home/warning-record');
                    if (response.data && response.data.body) {
                        console.log('BillData: ', response.data.body);
                        setBillData(response.data.body);
                    }

                    // fetch된 billData를 탐색해서
                    // 연체 내역이 있거나 depositTotal, .. 암튼 객체 내 모든 값 중에 하나라도 보여줄 게 있으면
                    // bill의 detected를 true로 바꾸기
                    const hasValue = Object.values(billData).some((value) => value > 0);
                    if (hasValue) {
                        updateBillState('isDetected', true);
                    }
                } catch (error) {
                    console.error(error);
                }
            };

            fetchData();
        }
    }, []);

    // RoomComponent 출력 후 고지서 출력을 위한 처리
    useEffect(() => {
        const timer = setTimeout(() => {
            // setIsBillShown(false);
        }, 1500);

        // 컴포넌트가 언마운트될 때 타이머를 클리어
        return () => clearTimeout(timer);
    }, []);

    const [isLoading, setIsLoading] = useState(true);

    // 입장 시 로딩 페이지
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // 로딩 중일 때 Loader 컴포넌트 렌더링
    if (isLoading) {
        return <Loader loadingText={'내 방으로 입장하는 중...'} />;
    }

    return (
        <RoomBlock>
            {bankruptState.isDetected && !bankruptState.isShown && (
                <BankruptNotice
                    checkBill={() => {
                        updateBankruptState('isShown', true);
                    }}
                />
            )}
            {billState.isDetected && !billState.isShown && (
                <Bill
                    // Bill에서는 store data 가져다가 쓰는거임
                    checkBill={() => {
                        updateBillState('isShown', true);
                    }}
                />
            )}
            <RoomComponent />
        </RoomBlock>
    );
};

export default MyRoom;
