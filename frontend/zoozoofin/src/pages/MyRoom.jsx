import { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { Bill } from '@components/Bill';
import { BankruptNotice } from '@components/myroom/BankruptNotice';
import { useBillStore } from '@stores/useBillStore';

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
    const { billTurn, isBillShown, showBill, resetBill } = useBillStore();
    const {
        isBankruptChecked,
        updateBankruptChecked,
        isTurnChecked,
        updateTurnChecked,
        animalAssets,
        turn,
        fetchUserProfile,
    } = useUserStore();
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
                            else {
                                // updateBankruptChecked();
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

    // RoomComponent 출력 후 고지서 출력을 위한 처리
    useEffect(() => {
        const timer = setTimeout(() => {
            // setIsBillShown(false);
        }, 1500);

        // 컴포넌트가 언마운트될 때 타이머를 클리어
        return () => clearTimeout(timer);
    }, []);

    const checkBill = () => {
        console.log(billTurn);
        showBill();
        console.log(billTurn);
    };

    return (
        <>
            <RoomBlock>
                {!isBankruptChecked && (
                    <BankruptNotice
                        checkBill={() => {
                            updateBankruptChecked();
                        }}
                    />
                )}
                {
                    // 현재 턴과 비교한 조건 추가하기. isBillShown은 중복 조건이라 삭제
                    // !isBillShown &&
                    billTurn === turn && <Bill checkBill={checkBill} />
                }
                <RoomComponent />
            </RoomBlock>
        </>
    );
};

export default MyRoom;
