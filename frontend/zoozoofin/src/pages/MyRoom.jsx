import { useState, useEffect, Suspense } from 'react';

import styled from 'styled-components';

import { Bill } from '@components/Bill';
import { useBillStore } from '@stores/useBillStore';

import { RoomComponent } from '@components/myroom/Room';
import { Loader } from '@components/Loader';

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

    // RoomComponent 출력 후 고지서 출력을 위한 처리
    useEffect(() => {
        const timer = setTimeout(() => {
            // setIsBillShown(false);
        }, 1500);

        // 컴포넌트가 언마운트될 때 타이머를 클리어
        return () => clearTimeout(timer);
    }, []);

    // if (!isBillShown) {
    //     showBill();
    // }

    const checkBill = () => {
        // setIsBillShown(true);
        // resetBill();
        showBill();
    };

    return (
        <>
            <RoomBlock>
                {
                    // 현재 턴과 비교한 조건 추가하기
                    // currentTurn != billTurn &&
                    !isBillShown && <Bill checkBill={checkBill} />
                }
                <RoomComponent />
            </RoomBlock>
        </>
    );
};

export default MyRoom;
